import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useGamificationEvents } from '@/src/features/gamification/events';
import { computeNextStreak } from '@/src/features/progress/streak';

interface ProgressState {
  hasHydrated: boolean;
  completedLessonIds: Record<string, true>;
  practicedSpeakingIds: Record<string, true>;
  totalListeningSessionsCompleted: number;
  completedGrammarTopicIds: Record<string, true>;
  completedConversationScenarioIds: Record<string, true>;
  lastActiveDate: string | null;
  currentStreakDays: number;
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  markSpeakingPracticed: (id: string) => void;
  isSpeakingPracticed: (id: string) => boolean;
  completeListeningSession: () => void;
  markGrammarTopicComplete: (id: string) => void;
  isGrammarTopicComplete: (id: string) => boolean;
  markConversationScenarioComplete: (id: string) => void;
  isConversationScenarioComplete: (id: string) => boolean;
  /** Call only when the learner actually completes something (lesson, session, topic, scenario) — never on views/plays/flips. */
  recordActivity: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      completedLessonIds: {},
      practicedSpeakingIds: {},
      totalListeningSessionsCompleted: 0,
      completedGrammarTopicIds: {},
      completedConversationScenarioIds: {},
      lastActiveDate: null,
      currentStreakDays: 0,

      markLessonComplete: (lessonId) => {
        set((state) => ({
          completedLessonIds: { ...state.completedLessonIds, [lessonId]: true },
        }));
        get().recordActivity();
        useGamificationEvents.getState().emit('lesson-completed', { lessonId });
      },
      isLessonComplete: (lessonId) => Boolean(get().completedLessonIds[lessonId]),

      markSpeakingPracticed: (id) => {
        set((state) => ({
          practicedSpeakingIds: { ...state.practicedSpeakingIds, [id]: true },
        }));
      },
      isSpeakingPracticed: (id) => Boolean(get().practicedSpeakingIds[id]),

      completeListeningSession: () => {
        set((state) => ({
          totalListeningSessionsCompleted: state.totalListeningSessionsCompleted + 1,
        }));
        get().recordActivity();
        useGamificationEvents.getState().emit('session-completed', { kind: 'listening' });
      },

      markGrammarTopicComplete: (id) => {
        set((state) => ({
          completedGrammarTopicIds: { ...state.completedGrammarTopicIds, [id]: true },
        }));
        get().recordActivity();
      },
      isGrammarTopicComplete: (id) => Boolean(get().completedGrammarTopicIds[id]),

      markConversationScenarioComplete: (id) => {
        set((state) => ({
          completedConversationScenarioIds: { ...state.completedConversationScenarioIds, [id]: true },
        }));
        get().recordActivity();
      },
      isConversationScenarioComplete: (id) => Boolean(get().completedConversationScenarioIds[id]),

      recordActivity: () => {
        set((state) => computeNextStreak({ lastActiveDate: state.lastActiveDate, currentStreakDays: state.currentStreakDays }));
      },
    }),
    {
      name: 'linguaflow-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useProgressStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        completedLessonIds: state.completedLessonIds,
        practicedSpeakingIds: state.practicedSpeakingIds,
        totalListeningSessionsCompleted: state.totalListeningSessionsCompleted,
        completedGrammarTopicIds: state.completedGrammarTopicIds,
        completedConversationScenarioIds: state.completedConversationScenarioIds,
        lastActiveDate: state.lastActiveDate,
        currentStreakDays: state.currentStreakDays,
      }),
    },
  ),
);
