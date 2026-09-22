import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage } from '@/src/content/loader';
import { getLanguageByCode } from '@/src/data/languages';
import { getReviewableWordsForCourse, partitionWordsByStatus } from '@/src/features/review/reviewPool';
import { getReviewStats } from '@/src/features/review/reviewStats';
import { useAppStore } from '@/src/store/useAppStore';
import { useProgressStore } from '@/src/store/useProgressStore';
import { useReviewStore } from '@/src/store/useReviewStore';
import { colors, spacing, typography } from '@/src/theme';

export default function ReviewScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);
  const wordStates = useReviewStore((state) => state.wordStates);
  const totalReviewSessionsCompleted = useReviewStore((state) => state.totalReviewSessionsCompleted);

  if (!selectedLanguage) {
    return (
      <EmptyState
        icon="flag-outline"
        title={t('learn.chooseLanguageTitle')}
        body={t('learn.chooseLanguageBody')}
        ctaLabel={t('learn.chooseLanguageCta')}
        onCtaPress={() => router.push('/onboarding/language')}
      />
    );
  }

  const course = getCourseForLanguage(selectedLanguage);

  if (!course) {
    const language = getLanguageByCode(selectedLanguage);
    const languageLabel = language ? t(`onboarding.language.options.${language.code}.label`) : '';

    return (
      <EmptyState
        icon="construct-outline"
        title={t('learn.comingSoonTitle')}
        body={t('learn.comingSoonBody', { language: languageLabel })}
      />
    );
  }

  const reviewableWords = getReviewableWordsForCourse(course, completedLessonIds);

  if (reviewableWords.length === 0) {
    return (
      <EmptyState
        icon="book-outline"
        title={t('review.noLessonsTitle')}
        body={t('review.noLessonsBody')}
        ctaLabel={t('review.noLessonsCta')}
        onCtaPress={() => router.push('/learn')}
      />
    );
  }

  const { due, newWords } = partitionWordsByStatus(reviewableWords, wordStates);
  const stats = getReviewStats(wordStates);

  if (due.length === 0 && newWords.length === 0) {
    return (
      <EmptyState icon="happy-outline" title={t('review.allCaughtUpTitle')} body={t('review.allCaughtUpBody')} />
    );
  }

  return (
    <ScreenContainer maxWidth={480}>
      <Text style={styles.title}>{t('review.title')}</Text>
      <Text style={styles.subtitle}>{t('review.subtitle')}</Text>

      <View style={styles.row}>
        <Card style={[styles.statCard, styles.halfCard]}>
          <Text style={styles.statValue}>{due.length}</Text>
          <Text style={styles.statLabel}>{t('review.dueLabel')}</Text>
        </Card>
        <Card style={[styles.statCard, styles.halfCard]}>
          <Text style={styles.statValue}>{newWords.length}</Text>
          <Text style={styles.statLabel}>{t('review.newLabel')}</Text>
        </Card>
      </View>

      <View style={styles.startButton}>
        <Button label={t('review.startCta')} onPress={() => router.push('/review-session')} />
      </View>

      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>{t('review.statsTitle')}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('review.learnedLabel')}</Text>
          <Text style={styles.statsValue}>{stats.totalWordsLearned}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('review.masteredLabel')}</Text>
          <Text style={styles.statsValue}>{stats.masteredWords}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('review.totalReviewsLabel')}</Text>
          <Text style={styles.statsValue}>{stats.totalReviews}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('review.sessionsCompletedLabel')}</Text>
          <Text style={styles.statsValue}>{totalReviewSessionsCompleted}</Text>
        </View>
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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  halfCard: {
    flex: 1,
    alignItems: 'center',
  },
  statCard: {
    gap: 2,
  },
  statValue: {
    ...typography.display,
    color: colors.primary,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  startButton: {
    marginBottom: spacing.lg,
  },
  statsCard: {
    gap: spacing.sm,
  },
  statsTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
});
