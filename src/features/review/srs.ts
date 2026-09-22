/**
 * MVP spaced-repetition scheduler, inspired by SM-2. Pure functions only — no
 * React, no store — so the algorithm can be swapped or upgraded later without
 * touching the review UI or the store that persists its output.
 */

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface WordSrsState {
  wordId: string;
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: number;
  lastReviewedAt: number | null;
  totalReviews: number;
}

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;
const DAY_MS = 24 * 60 * 60 * 1000;

export function createInitialSrsState(wordId: string): WordSrsState {
  return {
    wordId,
    repetitions: 0,
    easeFactor: DEFAULT_EASE_FACTOR,
    intervalDays: 0,
    dueAt: Date.now(),
    lastReviewedAt: null,
    totalReviews: 0,
  };
}

export function scheduleNextReview(state: WordSrsState, rating: SrsRating, now: Date = new Date()): WordSrsState {
  const nowMs = now.getTime();
  const totalReviews = state.totalReviews + 1;

  if (rating === 'again') {
    return {
      ...state,
      repetitions: 0,
      easeFactor: Math.max(MIN_EASE_FACTOR, state.easeFactor - 0.2),
      intervalDays: 0,
      dueAt: nowMs + DAY_MS,
      lastReviewedAt: nowMs,
      totalReviews,
    };
  }

  const easeDelta = rating === 'hard' ? -0.15 : rating === 'easy' ? 0.15 : 0;
  const easeFactor = Math.max(MIN_EASE_FACTOR, state.easeFactor + easeDelta);
  const repetitions = state.repetitions + 1;

  let intervalDays: number;
  if (repetitions === 1) {
    intervalDays = rating === 'hard' ? 1 : rating === 'easy' ? 3 : 1;
  } else if (repetitions === 2) {
    intervalDays = rating === 'hard' ? 3 : rating === 'easy' ? 10 : 6;
  } else {
    const multiplier = rating === 'hard' ? easeFactor * 0.7 : rating === 'easy' ? easeFactor * 1.3 : easeFactor;
    intervalDays = Math.round(state.intervalDays * multiplier);
  }
  intervalDays = Math.max(1, intervalDays);

  return {
    ...state,
    repetitions,
    easeFactor,
    intervalDays,
    dueAt: nowMs + intervalDays * DAY_MS,
    lastReviewedAt: nowMs,
    totalReviews,
  };
}

/** A word is "mastered" once it has survived at least 2 successful (non-"again") reviews in a row. */
export function isMastered(state: WordSrsState): boolean {
  return state.repetitions >= 2;
}

export function isDue(state: WordSrsState, now: Date = new Date()): boolean {
  return state.dueAt <= now.getTime();
}
