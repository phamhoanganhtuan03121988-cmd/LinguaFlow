import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LanguageCode } from '@/src/data/languages';
import type { LearningGoalId } from '@/src/data/goals';
import type { CurrentLevelId } from '@/src/data/levels';
import type { PlacementResult } from '@/src/features/placement/scoring';

const GENERAL_TRACK_ID = 'general';

/** A target the learner has set for themselves — separate from what they're actively studying right now (see LanguageProfile.activeTrackId/activeLevelId). */
export interface TrackGoal {
  trackId: string;
  targetLevelId: string;
}

export interface LanguageProfile {
  currentLevel: CurrentLevelId | null;
  /** Most recent placement test result only — retaking overwrites it, no history kept. */
  placementTestResult: PlacementResult | null;
  /** When this language was added — reserved for Learning Hub ordering (Phase 8C). */
  startedAt: number;
  /**
   * Which learning track (Phase 10: 'general', 'toeic', 'ielts', 'topik', 'hsk',
   * 'jlpt' — see src/content/tracks.ts) this language is currently studying.
   * Deliberately per-language, never global — a user can be on English TOEIC
   * while still on Korean General. Defaults to 'general'.
   */
  activeTrackId: string;
  /**
   * Which level WITHIN activeTrackId is currently active — was `activeLevel:
   * CEFRLevel` through Phase 9; renamed and widened to a plain string id in
   * Phase 10 because exam tracks use non-CEFR level ids. Defaults to 'A1'.
   */
  activeLevelId: string;
  /**
   * The learner's own stated target (e.g. "TOEIC 750") — NOT the same as
   * activeTrackId/activeLevelId, which is what they're actually studying right
   * now. Changing this never touches active study state or any progress data.
   */
  trackGoal: TrackGoal | null;
}

function createEmptyLanguageProfile(): LanguageProfile {
  return {
    currentLevel: null,
    placementTestResult: null,
    startedAt: Date.now(),
    activeTrackId: GENERAL_TRACK_ID,
    activeLevelId: 'A1',
    trackGoal: null,
  };
}

/** Stable reference for "no language" reads, so selectors don't return a fresh object every call. */
const EMPTY_LANGUAGE_PROFILE: LanguageProfile = createEmptyLanguageProfile();

export interface AppState {
  hasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  /** The language currently driving Home/Learn/Review/Practice. */
  activeLanguageCode: LanguageCode | null;
  /** The onboarding "why are you learning" motivation (e.g. travel/work) — unrelated to TrackGoal, a different concept, deliberately kept global as decided in the Phase 8 proposal. */
  learningGoal: LearningGoalId | null;
  /** Single source of truth for per-language profile data (level, placement result, active track/level, track goal). */
  languages: Partial<Record<LanguageCode, LanguageProfile>>;

  /** Sets the active language, creating its profile entry on first use. */
  setActiveLanguage: (language: LanguageCode) => void;
  setLearningGoal: (goal: LearningGoalId) => void;
  setCurrentLevel: (level: CurrentLevelId, languageCode?: LanguageCode) => void;
  /** Switches which track+level a language is actively studying. Never changes other languages, never touches trackGoal or any progress data. */
  setActiveTrackLevel: (trackId: string, levelId: string, languageCode?: LanguageCode) => void;
  /** Sets the learner's target track+level. Independent of activeTrackId/activeLevelId — does not change what they're currently studying. */
  setTrackGoal: (trackId: string, targetLevelId: string, languageCode?: LanguageCode) => void;
  clearTrackGoal: (languageCode?: LanguageCode) => void;
  completeOnboarding: () => void;
  /** Resets only this store's own state. For a full cross-store factory reset, use resetAllData() from './resetAllData'. */
  resetAppState: () => void;
  setPlacementTestResult: (result: PlacementResult, languageCode?: LanguageCode) => void;
  /** Explicit, user-initiated action — the result never changes currentLevel on its own. */
  applyPlacementRecommendation: (languageCode?: LanguageCode) => void;
}

