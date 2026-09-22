import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { CEFRLevel } from '@/src/content/types';
import type { LanguageCode } from '@/src/data/languages';
import type { LearningGoalId } from '@/src/data/goals';
import type { CurrentLevelId } from '@/src/data/levels';
import type { PlacementResult } from '@/src/features/placement/scoring';

export interface LanguageProfile {
  currentLevel: CurrentLevelId | null;
  /** Most recent placement test result only — retaking overwrites it, no history kept. */
  placementTestResult: PlacementResult | null;
  /** When this language was added — reserved for Learning Hub ordering (Phase 8C). */
  startedAt: number;
  /**
   * Which course level (A1/A2/...) this language is currently studying — the
   * "activeLevel" from the Phase 9 spec, deliberately stored per-language
   * (never a single global field) since a user can be on English A2 while
   * still on Korean A1. Defaults to 'A1' for every language, including ones
   * added before Phase 9 (backfilled in the version 2 migration below).
   */
  activeLevel: CEFRLevel;
}

function createEmptyLanguageProfile(): LanguageProfile {
  return { currentLevel: null, placementTestResult: null, startedAt: Date.now(), activeLevel: 'A1' };
}

/** Stable reference for "no language" reads, so selectors don't return a fresh object every call. */
const EMPTY_LANGUAGE_PROFILE: LanguageProfile = createEmptyLanguageProfile();

export interface AppState {
  hasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  /** The language currently driving Home/Learn/Review/Practice. */
  activeLanguageCode: LanguageCode | null;
  learningGoal: LearningGoalId | null;
  /** Single source of truth for per-language profile data (level, placement result, active course level). */
  languages: Partial<Record<LanguageCode, LanguageProfile>>;

  /** Sets the active language, creating its profile entry on first use. */
  setActiveLanguage: (language: LanguageCode) => void;
  setLearningGoal: (goal: LearningGoalId) => void;
  setCurrentLevel: (level: CurrentLevelId, languageCode?: LanguageCode) => void;
  /** Switches which course level (A1/A2/...) a language is studying. Never changes other languages. */
  setActiveLevel: (level: CEFRLevel, languageCode?: LanguageCode) => void;
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

      setActiveLevel: (level, languageCode) => {
        const code = languageCode ?? get().activeLanguageCode;
        if (!code) return;
        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...(state.languages[code] ?? createEmptyLanguageProfile()), activeLevel: level },
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
      version: 2,
      migrate: (persistedState: unknown, version) => {
        let state = persistedState as {
          hasCompletedOnboarding?: boolean;
          selectedLanguage?: LanguageCode | null;
          activeLanguageCode?: LanguageCode | null;
          learningGoal?: LearningGoalId | null;
          currentLevel?: CurrentLevelId | null;
          placementTestResult?: PlacementResult | null;
          languages?: Record<string, Partial<LanguageProfile> | undefined>;
        } | null;

        if (version < 1) {
          // Pre-Phase-8 shape (the only shape ever shipped to real users — Phase 8A's
          // intermediate `selectedLanguage`-named shape was never deployed, so this
          // migrates straight from the original flat fields to the Phase 8B shape).
          const old = state ?? {};
          const activeLanguageCode = old.selectedLanguage ?? null;
          const languages: Record<string, Partial<LanguageProfile>> = activeLanguageCode
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
          const languages: AppState['languages'] = {};
          for (const [code, profile] of Object.entries(old.languages ?? {})) {
            if (!profile) continue;
            languages[code as LanguageCode] = {
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
