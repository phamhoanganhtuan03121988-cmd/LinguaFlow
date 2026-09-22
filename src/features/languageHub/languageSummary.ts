import type { CEFRLevel } from '@/src/content/types';
import type { CurrentLevelId } from '@/src/data/levels';
import type { LanguageCode } from '@/src/data/languages';
import { getCourseForLanguage, getCourseLevelsForLanguage, getUnitById, getUnitsForCourse } from '@/src/content/loader';
import { getCourseProgress, getNextLessonForCourse } from '@/src/features/learn/courseProgress';

export type LanguageHubStatus = 'not-started' | 'in-progress' | 'completed' | 'no-content';

export interface LanguageHubEntry {
  code: LanguageCode;
  status: LanguageHubStatus;
  /** The Phase 7 placement-derived proficiency tier (beginner/elementary/intermediate) — unrelated to activeLevel, see useAppStore.LanguageProfile. */
  level: CurrentLevelId | null;
  /** Which CEFR course level (A1/A2/...) this entry describes — the language's activeLevel. */
  activeLevel: CEFRLevel;
  /** Every CEFR level with registered content for this language, ascending. */
  availableLevels: CEFRLevel[];
  /** True once activeLevel is fully completed AND a next level exists in availableLevels — never auto-switches, only signals the "Bắt đầu A2" CTA should show. */
  nextLevel: CEFRLevel | null;
  completedCount: number;
  totalCount: number;
  progressRatio: number;
  currentUnitIndex: number | null;
  nextLessonId: string | null;
  lastStudiedAt: number | null;
}

/**
 * Pure aggregation for one Learning Hub card — reads only, derives everything
 * from data already in the stores/content. Nothing here writes state.
 */
export function getLanguageHubEntry(
  code: LanguageCode,
  level: CurrentLevelId | null,
  activeLevel: CEFRLevel,
  completedLessonIds: Record<string, true>,
  lastStudiedAt: number | null,
): LanguageHubEntry {
  const availableLevels = getCourseLevelsForLanguage(code);
  const course = getCourseForLanguage(code, activeLevel);

  if (!course) {
    return {
      code,
      status: 'no-content',
      level,
      activeLevel,
      availableLevels,
      nextLevel: null,
      completedCount: 0,
      totalCount: 0,
      progressRatio: 0,
      currentUnitIndex: null,
      nextLessonId: null,
      lastStudiedAt,
    };
  }

  const { completedCount, totalCount } = getCourseProgress(course, completedLessonIds);
  const nextLesson = getNextLessonForCourse(course, completedLessonIds);
  const currentUnit = nextLesson ? getUnitById(nextLesson.unitId, code) : undefined;
  const currentUnitIndex = currentUnit
    ? getUnitsForCourse(course.id).findIndex((unit) => unit.id === currentUnit.id) + 1
    : null;

  const status: LanguageHubStatus =
    totalCount > 0 && completedCount === totalCount ? 'completed' : completedCount > 0 ? 'in-progress' : 'not-started';

  const nextLevel =
    status === 'completed' ? availableLevels[availableLevels.indexOf(activeLevel) + 1] ?? null : null;

  return {
    code,
    status,
    level,
    activeLevel,
    availableLevels,
    nextLevel,
    completedCount,
    totalCount,
    progressRatio: totalCount > 0 ? completedCount / totalCount : 0,
    currentUnitIndex,
    nextLessonId: nextLesson?.id ?? null,
    lastStudiedAt,
  };
}