/** Reads a language's profile, falling back to a stable empty default when unset. */
export function selectLanguageProfile(state: AppState, languageCode: LanguageCode | null): LanguageProfile {
  return (languageCode && state.languages[languageCode]) || EMPTY_LANGUAGE_PROFILE;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      hasCompletedOnboarding: false,
      activeLanguageCode: null,
      learningGoal: null,
      languages: {},

      setActiveLanguage: (language) => {
        set((state) => ({
          activeLanguageCode: language,
          languages: state.languages[language]
            ? state.languages
            : { ...state.languages, [language]: createEmptyLanguageProfile() },
        }));
      },

      setLearningGoal: (goal) => set({ learningGoal: goal }),

      setCurrentLevel: (level, languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...(state.languages[code] ?? createEmptyLanguageProfile()), currentLevel: level },
          },
        }));
      },

      setActiveTrackLevel: (trackId, levelId, languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: {
              ...(state.languages[code] ?? createEmptyLanguageProfile()),
              activeTrackId: trackId,
              activeLevelId: levelId,
            },
          },
        }));
      },

      setTrackGoal: (trackId, targetLevelId, languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: {
              ...(state.languages[code] ?? createEmptyLanguageProfile()),
              trackGoal: { trackId, targetLevelId },
            },
          },
        }));
      },

      clearTrackGoal: (languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...(state.languages[code] ?? createEmptyLanguageProfile()), trackGoal: null },
          },
        }));
      },

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      resetAppState: () => {
        set({ hasCompletedOnboarding: false, activeLanguageCode: null, learningGoal: null, languages: {} });
      },

      setPlacementTestResult: (result, languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...(state.languages[code] ?? createEmptyLanguageProfile()), placementTestResult: result },
          },
        }));
      },

      applyPlacementRecommendation: (languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        const result = get().languages[code]?.placementTestResult;
        if (!result) return;
        get().setCurrentLevel(result.recommendedLevel, code);
      },
    }),
    {
      name: 'linguaflow-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 3,
      migrate: (persistedState: unknown, version) => {
        let state = persistedState as {
          hasCompletedOnboarding?: boolean;
          selectedLanguage?: LanguageCode | null;
          activeLanguageCode?: LanguageCode | null;
          learningGoal?: LearningGoalId | null;
          currentLevel?: CurrentLevelId | null;
          placementTestResult?: PlacementResult | null;
          languages?: Record<string, Record<string, unknown> | undefined>;
        } | null;

        if (version < 1) {
          // Pre-Phase-8 shape (the only shape ever shipped to real users — Phase 8A's
          // intermediate `selectedLanguage`-named shape was never deployed, so this
          // migrates straight from the original flat fields to the Phase 8B shape).
          const old = state ?? {};
          const activeLanguageCode = old.selectedLanguage ?? null;
          const languages: Record<string, Record<string, unknown>> = activeLanguageCode
            ? {
                [activeLanguageCode]: {
                  currentLevel: old.currentLevel ?? null,
                  placementTestResult: old.placementTestResult ?? null,
                  startedAt: Date.now(),
                },
              }
            : {};
          state = {
            hasCompletedOnboarding: old.hasCompletedOnboarding ?? false,
            activeLanguageCode,
            learningGoal: old.learningGoal ?? null,
            languages,
          };
        }

        if (version < 2) {
          // Phase 9: backfill activeLevel: 'A1' onto every existing per-language
          // profile — every language a user had before Phase 9 only ever had A1
          // content, so 'A1' is the only correct value here, not a guess.
          const old = state ?? { languages: {} };
          const languages: Record<string, Record<string, unknown>> = {};
          for (const [code, profile] of Object.entries(old.languages ?? {})) {
            if (!profile) continue;
            languages[code] = {
              currentLevel: profile.currentLevel ?? null,
              placementTestResult: profile.placementTestResult ?? null,
              startedAt: profile.startedAt ?? Date.now(),
              activeLevel: profile.activeLevel ?? 'A1',
            };
          }
          state = {
            hasCompletedOnboarding: old.hasCompletedOnboarding ?? false,
            activeLanguageCode: old.activeLanguageCode ?? null,
            learningGoal: old.learningGoal ?? null,
            languages,
          };
        }

        if (version < 3) {
          // Phase 10: activeLevel -> activeTrackId ('general') + activeLevelId
          // (the old activeLevel value, unchanged) — every language a user had
          // before Phase 10 was only ever studied on the 'general' track, so
          // 'general' is the only correct trackId here, not a guess. Adds
          // trackGoal: null (a brand new concept, nothing to recover).
          const old = state ?? { languages: {} };
          const languages: AppState['languages'] = {};
          for (const [code, profile] of Object.entries(old.languages ?? {})) {
            if (!profile) continue;
            languages[code as LanguageCode] = {
              currentLevel: (profile.currentLevel as CurrentLevelId | null) ?? null,
              placementTestResult: (profile.placementTestResult as PlacementResult | null) ?? null,
              startedAt: (profile.startedAt as number) ?? Date.now(),
              activeTrackId: (profile.activeTrackId as string) ?? GENERAL_TRACK_ID,
              activeLevelId: (profile.activeLevelId as string) ?? (profile.activeLevel as string) ?? 'A1',
              trackGoal: (profile.trackGoal as TrackGoal | null) ?? null,
            };
          }
          state = {
            hasCompletedOnboarding: old.hasCompletedOnboarding ?? false,
            activeLanguageCode: old.activeLanguageCode ?? null,
            learningGoal: old.learningGoal ?? null,
            languages: languages as unknown as Record<string, Record<string, unknown> | undefined>,
          };
        }

        return state;
      },
      onRehydrateStorage: () => () => {
        useAppStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        activeLanguageCode: state.activeLanguageCode,
        learningGoal: state.learningGoal,
        languages: state.languages,
      }),
    },
  ),
);
