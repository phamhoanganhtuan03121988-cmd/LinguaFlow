import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LanguageCode } from '@/src/data/languages';
import { useGamificationEvents } from '@/src/features/gamification/events';
import { computeNextStreak } from '@/src/features/progress/streak';
import { useAppStore } from './useAppStore';

export interface LanguageProgress {
  completedLessonIds: Record<string, true>;
  practicedSpeakingIds: Record<string, true>;
  totalListeningSessionsCompleted: number;
  completedGrammarTopicIds: Record<string, true>;
  completedConversationScenarioIds: Record<string, true>;
  /** Writing Practice completions (Phase 9) — a round marked "done", never a correctness score. See src/features/writing. */
  completedWritingItemIds: Record<string, true>;
  /** Set whenever recordActivity() fires for this language — separate from the global streak's lastActiveDate. Also doubles as "last writing activity" since writing completion calls recordActivity() too. */
  lastStudiedAt: number | null;
}

function createEmptyLanguageProgress(): LanguageProgress {
  return {
    completedLessonIds: {},
    practicedSpeakingIds: {},
    totalListeningSessionsCompleted: 0,
    completedGrammarTopicIds: {},
    completedConversationScenarioIds: {},
    completedWritingItemIds: {},
    lastStudiedAt: null,
  };
}

/** Stable reference for "no language" reads, so selectors don't return a fresh object every call. */
const EMPTY_LANGUAGE_PROGRESS: LanguageProgress = createEmptyLanguageProgress();

export interface ProgressState {
  hasHydrated: boolean;
  /** Global — a whole-account "did I study anything today" streak, not per-language. See Phase 8 proposal. */
  lastActiveDate: string | null;
  currentStreakDays: number;
  /** Single source of truth for per-language lesson/grammar/conversation/speaking/listening/writing progress. */
  languages: Partial<Record<LanguageCode, LanguageProgress>>;

  markLessonComplete: (lessonId: string, languageCode?: LanguageCode) => void;
  isLessonComplete: (lessonId: string, languageCode?: LanguageCode) => boolean;
  markSpeakingPracticed: (id: string, languageCode?: LanguageCode) => void;
  isSpeakingPracticed: (id: string, languageCode?: LanguageCode) => boolean;
  completeListeningSession: (languageCode?: LanguageCode) => void;
  markGrammarTopicComplete: (id: string, languageCode?: LanguageCode) => void;
  isGrammarTopicComplete: (id: string, languageCode?: LanguageCode) => boolean;
  markConversationScenarioComplete: (id: string, languageCode?: LanguageCode) => void;
  isConversationScenarioComplete: (id: string, languageCode?: LanguageCode) => boolean;
  /** Marks one writing round "done" — never a correctness/handwriting score (Phase 9 explicitly forbids fake grading). Does not touch lesson/SRS/speaking progress. */
  markWritingItemComplete: (id: string, languageCode?: LanguageCode) => void;
  isWritingItemComplete: (id: string, languageCode?: LanguageCode) => boolean;
  /** Call only when the learner actually completes something (lesson, session, topic, scenario) — never on views/plays/flips. Bumps the global streak, and that language's lastStudiedAt when resolvable. */
  recordActivity: (languageCode?: LanguageCode) => void;
  /** Wipes every language's progress. Used by resetAllData()'s full factory reset. */
  resetAll: () => void;
}

/** Reads a language's progress, falling back to a stable empty default when unset. */
export function selectLanguageProgress(state: ProgressState, languageCode: LanguageCode | null): LanguageProgress {
  return (languageCode && state.languages[languageCode]) || EMPTY_LANGUAGE_PROGRESS;
}

