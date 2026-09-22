import { getCourseById, getLessonById, getLessonsForUnit, getUnitsForCourse } from '@/src/content/loader';
import type { Course, Lesson, Unit } from '@/src/content/types';

export function getUnitProgress(unit: Unit, completedLessonIds: Record<string, true>) {
  const languageCode = getCourseById(unit.courseId)?.languageCode;
  const lessons = getLessonsForUnit(unit.id, languageCode);
  const completedCount = lessons.filter((lesson) => completedLessonIds[lesson.id]).length;
  return { completedCount, totalCount: lessons.length };
}

export function getCourseProgress(course: Course, completedLessonIds: Record<string, true>) {
  const units = getUnitsForCourse(course.id);
  return units.reduce(
    (acc, unit) => {
      const { completedCount, totalCount } = getUnitProgress(unit, completedLessonIds);
      return { completedCount: acc.completedCount + completedCount, totalCount: acc.totalCount + totalCount };
    },
    { completedCount: 0, totalCount: 0 },
  );
}

/** Returns the first not-yet-completed lesson in course order, or the very first lesson if none are completed. */
export function getNextLessonForCourse(course: Course, completedLessonIds: Record<string, true>): Lesson | undefined {
  const allLessonIds = getUnitsForCourse(course.id).flatMap((unit) => unit.lessonIds);
  if (allLessonIds.length === 0) return undefined;
  const nextId = allLessonIds.find((id) => !completedLessonIds[id]) ?? allLessonIds[0];
  return getLessonById(nextId, course.languageCode);
}

export type TimelineStatus = 'completed' | 'current' | 'upcoming';

/**
 * Course Timeline status for a single lesson. Purely a display label — never
 * used to gate navigation, every lesson stays tappable regardless of status.
 * Completion is checked before "current" so a fully-finished course (where
 * getNextLessonForCourse falls back to lesson 1) never mislabels an already
 * completed lesson as current.
 */
export function getLessonStatus(
  lesson: Lesson,
  nextLesson: Lesson | undefined,
  completedLessonIds: Record<string, true>,
): TimelineStatus {
  if (completedLessonIds[lesson.id]) return 'completed';
  if (nextLesson?.id === lesson.id) return 'current';
  return 'upcoming';
}

/** Course Timeline status for a whole unit, derived the same way as getLessonStatus. */
export function getUnitStatus(
  unit: Unit,
  nextLesson: Lesson | undefined,
  completedCount: number,
  totalCount: number,
): TimelineStatus {
  if (totalCount > 0 && completedCount === totalCount) return 'completed';
  if (nextLesson?.unitId === unit.id) return 'current';
  return 'upcoming';
}
