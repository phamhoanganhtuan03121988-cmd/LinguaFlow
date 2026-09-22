import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, LanguageMonogram, ProgressBar, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage, getPlacementTestForLanguage } from '@/src/content/loader';
import { getLanguageByCode } from '@/src/data/languages';
import { CURRENT_LEVELS } from '@/src/data/levels';
import { getNextLessonForCourse } from '@/src/features/learn/courseProgress';
import { useAppStore } from '@/src/store/useAppStore';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

const DAILY_GOAL_MINUTES = 10;
const DAILY_GOAL_PROGRESS_MINUTES = 0;

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const currentLevel = useAppStore((state) => state.currentLevel);
  const placementTestResult = useAppStore((state) => state.placementTestResult);
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);
  const currentStreakDays = useProgressStore((state) => state.currentStreakDays);

  const language = getLanguageByCode(selectedLanguage);
  const levelMeta = CURRENT_LEVELS.find((level) => level.id === currentLevel);

  const course = getCourseForLanguage(selectedLanguage);
  const nextLesson = course ? getNextLessonForCourse(course, completedLessonIds) : undefined;
  const hasStartedLearning = Object.keys(completedLessonIds).length > 0;
  const placementTest = getPlacementTestForLanguage(selectedLanguage);

  return (
    <ScreenContainer maxWidth={520}>
      <Animated.View entering={FadeInDown.duration(350)}>
        <Text style={styles.greeting}>{t('home.greeting')}</Text>
        <Text style={styles.subGreeting}>{t('home.subGreeting')}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(350)}>
        {language ? (
          <Card style={styles.section}>
            <View style={styles.journeyHeader}>
              <LanguageMonogram language={language} size={44} />
              <View style={styles.journeyTextColumn}>
                <Text style={styles.cardTitle}>
                  {t('home.journeyCardTitle', { language: t(`onboarding.language.options.${language.code}.label`) })}
                </Text>
                {levelMeta ? (
                  <Text style={styles.cardSubtitle}>
                    {t('home.journeyLevelLabel', { level: t(`onboarding.level.options.${levelMeta.id}.title`) })}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={styles.progressSpacing}>
              <ProgressBar progress={levelMeta?.progressHint ?? 0.05} color={language.accentColor} />
            </View>
          </Card>
        ) : (
          <Card style={styles.section}>
            <Text style={styles.cardTitle}>{t('home.journeyEmptyTitle')}</Text>
            <Text style={styles.cardSubtitle}>{t('home.journeyEmptyBody')}</Text>
            <View style={styles.progressSpacing}>
              <Button label={t('home.journeyEmptyCta')} onPress={() => router.push('/onboarding/language')} />
            </View>
          </Card>
        )}
      </Animated.View>

      {placementTest ? (
        <Animated.View entering={FadeInDown.delay(110).duration(350)}>
          <Card style={styles.section}>
            <View style={styles.placementHeader}>
              <View style={styles.placementIconBadge}>
                <Ionicons name="school-outline" size={20} color={colors.primary} />
              </View>
              <View style={styles.journeyTextColumn}>
                <Text style={styles.cardTitle}>{t('placement.homeCardTitle')}</Text>
                <Text style={styles.cardSubtitle}>
                  {placementTestResult
                    ? t('placement.homeCardResultSummary', {
                        level: t(`placement.levels.${placementTestResult.recommendedLevel}`),
                      })
                    : t('placement.homeCardBody')}
                </Text>
              </View>
            </View>
            <View style={styles.progressSpacing}>
              <Button
                label={placementTestResult ? t('placement.homeCardRetakeCta') : t('placement.homeCardCta')}
                variant="secondary"
                onPress={() => router.push('/placement-test')}
              />
            </View>
          </Card>
        </Animated.View>
      ) : null}

      <Animated.View entering={FadeInDown.delay(140).duration(350)} style={styles.row}>
        <Card style={[styles.section, styles.halfCard]}>
          <Text style={styles.cardEyebrow}>{t('home.dailyGoalTitle')}</Text>
          <Text style={styles.cardTitle}>
            {t('home.dailyGoalProgress', { current: DAILY_GOAL_PROGRESS_MINUTES, total: DAILY_GOAL_MINUTES })}
          </Text>
          <View style={styles.progressSpacing}>
            <ProgressBar progress={DAILY_GOAL_PROGRESS_MINUTES / DAILY_GOAL_MINUTES} color={colors.accentBlue} />
          </View>
        </Card>

        <Card style={[styles.section, styles.halfCard]}>
          <Text style={styles.cardEyebrow}>{t('home.streakCardTitle')}</Text>
          <View style={styles.streakRow}>
            <Ionicons name="flame" size={22} color={colors.accent} />
            <Text style={styles.cardTitle}>{t('home.streakCardValue', { count: currentStreakDays })}</Text>
          </View>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(350)}>
        <Card style={styles.section}>
          <Text style={styles.cardEyebrow}>
            {nextLesson
              ? hasStartedLearning
                ? t('home.continueCardNextEyebrow')
                : t('home.continueCardFirstEyebrow')
              : t('home.continueCardComingSoonEyebrow')}
          </Text>
          <Text style={styles.cardTitle}>{nextLesson ? nextLesson.titleVi : t('home.continueCardComingSoonTitle')}</Text>
          <View style={[styles.progressSpacing, styles.continueBadgeRow]}>
            <View style={styles.continueIconBadge}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
            </View>
          </View>
          <View style={styles.progressSpacing}>
            <Button
              label={nextLesson ? t('home.continueCardCta') : t('home.continueCardLearnTabCta')}
              onPress={() => {
                if (nextLesson) {
                  router.push(`/lesson/${nextLesson.id}`);
                } else {
                  router.push('/learn');
                }
              }}
            />
          </View>
        </Card>
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greeting: {
    ...typography.display,
    color: colors.textPrimary,
  },
  subGreeting: {
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
    gap: spacing.md,
  },
  halfCard: {
    flex: 1,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  journeyTextColumn: {
    flex: 1,
    gap: 2,
  },
  placementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  placementIconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEyebrow: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  progressSpacing: {
    marginTop: spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  continueBadgeRow: {
    flexDirection: 'row',
  },
  continueIconBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
