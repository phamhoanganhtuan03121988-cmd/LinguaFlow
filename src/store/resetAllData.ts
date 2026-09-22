import { useAppStore } from './useAppStore';
import { useProgressStore } from './useProgressStore';
import { useReviewStore } from './useReviewStore';

/**
 * Full factory reset across all 3 stores — every language's progress, SRS, XP,
 * streak, and onboarding state. Lives outside the stores (rather than as a
 * cross-store method on one of them) so none of the 3 stores needs to import
 * another, keeping the store dependency graph a clean DAG:
 *   useReviewStore -> useProgressStore -> useAppStore
 * This module sits above all three as a pure consumer.
 */
export function resetAllData(): void {
  useProgressStore.getState().resetAll();
  useReviewStore.getState().resetAll();
  useAppStore.getState().resetAppState();
}
