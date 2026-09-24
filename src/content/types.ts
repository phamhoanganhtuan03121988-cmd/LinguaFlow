import type { LanguageCode } from '@/src/data/languages';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/**
 * Every level/target id any track in src/content/tracks.ts can register content
 * under — 'general' (CEFR), TOEIC target scores, IELTS target bands, TOPIK/HSK
 * numeric levels, JLPT N-levels, plus the shared 'foundation' entry point. A
 * flat union rather than a per-track generic: which ids are actually valid for
 * a given track is enforced at the registry level (LearningTrack.levels in
 * tracks.ts, checked by the loader), not by the type system per-track — that
 * would need real generics for little benefit here. This just replaces the
 * unrestricted `string` Course/GrammarTopic/ConversationScenario.level had
 * through Phase 10's first pass with a closed, reusable set of legal values.
 */
export type TrackLevelId =
  | CEFRLevel
  | 'foundation'
  | '450' | '550' | '650' | '750' | '850' | '900'
  | '4.0' | '4.5' | '5.0' | '5.5' | '6.0' | '6.5' | '7.0' | '7.5' | '8.0' | '8.5' | '9.0'
  | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'N1' | 'N2' | 'N3' | 'N4' | 'N5';

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
  /**
   * Which learning track this course belongs to (Phase 10) — 'general', 'toeic',
   * 'ielts', 'topik', 'hsk', 'jlpt', etc. (see src/content/tracks.ts). Optional
   * and defaults to 'general' at registration time in loader.ts, so every
   * pre-Phase-10 Course (which never set this field) keeps working unchanged.
   */
  trackId?: string;
  /**
   * Level identifier WITHIN that track. Was CEFRLevel-only through Phase 9;
   * widened to TrackLevelId in Phase 10 because exam tracks use non-CEFR
   * level ids (TOEIC "550", IELTS "6.0", TOPIK "3", HSK "4", JLPT "N3") — see
   * Part 2 of the Phase 10 spec. CEFRLevel string values ('A1'..'C2') remain
   * valid here unchanged for the 'general' track.
   */
  level: TrackLevelId;
  titleVi: string;
  descriptionVi: string;
  unitIds: string[];
  /**
   * True only for the small proof-of-architecture exam-track sample courses
   * added in Phase 10 (Part 11) — never a complete exam curriculum. The UI
   * must label these honestly ("Mẫu — đang phát triển"), never imply full
   * exam coverage or guarantee a score.
   */
  isSample?: boolean;
}

export interface GrammarTopic {
  id: string;
  languageCode: LanguageCode;
  /** Defaults to 'general' at registration if unset — see Course.trackId. */
  trackId?: string;
  level: TrackLevelId;
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
  /** Defaults to 'general' at registration if unset — see Course.trackId. */
  trackId?: string;
  level: TrackLevelId;
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
  /**
   * Defaults to 'general' at registration if unset. Reserved for future
   * exam-specific diagnostics (TOEIC/IELTS/TOPIK/HSK/JLPT) — Phase 10 only
   * adds this field to the type, it does not build any exam diagnostic test
   * (see Part 15 of the Phase 10 spec: architecture/interface only).
   */
  trackId?: string;
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
