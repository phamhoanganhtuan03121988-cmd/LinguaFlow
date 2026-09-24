import type { LanguageCode } from '@/src/data/languages';
import { CONTENT_PACKS } from './index';
import type {
  ConversationScenario,
  Course,
  ExampleSentence,
  GrammarTopic,
  Lesson,
  PlacementTest,
  Unit,
  VocabularyItem,
  WritingItem,
} from './types';

/**
 * Content ids (unit/lesson/grammar/conversation/writing) are authored per
 * content pack (one pack per language+track+level) and are NOT guaranteed
 * unique across packs unless every pack follows the id-prefixing convention:
 * 'general' A1 ids stay as originally authored (e.g. "ko-l1-1-..."), 'general'
 * A2 ids get an extra "-a2-" segment, and exam-track sample ids get their own
 * track+level segment (e.g. "en-toeic-550-l1-..."). The composite-key maps
 * below are the safe lookup path for any caller that knows which language
 * it's resolving for — used internally whenever we already have a
 * Course/Unit in hand, so the whole course -> units -> lessons chain
 * resolves correctly even if ids ever collide across packs. Track and level
 * don't need their own key dimension in THESE maps: the id string itself
 * already encodes them via that prefix convention, so this mechanism is
 * unchanged from Phase 8A/9 — only the language+track+level -> Course/
 * GrammarTopic[]/ConversationScenario[]/PlacementTest registries below are new.
 *
 * The flat `*ById` maps below exist only for backward compatibility with
 * callers that have no language context (e.g. a bare `[lessonId]` route
 * param). They are "first pack registered wins" and guarded: a real id
 * collision across packs throws in dev (never silently shadows one pack's
 * content with another's) and logs an error in production rather than
 * crashing a shipped build.
 */
function compositeKey(languageCode: LanguageCode, id: string): string {
  return `${languageCode}::${id}`;
}

/** Key for the per-(language, track, level) registries below — e.g. "en::toeic::550". */
function trackLevelKey(languageCode: LanguageCode, trackId: string, levelId: string): string {
  return `${languageCode}::${trackId}::${levelId}`;
}

/** Key for the per-(language, track) level-list registry — e.g. "en::toeic". */
function trackKey(languageCode: LanguageCode, trackId: string): string {
  return `${languageCode}::${trackId}`;
}

const GENERAL_TRACK_ID = 'general';
const GENERAL_LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function registerWithCollisionGuard<T>(
  flatMap: Map<string, T>,
  id: string,
  value: T,
  kind: string,
  languageCode: LanguageCode,
): void {
  if (flatMap.has(id)) {
    const message =
      `[content] Duplicate ${kind} id "${id}" — already registered by another content pack before "${languageCode}". ` +
      `Content ids must be unique across every pack unless every caller resolving this id passes languageCode ` +
      `explicitly. Rename this id (non-A1-general packs must use their own track/level id segment convention).`;
    if (__DEV__) {
      throw new Error(message);
    }
    console.error(message);
    return;
  }
  flatMap.set(id, value);
}

const coursesById = new Map<string, Course>();
/** Default ("lowest level available in the general track") course per language — backward-compatible with pre-Phase-10 callers that don't pass a track/level. */
const defaultCourseByLanguage = new Map<LanguageCode, Course>();
const coursesByTrackLevel = new Map<string, Course>();
/** Which level ids have a registered course, per (language, track) — ascending in that track's own official order. */
const levelsByLanguageTrack = new Map<string, string[]>();

const unitsById = new Map<string, Unit>();
const unitsByCompositeKey = new Map<string, Unit>();

const lessonsById = new Map<string, Lesson>();
const lessonsByCompositeKey = new Map<string, Lesson>();

const grammarTopicsById = new Map<string, GrammarTopic>();
const grammarTopicsByCompositeKey = new Map<string, GrammarTopic>();
const grammarTopicsByTrackLevel = new Map<string, GrammarTopic[]>();

const conversationScenariosById = new Map<string, ConversationScenario>();
const conversationScenariosByCompositeKey = new Map<string, ConversationScenario>();
const conversationScenariosByTrackLevel = new Map<string, ConversationScenario[]>();

const placementTestByTrackLevel = new Map<string, PlacementTest>();

const writingItemsById = new Map<string, WritingItem>();
const writingItemsByCompositeKey = new Map<string, WritingItem>();
const writingItemsByLanguage = new Map<LanguageCode, WritingItem[]>();
const writingItemsByLessonId = new Map<string, WritingItem[]>();

