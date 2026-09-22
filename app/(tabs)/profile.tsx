import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, LanguageMonogram, ProgressBar, ScreenContainer } from '@/src/components/ui';
import { getLanguageByCode } from '@/src/data/languages';
import { getProgressSummary } from '@/src/features/progress/progressSummary';
import { useAppStore } from '@/src/store/useAppStore';
import { useProgressStore } from '@/src/store/useProgressStore';
import { useReviewStore } from '@/src/store/useReviewStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const learningGoal = useAppStore((state) => state.learningGoal);
  const currentLevel = useAppStore((state) => state.currentLevel);
  const resetOnboarding = useAppStore((state) => state.resetOnboarding);

  const placementTestResult = useAppStore((state) => state.placementTestResult);
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);
  const practicedSpeakingIds = useProgressStore((state) => state.practicedSpeakingIds);
  const totalListeningSessionsCompleted = useProgressStore((state) => state.totalListeningSessionsCompleted);
  const completedGrammarTopicIds = useProgressStore((state) => state.completedGrammarTopicIds);
  const completedConversationScenarioIds = useProgressStore((state) => state.completedConversationScenarioIds);
  const currentStreakDays = useProgressStore((state) => state.currentStreakDays);
  const wordStates = useReviewStore((state) => state.wordStates);
  const xp = useReviewStore((state) => state.xp);
  const totalReviewSessionsCompleted = useReviewStore((state) => state.totalReviewSessionsCompleted);

  const language = getLanguageByCode(selectedLanguage);

  const summary = getProgressSummary(
    selectedLanguage,
    {
      completedLessonIds,
      practicedSpeakingIds,
      totalListeningSessionsCompleted,
      completedGrammarTopicIds,
      completedConversationScenarioIds,
      currentStreakDays,
    },
    { wordStates, xp, totalReviewSessionsCompleted },
  );

  const handleConfirmReset = () => {
    resetOnboarding();
    setConfirmingReset(false);
    router.replace('/onboarding/welcome');
  };

  return (
    <ScreenContainer maxWidth={480}>
      <Text style={styles.title}>{t('profile.title')}</Text>
      <Text style={styles.subtitle}>{t('profile.subtitle')}</Text>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t('progress.sectionTitle')}</Text>

        {summary ? (
          <>
            <View style={styles.progressBarSpacing}>
              <ProgressBar
                progress={summary.lessons.total > 0 ? summary.lessons.completed / summary.lessons.total : 0}
              />
            </View>
            <Text style={styles.lessonsLabel}>
              {t('progress.lessonsLabel', { completed: summary.lessons.completed, total: summary.lessons.total })}
            </Text>

            <View style={styles.statsList}>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.vocabularyLearnedLabel')}</Text>
                <Text style={styles.statsValue}>{summary.vocabularyLearned}</Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.vocabularyReviewedLabel')}</Text>
                <Text style={styles.statsValue}>{summary.reviewStats.totalWordsLearned}</Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.speakingPracticedLabel')}</Text>
                <Text style={styles.statsValue}>{summary.speakingPracticedCount}</Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.listeningSessionsLabel')}</Text>
                <Text style={styles.statsValue}>{summary.listeningSessionsCompleted}</Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.grammarLabel')}</Text>
                <Text style={styles.statsValue}>
                  {summary.grammar.completed}/{summary.grammar.total}
                </Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.conversationLabel')}</Text>
                <Text style={styles.statsValue}>
                  {summary.conversation.completed}/{summary.conversation.total}
                </Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.reviewSessionsLabel')}</Text>
                <Text style={styles.statsValue}>{summary.reviewSessionsCompleted}</Text>
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statsLabel}>{t('progress.xpLabel')}</Text>
                <Text style={styles.statsValue}>{summary.xp}</Text>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.streakLabelRow}>
                  <Ionicons name="flame" size={14} color={colors.accent} />
                  <Text style={styles.statsLabel}>{t('progress.streakLabel')}</Text>
                </View>
                <Text style={styles.statsValue}>{t('progress.streakValue', { count: summary.currentStreakDays })}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.noLanguageBody}>{t('progress.noLanguageBody')}</Text>
        )}
      </Card>

      <Card style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowLeading}>
            {language ? (
              <LanguageMonogram language={language} size={36} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="language-outline" size={18} color={colors.textSecondary} />
              </View>
            )}
          </View>
          <View style={styles.rowTextColumn}>
            <Text style={styles.rowLabel}>{t('profile.learningLanguageLabel')}</Text>
            <Text style={styles.rowValue}>
              {language ? t(`onboarding.language.options.${language.code}.label`) : t('profile.notSetValue')}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeading}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="flag-outline" size={18} color={colors.textSecondary} />
            </View>
          </View>
          <View style={styles.rowTextColumn}>
            <Text style={styles.rowLabel}>{t('profile.goalLabel')}</Text>
            <Text style={styles.rowValue}>
              {learningGoal ? t(`onboarding.goal.options.${learningGoal}.title`) : t('profile.notSetValue')}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeading}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="trending-up-outline" size={18} color={colors.textSecondary} />
            </View>
          </View>
          <View style={styles.rowTextColumn}>
            <Text style={styles.rowLabel}>{t('profile.levelLabel')}</Text>
            <Text style={styles.rowValue}>
              {currentLevel ? t(`onboarding.level.options.${currentLevel}.title`) : t('profile.notSetValue')}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Pressable style={styles.row} onPress={() => router.push('/placement-test')}>
          <View style={styles.rowLeading}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="school-outline" size={18} color={colors.textSecondary} />
            </View>
          </View>
          <View style={styles.rowTextColumn}>
            <Text style={styles.rowLabel}>{t('placement.profileResultLabel')}</Text>
            <Text style={styles.rowValue}>
              {placementTestResult
                ? t(`placement.levels.${placementTestResult.recommendedLevel}`)
                : t('placement.profileNoResult')}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.resetSectionTitle')}</Text>
        <Text style={styles.resetBody}>{t('profile.resetOnboardingBody')}</Text>

        {confirmingReset ? (
          <View style={styles.confirmBlock}>
            <Text style={styles.confirmText}>{t('profile.resetOnboardingConfirmBody')}</Text>
            <View style={styles.confirmActions}>
              <View style={styles.confirmButton}>
                <Button
                  label={t('profile.resetOnboardingConfirmCancel')}
                  variant="secondary"
                  onPress={() => setConfirmingReset(false)}
                />
              </View>
              <View style={styles.confirmButton}>
                <Button label={t('profile.resetOnboardingConfirmOk')} onPress={handleConfirmReset} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.progressSpacing}>
            <Button
              label={t('profile.resetOnboardingCta')}
              variant="secondary"
              onPress={() => setConfirmingReset(true)}
            />
          </View>
        )}
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.display,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowLeading: {
    width: 36,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextColumn: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rowValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  resetBody: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  progressSpacing: {
    marginTop: spacing.md,
  },
  confirmBlock: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentLight + '55',
  },
  confirmText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  confirmButton: {
    flex: 1,
  },
  progressBarSpacing: {
    marginTop: spacing.sm,
  },
  lessonsLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsList: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  streakLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  noLanguageBody: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
