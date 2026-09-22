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
} from './types';

/**
 * Content ids (unit/lesson/grammar/conversation) are authored per-language-pack
 * and are NOT guaranteed unique across packs (e.g. an "en" and a "zh" pack could
 * both use "u1-greetings"). The composite-key maps below are the safe lookup path
 * for any caller that knows which language it's resolving for — used internally
 * whenever we already have a Course/Unit in hand, so the whole course -> units ->
 * lessons chain resolves correctly even if ids collide across packs.
 *
 * The flat `*ById` maps below exist only for backward compatibility with callers
 * that have no language context (e.g. a bare `[lessonId]` route param). They are
 * "first pack registered wins" and guarded: a real id collision across packs
 * throws in dev (never silently shadows one language's content with another's)
 * and logs an error in production rather than crashing a shipped build.
 */
function compositeKey(languageCode: LanguageCode, id: string): string {
  return `${languageCode}::${id}`;
}

function registerWithCollisionGuard<T>(
  flatMap: Map<string, T>,
  id: string,
  value: T,
  kind: string,
  languageCode: LanguageCode,
): void {
  if (flatMap.has(id)) {
    const message =
      `[content] Duplicate ${kind} id "${id}" — already registered by another language pack before "${languageCode}". ` +
      `Content ids must be unique across language packs unless every caller resolving this id passes languageCode ` +
      `explicitly. Rename this id in the "${languageCode}" pack.`;
    if (__DEV__) {
      throw new Error(message);
    }
    console.error(message);
    return;
  }
  flatMap.set(id, value);
}

const coursesById = new Map<string, Course>();
const courseByLanguage = new Map<LanguageCode, Course>();

const unitsById = new Map<string, Unit>();
const unitsByCompositeKey = new Map<string, Unit>();

const lessonsById = new Map<string, Lesson>();
const lessonsByCompositeKey = new Map<string, Lesson>();

const grammarTopicsById = new Map<string, GrammarTopic>();
const grammarTopicsByCompositeKey = new Map<string, GrammarTopic>();
const grammarTopicsByLanguage = new Map<LanguageCode, GrammarTopic[]>();

const conversationScenariosById = new Map<string, ConversationScenario>();
const conversationScenariosByCompositeKey = new Map<string, ConversationScenario>();
const conversationScenariosByLanguage = new Map<LanguageCode, ConversationScenario[]>();

const placementTestByLanguage = new Map<LanguageCode, PlacementTest>();

for (const pack of Object.values(CONTENT_PACKS)) {
  if (!pack) continue;
  const languageCode = pack.course.languageCode;

  coursesById.set(pack.course.id, pack.course);
  courseByLanguage.set(languageCode, pack.course);

  for (const unit of pack.units) {
    unitsByCompositeKey.set(compositeKey(languageCode, unit.id), unit);
    registerWithCollisionGuard(unitsById, unit.id, unit, 'unit', languageCode);
  }
  for (const lesson of pack.lessons) {
    lessonsByCompositeKey.set(compositeKey(languageCode, lesson.id), lesson);
    registerWithCollisionGuard(lessonsById, lesson.id, lesson, 'lesson', languageCode);
  }

  const grammarTopics = pack.grammarTopics ?? [];
  grammarTopicsByLanguage.set(languageCode, grammarTopics);
  for (const topic of grammarTopics) {
    grammarTopicsByCompositeKey.set(compositeKey(languageCode, topic.id), topic);
    registerWithCollisionGuard(grammarTopicsById, topic.id, topic, 'grammar topic', languageCode);
  }

  const conversationScenarios = pack.conversationScenarios ?? [];
  conversationScenariosByLanguage.set(languageCode, conversationScenarios);
  for (const scenario of conversationScenarios) {
    conversationScenariosByCompositeKey.set(compositeKey(languageCode, scenario.id), scenario);
    registerWithCollisionGuard(conversationScenariosById, scenario.id, scenario, 'conversation scenario', languageCode);
  }

  if (pack.placementTest) {
    placementTestByLanguage.set(languageCode, pack.placementTest);
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

export function getCourseForLanguage(code: LanguageCode | null | undefined): Course | undefined {
  if (!code) return undefined;
  return courseByLanguage.get(code);
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

export function getGrammarTopicsForLanguage(code: LanguageCode | null | undefined): GrammarTopic[] {
  if (!code) return [];
  return grammarTopicsByLanguage.get(code) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getGrammarTopicById(id: string, languageCode?: LanguageCode): GrammarTopic | undefined {
  if (languageCode) return grammarTopicsByCompositeKey.get(compositeKey(languageCode, id));
  return grammarTopicsById.get(id);
}

export function getConversationScenariosForLanguage(code: LanguageCode | null | undefined): ConversationScenario[] {
  if (!code) return [];
  return conversationScenariosByLanguage.get(code) ?? [];
}

/** Pass languageCode when known for collision-safe lookup. */
export function getConversationScenarioById(id: string, languageCode?: LanguageCode): ConversationScenario | undefined {
  if (languageCode) return conversationScenariosByCompositeKey.get(compositeKey(languageCode, id));
  return conversationScenariosById.get(id);
}

export function getPlacementTestForLanguage(code: LanguageCode | null | undefined): PlacementTest | undefined {
  if (!code) return undefined;
  return placementTestByLanguage.get(code);
}
