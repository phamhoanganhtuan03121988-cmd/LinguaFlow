import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui';
import { getLessonById } from '@/src/content/loader';
import type { PlacementSkill } from '@/src/content/types';
import type { LanguageCode } from '@/src/data/languages';
import type { PlacementResult } from '@/src/features/placement/scoring';
import { colors, radius, spacing, typography } from '@/src/theme';

const SKILLS: PlacementSkill[] = ['vocabulary', 'grammar', 'reading', 'listening'];

interface PlacementResultCardProps {
  result: PlacementResult;
  /** The language this result was taken in — resolves recommendedLessonId unambiguously via the composite-key lookup, same principle as every other content-anchored screen. */
  languageCode: LanguageCode;
}

export function PlacementResultCard({ result, languageCode }: PlacementResultCardProps) {
  const { t } = useTranslation();
  const lesson = getLessonById(result.recommendedLessonId, languageCode);

  return (
    <Card style={styles.card}>
      <Text style={styles.disclaimer}>{t('placement.resultDisclaimer')}</Text>

      <Text style={styles.overallScore}>
        {t('placement.overallScoreLabel', { correct: result.totalCorrect, total: result.totalQuestions })}
      </Text>

      <View style={styles.skillsSection}>
        <Text style={styles.sectionHeading}>{t('placement.skillScoresHeading')}</Text>
        {SKILLS.map((skill) => (
          <View key={skill} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{t(`placement.skills.${skill}`)}</Text>
            <Text style={styles.skillValue}>
              {result.skillScores[skill].correct}/{result.skillScores[skill].total}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.recommendationBlock}>
        <Text style={styles.recommendationLevel}>{t(`placement.levels.${result.recommendedLevel}`)}</Text>
        {lesson ? (
          <Text style={styles.recommendationLesson}>
            {t('placement.recommendedLessonLabel', { lesson: lesson.titleVi })}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  overallScore: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  skillsSection: {
    gap: spacing.xs,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  skillValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  recommendationBlock: {
    backgroundColor: colors.primaryLight + '26',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  recommendationLevel: {
    ...typography.h3,
    color: colors.primaryDark,
  },
  recommendationLesson: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
});
