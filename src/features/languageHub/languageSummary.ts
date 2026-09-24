import type { CurrentLevelId } from '@/src/data/levels';
import type { LanguageCode } from '@/src/data/languages';
import { getAvailableLevelsForTrack, getCourseForLanguage, getUnitById, getUnitsForCourse } from '@/src/content/loader';
import { getTrack } from '@/src/content/tracks';
import { getCourseProgress, getNextLessonForCourse } from '@/src/features/learn/courseProgress';
import type { TrackGoal } from '@/src/store/useAppStore';

export type LanguageHubStatus = 'not-started' | 'in-progress' | 'completed' | 'no-content';

export interface LanguageHubEntry {
  code: LanguageCode;
  status: LanguageHubStatus;
  /** The Phase 7 placement-derived proficiency tier (beginner/elementary/intermediate) — unrelated to activeTrackId/activeLevelId, see useAppStore.LanguageProfile. */
  level: CurrentLevelId | null;
  activeTrackId: string;
  activeLevelId: string;
  /** The learner's stated target, if any — independent of what's actively being studied. */
  trackGoal: TrackGoal | null;
  /** Every level of the ACTIVE track with registered content, in that track's own official order. */
  availableLevels: string[];
  /** True once activeLevelId is fully completed AND a next level exists in availableLevels — never auto-switches, only signals the "Cấp độ tiếp theo" CTA should show. */
  nextLevel: string | null;
  /** True when the active course is a Phase 10 proof-of-architecture sample, not a full curriculum. */
  isSample: boolean;
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
  activeTrackId: string,
  activeLevelId: string,
  trackGoal: TrackGoal | null,
  completedLessonIds: Record<string, true>,
  lastStudiedAt: number | null,
): LanguageHubEntry {
  const track = getTrack(code, activeTrackId);
  const availableLevels = track ? getAvailableLevelsForTrack(code, activeTrackId, track.levels) : [];
  const course = getCourseForLanguage(code, activeTrackId, activeLevelId);

  if (!course) {
    return {
      code,
      status: 'no-content',
      level,
      activeTrackId,
      activeLevelId,
      trackGoal,
      availableLevels,
      nextLevel: null,
      isSample: false,
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
    status === 'completed' ? availableLevels[availableLevels.indexOf(activeLevelId) + 1] ?? null : null;

  return {
    code,
    status,
    level,
    activeTrackId,
    activeLevelId,
    trackGoal,
    availableLevels,
    nextLevel,
    isSample: Boolean(course.isSample),
    completedCount,
    totalCount,
    progressRatio: totalCount > 0 ? completedCount / totalCount : 0,
    currentUnitIndex,
    nextLessonId: nextLesson?.id ?? null,
    lastStudiedAt,
  };
}