for (const packs of Object.values(CONTENT_PACKS)) {
  if (!packs) continue;
  for (const pack of packs) {
    const languageCode = pack.course.languageCode;
    const trackId = pack.course.trackId ?? GENERAL_TRACK_ID;
    const levelId = pack.course.level;

    coursesById.set(pack.course.id, pack.course);
    coursesByTrackLevel.set(trackLevelKey(languageCode, trackId, levelId), pack.course);

    const tKey = trackKey(languageCode, trackId);
    const existingLevels = levelsByLanguageTrack.get(tKey) ?? [];
    if (!existingLevels.includes(levelId)) {
      levelsByLanguageTrack.set(tKey, [...existingLevels, levelId]);
    }

    if (trackId === GENERAL_TRACK_ID) {
      const currentDefault = defaultCourseByLanguage.get(languageCode);
      const currentDefaultLevel = currentDefault?.level;
      if (
        !currentDefault ||
        GENERAL_LEVEL_ORDER.indexOf(levelId) < GENERAL_LEVEL_ORDER.indexOf(currentDefaultLevel ?? 'C2')
      ) {
        defaultCourseByLanguage.set(languageCode, pack.course);
      }
    }

    for (const unit of pack.units) {
      unitsByCompositeKey.set(compositeKey(languageCode, unit.id), unit);
      registerWithCollisionGuard(unitsById, unit.id, unit, 'unit', languageCode);
    }
    for (const lesson of pack.lessons) {
      lessonsByCompositeKey.set(compositeKey(languageCode, lesson.id), lesson);
      registerWithCollisionGuard(lessonsById, lesson.id, lesson, 'lesson', languageCode);
    }

    const grammarTopics = pack.grammarTopics ?? [];
    grammarTopicsByTrackLevel.set(trackLevelKey(languageCode, trackId, levelId), grammarTopics);
    for (const topic of grammarTopics) {
      grammarTopicsByCompositeKey.set(compositeKey(languageCode, topic.id), topic);
      registerWithCollisionGuard(grammarTopicsById, topic.id, topic, 'grammar topic', languageCode);
    }

    const conversationScenarios = pack.conversationScenarios ?? [];
    conversationScenariosByTrackLevel.set(trackLevelKey(languageCode, trackId, levelId), conversationScenarios);
    for (const scenario of conversationScenarios) {
      conversationScenariosByCompositeKey.set(compositeKey(languageCode, scenario.id), scenario);
      registerWithCollisionGuard(conversationScenariosById, scenario.id, scenario, 'conversation scenario', languageCode);
    }

    if (pack.placementTest) {
      placementTestByTrackLevel.set(trackLevelKey(languageCode, trackId, levelId), pack.placementTest);
    }

    const writingItems = pack.writingItems ?? [];
    const existingWritingForLanguage = writingItemsByLanguage.get(languageCode) ?? [];
    writingItemsByLanguage.set(languageCode, [...existingWritingForLanguage, ...writingItems]);
    for (const item of writingItems) {
      writingItemsByCompositeKey.set(compositeKey(languageCode, item.id), item);
      registerWithCollisionGuard(writingItemsById, item.id, item, 'writing item', languageCode);

      const existingForLesson = writingItemsByLessonId.get(item.lessonId) ?? [];
      writingItemsByLessonId.set(item.lessonId, [...existingForLesson, item]);
    }
  }
}

if (__DEV__) {
  for (const lesson of lessonsById.values()) {
    const sentenceIds = new Set(lesson.sentences.map((sentence) => sentence.id));
    for (const item of lesson.vocabulary) {
      if (item.exampleSentenceId && !sentenceIds.has(item.exampleSentenceId)) {
        console.warn(
          `[content] Vocabulary "${item.id}" in lesson "${lesson.id}" references missing exampleSentenceId "${item.exampleSentenceId}".`,
        );
      }
    }
  }
}

/** Pass trackId+levelId to get a specific course; both default to the 'general' A1 course for backward compatibility with pre-Phase-10 callers. */
export function getCourseForLanguage(
  code: LanguageCode | null | undefined,
  trackId: string = GENERAL_TRACK_ID,
  levelId: string = 'A1',
): Course | undefined {
  if (!code) return undefined;
  return coursesByTrackLevel.get(trackLevelKey(code, trackId, levelId));
}

/** The lowest general-track level registered for a language — used only where no specific track/level is known. */
export function getDefaultCourseForLanguage(code: LanguageCode | null | undefined): Course | undefined {
  if (!code) return undefined;
  return defaultCourseByLanguage.get(code);
}

/** Which level ids have registered content for a (language, track), in that track's own official ascending order. */
export function getAvailableLevelsForTrack(
  code: LanguageCode | null | undefined,
  trackId: string,
  officialLevelOrder: string[],
): string[] {
  if (!code) return [];
  const registered = levelsByLanguageTrack.get(trackKey(code, trackId)) ?? [];
  return officialLevelOrder.filter((level) => registered.includes(level));
}

