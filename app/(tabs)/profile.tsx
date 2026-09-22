import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, LanguageMonogram, ProgressBar, ScreenContainer } from '@/src/components/ui';
import type { CEFRLevel } from '@/src/content/types';
import { LANGUAGES, getLanguageByCode } from '@/src/data/languages';
import { LanguageCard } from '@/src/features/languageHub/components/LanguageCard';
import { getLanguageHubEntry } from '@/src/features/languageHub/languageSummary';
import { getNextLessonForCourse } from '@/src/features/learn/courseProgress';
import { getCourseForLanguage } from '@/src/content/loader';
import { getProgressSummary } from '@/src/features/progress/progressSummary';
import { resetAllData } from '@/src/store/resetAllData';
import { selectLanguageProfile, useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { selectLanguageReview, useReviewStore } from '@/src/store/useReviewStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const learningGoal = useAppStore((state) => state.learningGoal);
  const languageProfile = useAppStore((state) => selectLanguageProfile(state, activeLanguageCode));
  const appLanguages = useAppStore((state) => state.languages);
  const setActiveLanguage = useAppStore((state) => state.setActiveLanguage);
  const setActiveLevel = useAppStore((state) => state.setActiveLevel);

  const {
    completedLessonIds,
    practicedSpeakingIds,
    totalListeningSessionsCompleted,
    completedGrammarTopicIds,
    completedConversationScenarioIds,
  } = useProgressStore((state) => selectLanguageProgress(state, activeLanguageCode));
  const progressLanguages = useProgressStore((state) => state.languages);
  const currentStreakDays = useProgressStore((state) => state.currentStreakDays);
  const { wordStates, totalReviewSessionsCompleted } = useReviewStore((state) =>
    selectLanguageReview(state, activeLanguageCode),
  );
  const xp = useReviewStore((state) => state.xp);

  const language = getLanguageByCode(activeLanguageCode);

  const languageHubEntries = LANGUAGES.map((option) =>
    getLanguageHubEntry(
      option.code,
      appLanguages[option.code]?.currentLevel ?? null,
      appLanguages[option.code]?.activeLevel ?? 'A1',
      progressLanguages[option.code]?.completedLessonIds ?? {},
      progressLanguages[option.code]?.lastStudiedAt ?? null,
    ),
  );

  const goToNextLessonFor = (code: (typeof LANGUAGES)[number]['code'], level: CEFRLevel) => {
    const course = getCourseForLanguage(code, level);
    const completedForCode = progressLanguages[code]?.completedLessonIds ?? {};
    const nextLesson = course ? getNextLessonForCourse(course, completedForCode) : undefined;
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.id}`);
    } else {
      router.push('/home');
    }
  };

  const handleLanguageCardPress = (code: (typeof LANGUAGES)[number]['code']) => {
    setActiveLanguage(code);
    goToNextLessonFor(code, appLanguages[code]?.activeLevel ?? 'A1');
  };

  const handleSelectLevel = (code: (typeof LANGUAGES)[number]['code'], level: CEFRLevel) => {
    setActiveLanguage(code);
    setActiveLevel(level, code);
    goToNextLessonFor(code, level);
  };

  const summary = getProgressSummary(
    activeLanguageCode,
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
    resetAllData();
    setConfirmingReset(false);
    router.replace('/onboarding/welcome');
  };

  return (
    <ScreenContainer maxWidth={480}>
      <Text style={styles.title}>{t('profile.title')}</Text>
      <Text style={styles.subtitle}>{t('profile.subtitle')}</Text>

      <Text style={styles.hubTitle}>{t('languageHub.sectionTitle')}</Text>
      <View style={styles.hubList}>
        {languageHubEntries.map((entry) => (
          <LanguageCard
            key={entry.code}
            entry={entry}
            isActive={entry.code === activeLanguageCode}
            onPress={() => handleLanguageCardPress(entry.code)}
            onSelectLevel={(level) => handleSelectLevel(entry.code, level)}
          />
        ))}
      </View>

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
              {languageProfile.currentLevel
                ? t(`onboarding.level.options.${languageProfile.currentLevel}.title`)
                : t('profile.notSetValue')}
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
              {languageProfile.placementTestResult
                ? t(`placement.levels.${languageProfile.placementTestResult.recommendedLevel}`)
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
  hubTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  hubList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
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
