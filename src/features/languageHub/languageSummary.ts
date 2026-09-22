import type { CurrentLevelId } from '@/src/data/levels';
import type { LanguageCode } from '@/src/data/languages';
import { getCourseForLanguage, getUnitById, getUnitsForCourse } from '@/src/content/loader';
import { getCourseProgress, getNextLessonForCourse } from '@/src/features/learn/courseProgress';

export type LanguageHubStatus = 'not-started' | 'in-progress' | 'completed' | 'no-content';

export interface LanguageHubEntry {
  code: LanguageCode;
  status: LanguageHubStatus;
  level: CurrentLevelId | null;
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
  completedLessonIds: Record<string, true>,
  lastStudiedAt: number | null,
): LanguageHubEntry {
  const course = getCourseForLanguage(code);

  if (!course) {
    return {
      code,
      status: 'no-content',
      level,
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

  return {
    code,
    status,
    level,
    completedCount,
    totalCount,
    progressRatio: totalCount > 0 ? completedCount / totalCount : 0,
    currentUnitIndex,
    nextLessonId: nextLesson?.id ?? null,
    lastStudiedAt,
  };
}