export function getCourseById(id: string): Course | undefined {
  return coursesById.get(id);
}

/** Pass languageCode when known (e.g. resolving from a Course/active language) for collision-safe lookup. */
export function getUnitById(id: string, languageCode?: LanguageCode): Unit | undefined {
  if (languageCode) return unitsByCompositeKey.get(compositeKey(languageCode, id));
  return unitsById.get(id);
}

/** Pass languageCode when known (e.g. resolving from a Course/active language) for collision-safe lookup. */
export function getLessonById(id: string, languageCode?: LanguageCode): Lesson | undefined {
  if (languageCode) return lessonsByCompositeKey.get(compositeKey(languageCode, id));
  return lessonsById.get(id);
}

export function getUnitsForCourse(courseId: string): Unit[] {
  const course = coursesById.get(courseId);
  if (!course) return [];
  return course.unitIds
    .map((id) => getUnitById(id, course.languageCode))
    .filter((unit): unit is Unit => Boolean(unit));
}

/**
 * Pass languageCode when known. Without it, the unit is resolved via the flat
 * (collision-guarded) map, but its lessons are still resolved through the unit's
 * own course language once found — so only the initial bare-id unit lookup is a
 * shared ambiguity point, not the whole unit -> lessons chain.
 */
export function getLessonsForUnit(unitId: string, languageCode?: LanguageCode): Lesson[] {
  const unit = getUnitById(unitId, languageCode);
  if (!unit) return [];
  const resolvedLanguageCode = languageCode ?? getCourseById(unit.courseId)?.languageCode;
  return unit.lessonIds
    .map((id) => getLessonById(id, resolvedLanguageCode))
    .filter((lesson): lesson is Lesson => Boolean(lesson));
}

export function getExampleSentenceForVocabulary(
  lesson: Lesson,
  item: VocabularyItem,
): ExampleSentence | undefined {
  if (!item.exampleSentenceId) return undefined;
  return lesson.sentences.find((sentence) => sentence.id === item.exampleSentenceId);
}

export function getCourseForLesson(lesson: Lesson): Course | undefined {
  const unit = unitsById.get(lesson.unitId);
  if (!unit) return undefined;
  return coursesById.get(unit.courseId);
}

/** Pass trackId+levelId for a specific course; both default to 'general'/'A1' for backward compatibility. */
export function getGrammarTopicsForLanguage(
  code: LanguageCode | null | undefined,
  trackId: string = GENERAL_TRACK_ID,
  levelId: string = 'A1',
): GrammarTopic[] {
  if (!code) return [];
  return grammarTopicsByTrackLevel.get(trackLevelKey(code, trackId, levelId)) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getGrammarTopicById(id: string, languageCode?: LanguageCode): GrammarTopic | undefined {
  if (languageCode) return grammarTopicsByCompositeKey.get(compositeKey(languageCode, id));
  return grammarTopicsById.get(id);
}

/** Pass trackId+levelId for a specific course; both default to 'general'/'A1' for backward compatibility. */
export function getConversationScenariosForLanguage(
  code: LanguageCode | null | undefined,
  trackId: string = GENERAL_TRACK_ID,
  levelId: string = 'A1',
): ConversationScenario[] {
  if (!code) return [];
  return conversationScenariosByTrackLevel.get(trackLevelKey(code, trackId, levelId)) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getConversationScenarioById(id: string, languageCode?: LanguageCode): ConversationScenario | undefined {
  if (languageCode) return conversationScenariosByCompositeKey.get(compositeKey(languageCode, id));
  return conversationScenariosById.get(id);
}

/** Pass trackId+levelId for a specific test; both default to 'general'/'A1' for backward compatibility. No exam-track diagnostic tests exist yet (Phase 10 Part 15: architecture only). */
export function getPlacementTestForLanguage(
  code: LanguageCode | null | undefined,
  trackId: string = GENERAL_TRACK_ID,
  levelId: string = 'A1',
): PlacementTest | undefined {
  if (!code) return undefined;
  return placementTestByTrackLevel.get(trackLevelKey(code, trackId, levelId));
}

/** All writing items for a language, across every registered track/level (used by the Practice tab's Writing section). */
export function getWritingItemsForLanguage(code: LanguageCode | null | undefined): WritingItem[] {
  if (!code) return [];
  return writingItemsByLanguage.get(code) ?? [];
}

/** Writing items introduced by one specific lesson (used by the Lesson screen's "Tập viết" section). */
export function getWritingItemsForLesson(lessonId: string): WritingItem[] {
  return writingItemsByLessonId.get(lessonId) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getWritingItemById(id: string, languageCode?: LanguageCode): WritingItem | undefined {
  if (languageCode) return writingItemsByCompositeKey.get(compositeKey(languageCode, id));
  return writingItemsById.get(id);
}
