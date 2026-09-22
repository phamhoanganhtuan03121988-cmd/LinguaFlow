import { isMastered, type WordSrsState } from './srs';

export interface ReviewStats {
  /** Words that have been rated at least once. */
  totalWordsLearned: number;
  /** Words that reached the SRS "mastered" threshold. */
  masteredWords: number;
  /** Total number of individual rating actions across all words. */
  totalReviews: number;
}

export function getReviewStats(wordStates: Record<string, WordSrsState>): ReviewStats {
  const states = Object.values(wordStates);
  return {
    totalWordsLearned: states.length,
    masteredWords: states.filter(isMastered).length,
    totalReviews: states.reduce((sum, state) => sum + state.totalReviews, 0),
  };
}
