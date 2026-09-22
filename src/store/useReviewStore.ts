import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useGamificationEvents } from '@/src/features/gamification/events';
import { createInitialSrsState, scheduleNextReview, type SrsRating, type WordSrsState } from '@/src/features/review/srs';
import { useProgressStore } from './useProgressStore';

/** MVP XP formula — flat rewards per rating, plus a session-completion bonus. Not final balancing. */
export const XP_REWARDS: Record<SrsRating, number> = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 4,
};
export const SESSION_COMPLETION_XP = 10;

interface ReviewState {
  hasHydrated: boolean;
  wordStates: Record<string, WordSrsState>;
  totalReviewSessionsCompleted: number;
  xp: number;
  recordReview: (wordId: string, rating: SrsRating) => void;
  completeSession: (reviewedCount: number) => void;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      wordStates: {},
      totalReviewSessionsCompleted: 0,
      xp: 0,

      recordReview: (wordId, rating) => {
        const existing = get().wordStates[wordId] ?? createInitialSrsState(wordId);
        const updated = scheduleNextReview(existing, rating);
        const xpGained = XP_REWARDS[rating];

        set((state) => ({
          wordStates: { ...state.wordStates, [wordId]: updated },
          xp: state.xp + xpGained,
        }));

        useGamificationEvents.getState().emit('review-recorded', { wordId, rating });
        useGamificationEvents.getState().emit('xp-earned', { amount: xpGained, reason: 'review' });
      },

      completeSession: (reviewedCount) => {
        set((state) => ({
          totalReviewSessionsCompleted: state.totalReviewSessionsCompleted + 1,
          xp: state.xp + SESSION_COMPLETION_XP,
        }));

        useProgressStore.getState().recordActivity();
        useGamificationEvents.getState().emit('session-completed', { reviewedCount });
        useGamificationEvents.getState().emit('xp-earned', { amount: SESSION_COMPLETION_XP, reason: 'session' });
      },
    }),
    {
      name: 'linguaflow-review-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useReviewStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        wordStates: state.wordStates,
        totalReviewSessionsCompleted: state.totalReviewSessionsCompleted,
        xp: state.xp,
      }),
    },
  ),
);
