import { getLessonsForUnit, getUnitsForCourse } from '@/src/content/loader';
import type { Course, ExampleSentence } from '@/src/content/types';
import { shuffleArray } from '@/src/features/learn/shuffle';
import { getReviewableWordsForCourse } from '@/src/features/review/reviewPool';
import type { ListeningItem } from './types';

/** Need at least this many distinct terms/sentences to build meaningful 4-option distractors. */
const MIN_POOL_SIZE = 4;
const MAX_SESSION_SIZE = 15;
const OPTION_COUNT = 4;

function getReviewableSentencesForCourse(course: Course, completedLessonIds: Record<string, true>): ExampleSentence[] {
  const seenIds = new Set<string>();
  const sentences: ExampleSentence[] = [];

  for (const unit of getUnitsForCourse(course.id)) {
    for (const lesson of getLessonsForUnit(unit.id)) {
      if (!completedLessonIds[lesson.id]) continue;
      for (const sentence of lesson.sentences) {
        if (seenIds.has(sentence.id)) continue;
        seenIds.add(sentence.id);
        sentences.push(sentence);
      }
    }
  }

  return sentences;
}

function pickDistractors(pool: string[], correctAnswer: string, count: number): string[] {
  const candidates = pool.filter((value) => value !== correctAnswer);
  return shuffleArray(candidates).slice(0, count);
}

function buildOptions(correctAnswer: string, pool: string[]): string[] {
  return shuffleArray([correctAnswer, ...pickDistractors(pool, correctAnswer, OPTION_COUNT - 1)]);
}

/** Builds a shuffled, capped set of listening items from vocabulary/sentences of completed lessons only. */
export function buildListeningItems(course: Course, completedLessonIds: Record<string, true>): ListeningItem[] {
  const words = getReviewableWordsForCourse(course, completedLessonIds);
  const sentences = getReviewableSentencesForCourse(course, completedLessonIds);
  const items: ListeningItem[] = [];

  if (words.length >= MIN_POOL_SIZE) {
    const terms = words.map((word) => word.vocabulary.term);
    const meanings = words.map((word) => word.vocabulary.translationVi);

    for (const word of words) {
      items.push({
        id: `listen-word-${word.vocabulary.id}`,
        type: 'choose-word',
        audioText: word.vocabulary.term,
        languageCode: course.languageCode,
        options: buildOptions(word.vocabulary.term, terms),
        correctAnswer: word.vocabulary.term,
      });

      items.push({
        id: `listen-meaning-${word.vocabulary.id}`,
        type: 'choose-meaning',
        audioText: word.vocabulary.term,
        languageCode: course.languageCode,
        options: buildOptions(word.vocabulary.translationVi, meanings),
        correctAnswer: word.vocabulary.translationVi,
      });
    }
  }

  if (sentences.length >= MIN_POOL_SIZE) {
    const translations = sentences.map((sentence) => sentence.translationVi);

    for (const sentence of sentences) {
      items.push({
        id: `listen-sentence-${sentence.id}`,
        type: 'choose-sentence-meaning',
        audioText: sentence.text,
        languageCode: course.languageCode,
        options: buildOptions(sentence.translationVi, translations),
        correctAnswer: sentence.translationVi,
      });
    }
  }

  return shuffleArray(items).slice(0, MAX_SESSION_SIZE);
}
