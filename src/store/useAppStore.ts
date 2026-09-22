import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LanguageCode } from '@/src/data/languages';
import type { LearningGoalId } from '@/src/data/goals';
import type { CurrentLevelId } from '@/src/data/levels';
import type { PlacementResult } from '@/src/features/placement/scoring';

interface AppState {
  hasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  selectedLanguage: LanguageCode | null;
  learningGoal: LearningGoalId | null;
  currentLevel: CurrentLevelId | null;
  /** Most recent placement test result only — retaking overwrites it, no history kept. */
  placementTestResult: PlacementResult | null;
  setSelectedLanguage: (language: LanguageCode) => void;
  setLearningGoal: (goal: LearningGoalId) => void;
  setCurrentLevel: (level: CurrentLevelId) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setPlacementTestResult: (result: PlacementResult) => void;
  /** Explicit, user-initiated action — the result never changes currentLevel on its own. */
  applyPlacementRecommendation: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      hasCompletedOnboarding: false,
      selectedLanguage: null,
      learningGoal: null,
      currentLevel: null,
      placementTestResult: null,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      setLearningGoal: (goal) => set({ learningGoal: goal }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          selectedLanguage: null,
          learningGoal: null,
          currentLevel: null,
          placementTestResult: null,
        }),
      setPlacementTestResult: (result) => set({ placementTestResult: result }),
      applyPlacementRecommendation: () => {
        const result = get().placementTestResult;
        if (!result) return;
        set({ currentLevel: result.recommendedLevel });
      },
    }),
    {
      name: 'linguaflow-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useAppStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        selectedLanguage: state.selectedLanguage,
        learningGoal: state.learningGoal,
        currentLevel: state.currentLevel,
        placementTestResult: state.placementTestResult,
      }),
    },
  ),
);
