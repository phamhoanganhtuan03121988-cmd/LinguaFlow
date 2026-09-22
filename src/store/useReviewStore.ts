import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LanguageCode } from '@/src/data/languages';
import { useGamificationEvents } from '@/src/features/gamification/events';
import { createInitialSrsState, scheduleNextReview, type SrsRating, type WordSrsState } from '@/src/features/review/srs';
import { useAppStore } from './useAppStore';
import { useProgressStore } from './useProgressStore';

/** MVP XP formula — flat rewards per rating, plus a session-completion bonus. Not final balancing. */
export const XP_REWARDS: Record<SrsRating, number> = {
  again: 1,
  hard: 2,
  good: 3,
  easy: 4,
};
export const SESSION_COMPLETION_XP = 10;

export interface LanguageReview {
  wordStates: Record<string, WordSrsState>;
  totalReviewSessionsCompleted: number;
}

function createEmptyLanguageReview(): LanguageReview {
  return { wordStates: {}, totalReviewSessionsCompleted: 0 };
}

/** Stable reference for "no language" reads, so selectors don't return a fresh object every call. */
const EMPTY_LANGUAGE_REVIEW: LanguageReview = createEmptyLanguageReview();

export interface ReviewState {
  hasHydrated: boolean;
  /** Global — a whole-account gamification score, not per-language. Can't be reconstructed per-language retroactively since only a running total is stored, not per-review history. See Phase 8 proposal. */
  xp: number;
  /** Single source of truth for per-language SRS state and review session counts. */
  languages: Partial<Record<LanguageCode, LanguageReview>>;

  recordReview: (wordId: string, rating: SrsRating, languageCode?: LanguageCode) => void;
  completeSession: (reviewedCount: number, languageCode?: LanguageCode) => void;
  /** Wipes every language's SRS/review data. XP included — used by resetAllData()'s full factory reset. */
  resetAll: () => void;
}

/** Reads a language's review/SRS slice, falling back to a stable empty default when unset. */
export function selectLanguageReview(state: ReviewState, languageCode: LanguageCode | null): LanguageReview {
  return (languageCode && state.languages[languageCode]) || EMPTY_LANGUAGE_REVIEW;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      xp: 0,
      languages: {},

      recordReview: (wordId, rating, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;

        const slice = get().languages[code] ?? createEmptyLanguageReview();
        const existing = slice.wordStates[wordId] ?? createInitialSrsState(wordId);
        const updated = scheduleNextReview(existing, rating);
        const xpGained = XP_REWARDS[rating];

        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...slice, wordStates: { ...slice.wordStates, [wordId]: updated } },
          },
          xp: state.xp + xpGained,
        }));

        useProgressStore.getState().recordActivity(code);
        useGamificationEvents.getState().emit('review-recorded', { wordId, rating });
        useGamificationEvents.getState().emit('xp-earned', { amount: xpGained, reason: 'review' });
      },

      completeSession: (reviewedCount, languageCode) => {
        const code = languageCode ?? useAppStore.getState().activeLanguageCode;
        if (!code) return;

        const slice = get().languages[code] ?? createEmptyLanguageReview();

        set((state) => ({
          languages: {
            ...state.languages,
            [code]: { ...slice, totalReviewSessionsCompleted: slice.totalReviewSessionsCompleted + 1 },
          },
          xp: state.xp + SESSION_COMPLETION_XP,
        }));

        useProgressStore.getState().recordActivity(code);
        useGamificationEvents.getState().emit('session-completed', { reviewedCount });
        useGamificationEvents.getState().emit('xp-earned', { amount: SESSION_COMPLETION_XP, reason: 'session' });
      },

      resetAll: () => {
        set({ xp: 0, languages: {} });
      },
    }),
    {
      name: 'linguaflow-review-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      migrate: (persistedState: unknown, version) => {
        if (version >= 1) return persistedState;
        const old = (persistedState ?? {}) as {
          wordStates?: Record<string, WordSrsState>;
          totalReviewSessionsCompleted?: number;
          xp?: number;
        };
        // Only 'en' content has ever existed in CONTENT_PACKS, so any legacy SRS
        // data is provably English — no cross-store read needed.
        const hasLegacyData =
          Object.keys(old.wordStates ?? {}).length > 0 || (old.totalReviewSessionsCompleted ?? 0) > 0;

        const languages: ReviewState['languages'] = hasLegacyData
          ? { en: { wordStates: old.wordStates ?? {}, totalReviewSessionsCompleted: old.totalReviewSessionsCompleted ?? 0 } }
          : {};

        return {
          xp: old.xp ?? 0,
          languages,
        };
      },
      onRehydrateStorage: () => () => {
        useReviewStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        xp: state.xp,
        languages: state.languages,
      }),
    },
  ),
);