function updateLanguageSlice(
  languages: ProgressState['languages'],
  code: LanguageCode,
  patch: Partial<LanguageProgress>,
): ProgressState['languages'] {
  const existing = languages[code] ?? createEmptyLanguageProgress();
  return { ...languages, [code]: { ...existing, ...patch } };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      lastActiveDate: null,
      currentStreakDays: 0,
      languages: {},

      markLessonComplete: (lessonId, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            completedLessonIds: { ...(state.languages[code]?.completedLessonIds ?? {}), [lessonId]: true },
          }),
        }));
        get().recordActivity(code);
        useGamificationEvents.getState().emit('lesson-completed', { lessonId });
      },
      isLessonComplete: (lessonId, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return false;
        return Boolean(get().languages[code]?.completedLessonIds[lessonId]);
      },

      markSpeakingPracticed: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            practicedSpeakingIds: { ...(state.languages[code]?.practicedSpeakingIds ?? {}), [id]: true },
          }),
        }));
      },
      isSpeakingPracticed: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return false;
        return Boolean(get().languages[code]?.practicedSpeakingIds[id]);
      },

      completeListeningSession: (languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            totalListeningSessionsCompleted: (state.languages[code]?.totalListeningSessionsCompleted ?? 0) + 1,
          }),
        }));
        get().recordActivity(code);
        useGamificationEvents.getState().emit('session-completed', { kind: 'listening' });
      },

      markGrammarTopicComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            completedGrammarTopicIds: { ...(state.languages[code]?.completedGrammarTopicIds ?? {}), [id]: true },
          }),
        }));
        get().recordActivity(code);
      },
      isGrammarTopicComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return false;
        return Boolean(get().languages[code]?.completedGrammarTopicIds[id]);
      },

      markConversationScenarioComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            completedConversationScenarioIds: {
              ...(state.languages[code]?.completedConversationScenarioIds ?? {}),
              [id]: true,
            },
          }),
        }));
        get().recordActivity(code);
      },
      isConversationScenarioComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return false;
        return Boolean(get().languages[code]?.completedConversationScenarioIds[id]);
      },

      markWritingItemComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, {
            completedWritingItemIds: { ...(state.languages[code]?.completedWritingItemIds ?? {}), [id]: true },
          }),
        }));
        // Same precedent as markSpeakingPracticed: a supplementary practice
        // activity, not a lesson/session completion, so it doesn't bump the streak.
      },
      isWritingItemComplete: (id, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return false;
        return Boolean(get().languages[code]?.completedWritingItemIds[id]);
      },

      recordActivity: (languageCode) => {
        set((state) => computeNextStreak({ lastActiveDate: state.lastActiveDate, currentStreakDays: state.currentStreakDays }));

        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: updateLanguageSlice(state.languages, code, { lastStudiedAt: Date.now() }),
        }));
      },

      resetAll: () => {
        set({ lastActiveDate: null, currentStreakDays: 0, languages: {} });
      },
    }),
    {
      name: 'linguaflow-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      migrate: (persistedState: unknown, version) => {
        let state = persistedState as {
          completedLessonIds?: Record<string, true>;
          practicedSpeakingIds?: Record<string, true>;
          totalListeningSessionsCompleted?: number;
          completedGrammarTopicIds?: Record<string, true>;
          completedConversationScenarioIds?: Record<string, true>;
          lastActiveDate?: string | null;
          currentStreakDays?: number;
          languages?: Record<string, Partial<LanguageProgress> | undefined>;
        } | null;

        if (version < 1) {
          // Only 'en' content has ever existed in CONTENT_PACKS at that point, so
          // any legacy progress data is provably English — no cross-store read needed.
          const old = state ?? {};
          const hasLegacyData =
            Object.keys(old.completedLessonIds ?? {}).length > 0 ||
            Object.keys(old.practicedSpeakingIds ?? {}).length > 0 ||
            (old.totalListeningSessionsCompleted ?? 0) > 0 ||
            Object.keys(old.completedGrammarTopicIds ?? {}).length > 0 ||
            Object.keys(old.completedConversationScenarioIds ?? {}).length > 0;

          const languages: Record<string, Partial<LanguageProgress>> = hasLegacyData
            ? {
                en: {
                  completedLessonIds: old.completedLessonIds ?? {},
                  practicedSpeakingIds: old.practicedSpeakingIds ?? {},
                  totalListeningSessionsCompleted: old.totalListeningSessionsCompleted ?? 0,
                  completedGrammarTopicIds: old.completedGrammarTopicIds ?? {},
                  completedConversationScenarioIds: old.completedConversationScenarioIds ?? {},
                  lastStudiedAt: null,
                },
              }
            : {};

          state = {
            lastActiveDate: old.lastActiveDate ?? null,
            currentStreakDays: old.currentStreakDays ?? 0,
            languages,
          };
        }

        if (version < 2) {
          // Phase 9: backfill completedWritingItemIds: {} onto every existing
          // per-language slice — writing tracking is new, there's no prior data to
          // recover, an empty map is the only correct starting value.
          const old = state ?? { languages: {} };
          const languages: ProgressState['languages'] = {};
          for (const [code, progress] of Object.entries(old.languages ?? {})) {
            if (!progress) continue;
            languages[code as LanguageCode] = {
              completedLessonIds: progress.completedLessonIds ?? {},
              practicedSpeakingIds: progress.practicedSpeakingIds ?? {},
              totalListeningSessionsCompleted: progress.totalListeningSessionsCompleted ?? 0,
              completedGrammarTopicIds: progress.completedGrammarTopicIds ?? {},
              completedConversationScenarioIds: progress.completedConversationScenarioIds ?? {},
              completedWritingItemIds: progress.completedWritingItemIds ?? {},
              lastStudiedAt: progress.lastStudiedAt ?? null,
            };
          }
          state = {
            lastActiveDate: old.lastActiveDate ?? null,
            currentStreakDays: old.currentStreakDays ?? 0,
            languages,
          };
        }

        return state;
      },
      onRehydrateStorage: () => () => {
        useProgressStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        lastActiveDate: state.lastActiveDate,
        currentStreakDays: state.currentStreakDays,
        languages: state.languages,
      }),
    },
  ),
);
