import { getLessonById, getLessonsForUnit, getUnitsForCourse } from '@/src/content/loader';
import type { Course, Lesson, Unit } from '@/src/content/types';

export function getUnitProgress(unit: Unit, completedLessonIds: Record<string, true>) {
  const lessons = getLessonsForUnit(unit.id);
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
  return getLessonById(nextId);
}
