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
  /** Set whenever recordActivity() fires for this language — separate from the global streak's lastActiveDate. */
  lastStudiedAt: number | null;
}

function createEmptyLanguageProgress(): LanguageProgress {
  return {
    completedLessonIds: {},
    practicedSpeakingIds: {},
    totalListeningSessionsCompleted: 0,
    completedGrammarTopicIds: {},
    completedConversationScenarioIds: {},
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
  /** Single source of truth for per-language lesson/grammar/conversation/speaking/listening progress. */
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
      version: 1,
      migrate: (persistedState: unknown, version) => {
        if (version >= 1) return persistedState;
        const old = (persistedState ?? {}) as {
          completedLessonIds?: Record<string, true>;
          practicedSpeakingIds?: Record<string, true>;
          totalListeningSessionsCompleted?: number;
          completedGrammarTopicIds?: Record<string, true>;
          completedConversationScenarioIds?: Record<string, true>;
          lastActiveDate?: string | null;
          currentStreakDays?: number;
        };
        // Only 'en' content has ever existed in CONTENT_PACKS, so any legacy
        // progress data is provably English — no cross-store read needed.
        const hasLegacyData =
          Object.keys(old.completedLessonIds ?? {}).length > 0 ||
          Object.keys(old.practicedSpeakingIds ?? {}).length > 0 ||
          (old.totalListeningSessionsCompleted ?? 0) > 0 ||
          Object.keys(old.completedGrammarTopicIds ?? {}).length > 0 ||
          Object.keys(old.completedConversationScenarioIds ?? {}).length > 0;

        const languages: ProgressState['languages'] = hasLegacyData
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

        return {
          lastActiveDate: old.lastActiveDate ?? null,
          currentStreakDays: old.currentStreakDays ?? 0,
          languages,
        };
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
