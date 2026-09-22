import type { CurrentLevelId } from '@/src/data/levels';
import type { LanguageCode } from '@/src/data/languages';
import type { PlacementSkill, PlacementTest } from '@/src/content/types';

export interface PlacementSkillScore {
  correct: number;
  total: number;
}

export interface PlacementResult {
  overallScore: number;
  totalCorrect: number;
  totalQuestions: number;
  skillScores: Record<PlacementSkill, PlacementSkillScore>;
  recommendedLevel: CurrentLevelId;
  recommendedLessonId: string;
  completedAt: number;
}

/**
 * First lesson of the unit each recommended level maps to, per language —
 * verified against each src/content/{lang}/units.ts. Every language pack
 * shares the same 3-unit A1 shape (greetings/introductions/family), so this
 * table only needs one row per language, not per level per language pack.
 */
const RECOMMENDED_LESSON_BY_LEVEL: Record<LanguageCode, Record<CurrentLevelId, string>> = {
  en: {
    beginner: 'l1-1-basic-greetings',
    elementary: 'l2-1-whats-your-name',
    intermediate: 'l3-1-family-members',
  },
  ko: {
    beginner: 'ko-l1-1-basic-greetings',
    elementary: 'ko-l2-1-whats-your-name',
    intermediate: 'ko-l3-1-family-members',
  },
  zh: {
    beginner: 'zh-l1-1-basic-greetings',
    elementary: 'zh-l2-1-whats-your-name',
    intermediate: 'zh-l3-1-family-members',
  },
  ja: {
    beginner: 'ja-l1-1-basic-greetings',
    elementary: 'ja-l2-1-whats-your-name',
    intermediate: 'ja-l3-1-family-members',
  },
};

/**
 * Intentionally conservative: 10 questions is a weak signal, not a full
 * assessment. Skipping ahead to Unit 2/3 requires a clearly strong score;
 * anything short of that defaults to Unit 1, per the product decision to
 * never over-claim confidence from a short test.
 */
const ELEMENTARY_THRESHOLD = 0.7;
const INTERMEDIATE_THRESHOLD = 0.9;

function resolveRecommendedLevel(overallScore: number): CurrentLevelId {
  if (overallScore >= INTERMEDIATE_THRESHOLD) return 'intermediate';
  if (overallScore >= ELEMENTARY_THRESHOLD) return 'elementary';
  return 'beginner';
}

/** Pure scoring function — takes the test definition and a map of questionId -> wasCorrect. */
export function scorePlacementTest(test: PlacementTest, answers: Record<string, boolean>): PlacementResult {
  const skillScores: Record<PlacementSkill, PlacementSkillScore> = {
    vocabulary: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
  };

  let totalCorrect = 0;

  for (const question of test.questions) {
    const isCorrect = Boolean(answers[question.id]);
    skillScores[question.skill].total += 1;
    if (isCorrect) {
      skillScores[question.skill].correct += 1;
      totalCorrect += 1;
    }
  }

  const totalQuestions = test.questions.length;
  const overallScore = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;
  const recommendedLevel = resolveRecommendedLevel(overallScore);

  return {
    overallScore,
    totalCorrect,
    totalQuestions,
    skillScores,
    recommendedLevel,
    recommendedLessonId: RECOMMENDED_LESSON_BY_LEVEL[test.languageCode][recommendedLevel],
    completedAt: Date.now(),
  };
}
