import type { CurrentLevelId } from '@/src/data/levels';
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

/** First lesson of the unit each recommended level maps to — verified against src/content/en/units.ts. */
const RECOMMENDED_LESSON_BY_LEVEL: Record<CurrentLevelId, string> = {
  beginner: 'l1-1-basic-greetings',
  elementary: 'l2-1-whats-your-name',
  intermediate: 'l3-1-family-members',
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
    recommendedLessonId: RECOMMENDED_LESSON_BY_LEVEL[recommendedLevel],
    completedAt: Date.now(),
  };
}
