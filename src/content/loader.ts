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

const coursesById = new Map<string, Course>();
const courseByLanguage = new Map<LanguageCode, Course>();
const unitsById = new Map<string, Unit>();
const lessonsById = new Map<string, Lesson>();
const grammarTopicsById = new Map<string, GrammarTopic>();
const grammarTopicsByLanguage = new Map<LanguageCode, GrammarTopic[]>();
const conversationScenariosById = new Map<string, ConversationScenario>();
const conversationScenariosByLanguage = new Map<LanguageCode, ConversationScenario[]>();
const placementTestByLanguage = new Map<LanguageCode, PlacementTest>();

for (const pack of Object.values(CONTENT_PACKS)) {
  if (!pack) continue;
  coursesById.set(pack.course.id, pack.course);
  courseByLanguage.set(pack.course.languageCode, pack.course);
  for (const unit of pack.units) unitsById.set(unit.id, unit);
  for (const lesson of pack.lessons) lessonsById.set(lesson.id, lesson);

  const grammarTopics = pack.grammarTopics ?? [];
  grammarTopicsByLanguage.set(pack.course.languageCode, grammarTopics);
  for (const topic of grammarTopics) grammarTopicsById.set(topic.id, topic);

  const conversationScenarios = pack.conversationScenarios ?? [];
  conversationScenariosByLanguage.set(pack.course.languageCode, conversationScenarios);
  for (const scenario of conversationScenarios) conversationScenariosById.set(scenario.id, scenario);

  if (pack.placementTest) {
    placementTestByLanguage.set(pack.course.languageCode, pack.placementTest);
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

export function getUnitById(id: string): Unit | undefined {
  return unitsById.get(id);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessonsById.get(id);
}

export function getUnitsForCourse(courseId: string): Unit[] {
  const course = coursesById.get(courseId);
  if (!course) return [];
  return course.unitIds
    .map((id) => unitsById.get(id))
    .filter((unit): unit is Unit => Boolean(unit));
}

export function getLessonsForUnit(unitId: string): Lesson[] {
  const unit = unitsById.get(unitId);
  if (!unit) return [];
  return unit.lessonIds
    .map((id) => lessonsById.get(id))
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

export function getGrammarTopicById(id: string): GrammarTopic | undefined {
  return grammarTopicsById.get(id);
}

export function getConversationScenariosForLanguage(code: LanguageCode | null | undefined): ConversationScenario[] {
  if (!code) return [];
  return conversationScenariosByLanguage.get(code) ?? [];
}

export function getConversationScenarioById(id: string): ConversationScenario | undefined {
  return conversationScenariosById.get(id);
}

export function getPlacementTestForLanguage(code: LanguageCode | null | undefined): PlacementTest | undefined {
  if (!code) return undefined;
  return placementTestByLanguage.get(code);
}
