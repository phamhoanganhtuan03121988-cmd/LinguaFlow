import type { LanguageCode } from '@/src/data/languages';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface VocabularyItem {
  id: string;
  term: string;
  translationVi: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'phrase' | 'pronoun' | 'greeting';
  /** Id of an ExampleSentence in the same lesson that demonstrates this word. */
  exampleSentenceId?: string;
  /** Short usage tip, e.g. distinguishing near-synonyms or noting formality. */
  usageNoteVi?: string;
  /** Reserved for future pronunciation audio playback. Not implemented yet. */
  audioUrl?: string;
  /** Reserved for future visual flashcards. Not implemented yet. */
  imageUrl?: string;
}

export interface ExampleSentence {
  id: string;
  text: string;
  translationVi: string;
  /** Reserved for future pronunciation audio playback. Not implemented yet. */
  audioUrl?: string;
}

/** Used by Conversation scenarios (Phase 5). Also reserved for future dialogue-based lessons. */
export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  translationVi: string;
}

export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'word-order';

interface BaseExercise {
  id: string;
  type: ExerciseType;
  promptVi: string;
  /** Short feedback shown after answering, any exercise type. */
  explanationVi?: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank';
  sentenceTemplate: string;
  wordBank: string[];
  correctAnswer: string;
}

export interface WordOrderExercise extends BaseExercise {
  type: 'word-order';
  words: string[];
  correctOrder: string[];
}

export type Exercise = MultipleChoiceExercise | FillBlankExercise | WordOrderExercise;

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  titleVi: string;
  objectiveVi: string;
  estimatedMinutes: number;
  vocabulary: VocabularyItem[];
  sentences: ExampleSentence[];
  exercises: Exercise[];
  /** Short, optional grammar tip shown alongside the lesson content. */
  grammarNoteVi?: string;
  /** Reserved for future dialogue-based lessons. Not populated or rendered yet. */
  dialogue?: DialogueLine[];
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  titleVi: string;
  descriptionVi: string;
  lessonIds: string[];
}

export interface Course {
  id: string;
  languageCode: LanguageCode;
  level: CEFRLevel;
  titleVi: string;
  descriptionVi: string;
  unitIds: string[];
}

export interface GrammarTopic {
  id: string;
  languageCode: LanguageCode;
  level: CEFRLevel;
  title: string;
  titleVi: string;
  explanationVi: string;
  structure: string;
  /** Short bullet-point rules, rendered as a list — clearer on mobile than one long paragraph. */
  keyPoints?: string[];
  examples: ExampleSentence[];
  commonMistakesVi?: string;
  exercises: Exercise[];
}

export interface ConversationTaskOption {
  id: string;
  text: string;
}

export type ConversationTaskType =
  | 'choose-reply'
  | 'choose-next-line'
  | 'complete-reply'
  | 'choose-polite-version';

export interface ConversationTask {
  type: ConversationTaskType;
  promptVi: string;
  options: ConversationTaskOption[];
  correctOptionId: string;
  explanationVi?: string;
}

export interface ConversationScenario {
  id: string;
  languageCode: LanguageCode;
  level: CEFRLevel;
  title: string;
  titleVi: string;
  descriptionVi: string;
  contextVi: string;
  dialogue: DialogueLine[];
  /** Optional pointers into existing VocabularyItem ids from the lessons that inspired this scenario. */
  relatedVocabularyIds?: string[];
  task: ConversationTask;
}

export type PlacementSkill = 'vocabulary' | 'grammar' | 'reading' | 'listening';

export interface PlacementQuestion {
  id: string;
  skill: PlacementSkill;
  /** Reuses the same Exercise union as lessons/grammar — rendered via the existing ExerciseRenderer, unmodified. */
  exercise: Exercise;
}

export interface PlacementTest {
  id: string;
  languageCode: LanguageCode;
  titleVi: string;
  descriptionVi: string;
  questions: PlacementQuestion[];
}

/** Writing system a character belongs to — determines how Writing Practice labels/groups it, not rendering. */
export type WritingScript = 'hangul' | 'hanzi' | 'hiragana' | 'katakana' | 'kanji';

/**
 * A single traceable character/syllable-block introduced by a lesson. Deliberately
 * has no stroke-path data field: Phase 9 has no verified stroke-order dataset, and
 * fabricating one would violate "never claim fake stroke order" — the Writing
 * Practice UI only offers a faint whole-character guide + free write, never a
 * claimed stroke sequence.
 */
export interface WritingItem {
  id: string;
  languageCode: LanguageCode;
  /** The lesson this character was introduced in — Writing Practice entry point in the lesson screen filters by this. */
  lessonId: string;
  script: WritingScript;
  character: string;
  /** A word from the course that uses this character, for context. */
  exampleWord?: string;
  exampleWordTranslationVi?: string;
}

export interface ContentPack {
  course: Course;
  units: Unit[];
  lessons: Lesson[];
  grammarTopics?: GrammarTopic[];
  conversationScenarios?: ConversationScenario[];
  placementTest?: PlacementTest;
  /** Not populated for English — Latin script has no tracing need (see Part 7 of the Phase 9 spec). */
  writingItems?: WritingItem[];
}
