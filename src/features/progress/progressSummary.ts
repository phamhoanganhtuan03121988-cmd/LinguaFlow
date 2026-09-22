import type { LanguageCode } from '@/src/data/languages';
import { getConversationScenariosForLanguage, getCourseForLanguage, getGrammarTopicsForLanguage } from '@/src/content/loader';
import { getCourseProgress } from '@/src/features/learn/courseProgress';
import { getReviewableWordsForCourse } from '@/src/features/review/reviewPool';
import { getReviewStats, type ReviewStats } from '@/src/features/review/reviewStats';
import type { WordSrsState } from '@/src/features/review/srs';

export interface ProgressSummary {
  lessons: { completed: number; total: number };
  vocabularyLearned: number;
  reviewStats: ReviewStats;
  speakingPracticedCount: number;
  listeningSessionsCompleted: number;
  grammar: { completed: number; total: number };
  conversation: { completed: number; total: number };
  xp: number;
  reviewSessionsCompleted: number;
  currentStreakDays: number;
}

interface ProgressStoreSlice {
  completedLessonIds: Record<string, true>;
  practicedSpeakingIds: Record<string, true>;
  totalListeningSessionsCompleted: number;
  completedGrammarTopicIds: Record<string, true>;
  completedConversationScenarioIds: Record<string, true>;
  currentStreakDays: number;
}

interface ReviewStoreSlice {
  wordStates: Record<string, WordSrsState>;
  xp: number;
  totalReviewSessionsCompleted: number;
}

/** Pure aggregation — reads only, derives everything from data the app already persists. Nothing here writes state. */
export function getProgressSummary(
  languageCode: LanguageCode | null,
  progress: ProgressStoreSlice,
  review: ReviewStoreSlice,
): ProgressSummary | undefined {
  const course = getCourseForLanguage(languageCode);
  if (!course) return undefined;

  const lessons = getCourseProgress(course, progress.completedLessonIds);
  const vocabularyLearned = getReviewableWordsForCourse(course, progress.completedLessonIds).length;
  const grammarTopics = getGrammarTopicsForLanguage(languageCode);
  const conversationScenarios = getConversationScenariosForLanguage(languageCode);

  return {
    lessons: { completed: lessons.completedCount, total: lessons.totalCount },
    vocabularyLearned,
    reviewStats: getReviewStats(review.wordStates),
    speakingPracticedCount: Object.keys(progress.practicedSpeakingIds).length,
    listeningSessionsCompleted: progress.totalListeningSessionsCompleted,
    grammar: {
      completed: grammarTopics.filter((topic) => progress.completedGrammarTopicIds[topic.id]).length,
      total: grammarTopics.length,
    },
    conversation: {
      completed: conversationScenarios.filter((scenario) => progress.completedConversationScenarioIds[scenario.id])
        .length,
      total: conversationScenarios.length,
    },
    xp: review.xp,
    reviewSessionsCompleted: review.totalReviewSessionsCompleted,
    currentStreakDays: progress.currentStreakDays,
  };
}
