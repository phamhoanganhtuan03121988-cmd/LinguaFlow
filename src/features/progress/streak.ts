/**
 * Pure date/streak helpers — no store, no side effects, easy to unit test.
 */

/** Local-timezone "YYYY-MM-DD". Never use toISOString() here — that's UTC and can shift the date. */
export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(fromKey: string, toKey: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((parseDateKey(toKey).getTime() - parseDateKey(fromKey).getTime()) / msPerDay);
}

export interface StreakState {
  lastActiveDate: string | null;
  currentStreakDays: number;
}

/**
 * Pure streak transition. Same-day activity is a no-op (already counted);
 * activity the day right after the last one extends the streak; any bigger
 * gap (or no prior activity) restarts it at 1.
 */
export function computeNextStreak(state: StreakState, today: string = getLocalDateKey()): StreakState {
  if (state.lastActiveDate === today) {
    return state;
  }
  if (state.lastActiveDate && daysBetween(state.lastActiveDate, today) === 1) {
    return { lastActiveDate: today, currentStreakDays: state.currentStreakDays + 1 };
  }
  return { lastActiveDate: today, currentStreakDays: 1 };
}
