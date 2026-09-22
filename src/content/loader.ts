import type { LanguageCode } from '@/src/data/languages';
import { CONTENT_PACKS } from './index';
import type {
  CEFRLevel,
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
 * content pack (one pack per language+level) and are NOT guaranteed unique
 * across packs unless every pack follows the id-prefixing convention: A1 ids
 * stay as originally authored (e.g. "ko-l1-1-..."), A2 ids get an extra
 * "-a2-" segment (e.g. "ko-a2-l1-1-..."). The composite-key maps below are
 * the safe lookup path for any caller that knows which language it's
 * resolving for — used internally whenever we already have a Course/Unit in
 * hand, so the whole course -> units -> lessons chain resolves correctly
 * even if ids ever collide across packs. Levels don't need their own key
 * dimension here: the id string itself already encodes the level via that
 * prefix convention, so this mechanism is unchanged from Phase 8A.
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

/** Key for the per-(language, level) registries below — e.g. "ko::A2". */
function levelKey(languageCode: LanguageCode, level: CEFRLevel): string {
  return `${languageCode}::${level}`;
}

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

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
      `explicitly. Rename this id (A2 packs must use the "-a2-" id segment convention).`;
    if (__DEV__) {
      throw new Error(message);
    }
    console.error(message);
    return;
  }
  flatMap.set(id, value);
}

const coursesById = new Map<string, Course>();
/** Default ("lowest level available") course per language — backward-compatible with pre-Phase-9 callers that don't pass a level. */
const defaultCourseByLanguage = new Map<LanguageCode, Course>();
const coursesByLanguageLevel = new Map<string, Course>();
const courseLevelsByLanguage = new Map<LanguageCode, CEFRLevel[]>();

const unitsById = new Map<string, Unit>();
const unitsByCompositeKey = new Map<string, Unit>();

const lessonsById = new Map<string, Lesson>();
const lessonsByCompositeKey = new Map<string, Lesson>();

const grammarTopicsById = new Map<string, GrammarTopic>();
const grammarTopicsByCompositeKey = new Map<string, GrammarTopic>();
const grammarTopicsByLanguageLevel = new Map<string, GrammarTopic[]>();

const conversationScenariosById = new Map<string, ConversationScenario>();
const conversationScenariosByCompositeKey = new Map<string, ConversationScenario>();
const conversationScenariosByLanguageLevel = new Map<string, ConversationScenario[]>();

const placementTestByLanguageLevel = new Map<string, PlacementTest>();

const writingItemsById = new Map<string, WritingItem>();
const writingItemsByCompositeKey = new Map<string, WritingItem>();
const writingItemsByLanguage = new Map<LanguageCode, WritingItem[]>();
const writingItemsByLessonId = new Map<string, WritingItem[]>();

for (const packs of Object.values(CONTENT_PACKS)) {
  if (!packs) continue;
  for (const pack of packs) {
    const languageCode = pack.course.languageCode;
    const level = pack.course.level;

    coursesById.set(pack.course.id, pack.course);
    coursesByLanguageLevel.set(levelKey(languageCode, level), pack.course);

    const existingLevels = courseLevelsByLanguage.get(languageCode) ?? [];
    courseLevelsByLanguage.set(languageCode, [...existingLevels, level]);

    const currentDefault = defaultCourseByLanguage.get(languageCode);
    if (!currentDefault || LEVEL_ORDER.indexOf(level) < LEVEL_ORDER.indexOf(currentDefault.level)) {
      defaultCourseByLanguage.set(languageCode, pack.course);
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
    grammarTopicsByLanguageLevel.set(levelKey(languageCode, level), grammarTopics);
    for (const topic of grammarTopics) {
      grammarTopicsByCompositeKey.set(compositeKey(languageCode, topic.id), topic);
      registerWithCollisionGuard(grammarTopicsById, topic.id, topic, 'grammar topic', languageCode);
    }

    const conversationScenarios = pack.conversationScenarios ?? [];
    conversationScenariosByLanguageLevel.set(levelKey(languageCode, level), conversationScenarios);
    for (const scenario of conversationScenarios) {
      conversationScenariosByCompositeKey.set(compositeKey(languageCode, scenario.id), scenario);
      registerWithCollisionGuard(conversationScenariosById, scenario.id, scenario, 'conversation scenario', languageCode);
    }

    if (pack.placementTest) {
      placementTestByLanguageLevel.set(levelKey(languageCode, level), pack.placementTest);
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

/** Pass level to get a specific course level; defaults to A1 for backward compatibility with pre-Phase-9 callers. */
export function getCourseForLanguage(code: LanguageCode | null | undefined, level: CEFRLevel = 'A1'): Course | undefined {
  if (!code) return undefined;
  return coursesByLanguageLevel.get(levelKey(code, level));
}

/** The lowest-level course registered for a language — used only where no specific level is known (kept for backward compatibility; prefer getCourseForLanguage(code, level)). */
export function getDefaultCourseForLanguage(code: LanguageCode | null | undefined): Course | undefined {
  if (!code) return undefined;
  return defaultCourseByLanguage.get(code);
}

/** Which CEFR levels have registered content for a language, in ascending order (e.g. ['A1', 'A2']). */
export function getCourseLevelsForLanguage(code: LanguageCode | null | undefined): CEFRLevel[] {
  if (!code) return [];
  const levels = courseLevelsByLanguage.get(code) ?? [];
  return LEVEL_ORDER.filter((level) => levels.includes(level));
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

/** Pass level to get a specific course level's grammar topics; defaults to A1 for backward compatibility. */
export function getGrammarTopicsForLanguage(code: LanguageCode | null | undefined, level: CEFRLevel = 'A1'): GrammarTopic[] {
  if (!code) return [];
  return grammarTopicsByLanguageLevel.get(levelKey(code, level)) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getGrammarTopicById(id: string, languageCode?: LanguageCode): GrammarTopic | undefined {
  if (languageCode) return grammarTopicsByCompositeKey.get(compositeKey(languageCode, id));
  return grammarTopicsById.get(id);
}

/** Pass level to get a specific course level's conversation scenarios; defaults to A1 for backward compatibility. */
export function getConversationScenariosForLanguage(
  code: LanguageCode | null | undefined,
  level: CEFRLevel = 'A1',
): ConversationScenario[] {
  if (!code) return [];
  return conversationScenariosByLanguageLevel.get(levelKey(code, level)) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getConversationScenarioById(id: string, languageCode?: LanguageCode): ConversationScenario | undefined {
  if (languageCode) return conversationScenariosByCompositeKey.get(compositeKey(languageCode, id));
  return conversationScenariosById.get(id);
}

/** Pass level to get a specific course level's placement test; defaults to A1 for backward compatibility. */
export function getPlacementTestForLanguage(code: LanguageCode | null | undefined, level: CEFRLevel = 'A1'): PlacementTest | undefined {
  if (!code) return undefined;
  return placementTestByLanguageLevel.get(levelKey(code, level));
}

/** All writing items for a language, across every registered level (used by the Practice tab's Writing section). */
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
