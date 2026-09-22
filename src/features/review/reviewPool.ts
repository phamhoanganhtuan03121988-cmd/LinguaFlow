import { getLessonsForUnit, getUnitsForCourse } from '@/src/content/loader';
import type { Course, Lesson, VocabularyItem } from '@/src/content/types';
import { shuffleArray } from '@/src/features/learn/shuffle';
import { isDue, type WordSrsState } from './srs';

export interface ReviewableWord {
  vocabulary: VocabularyItem;
  lesson: Lesson;
}

const MAX_DUE_PER_SESSION = 20;
const MAX_NEW_PER_SESSION = 10;

/** Vocabulary from lessons the learner has actually completed — never the whole course. */
export function getReviewableWordsForCourse(
  course: Course,
  completedLessonIds: Record<string, true>,
): ReviewableWord[] {
  const seenWordIds = new Set<string>();
  const words: ReviewableWord[] = [];

  for (const unit of getUnitsForCourse(course.id)) {
    for (const lesson of getLessonsForUnit(unit.id)) {
      if (!completedLessonIds[lesson.id]) continue;
      for (const vocabulary of lesson.vocabulary) {
        if (seenWordIds.has(vocabulary.id)) continue;
        seenWordIds.add(vocabulary.id);
        words.push({ vocabulary, lesson });
      }
    }
  }

  return words;
}

export function partitionWordsByStatus(
  words: ReviewableWord[],
  wordStates: Record<string, WordSrsState>,
  now: Date = new Date(),
) {
  const due: ReviewableWord[] = [];
  const newWords: ReviewableWord[] = [];

  for (const word of words) {
    const state = wordStates[word.vocabulary.id];
    if (!state) {
      newWords.push(word);
    } else if (isDue(state, now)) {
      due.push(word);
    }
  }

  return { due, newWords };
}

/** Due words take priority; new words fill the rest of the session up to a mobile-friendly cap. */
export function buildReviewSession(due: ReviewableWord[], newWords: ReviewableWord[]): ReviewableWord[] {
  const dueSlice = shuffleArray(due).slice(0, MAX_DUE_PER_SESSION);
  const newSlice = shuffleArray(newWords).slice(0, MAX_NEW_PER_SESSION);
  return [...dueSlice, ...newSlice];
}
