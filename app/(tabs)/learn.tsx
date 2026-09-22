import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyState, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage, getUnitsForCourse } from '@/src/content/loader';
import { getLanguageByCode } from '@/src/data/languages';
import { getNextLessonForCourse, getUnitProgress, getUnitStatus } from '@/src/features/learn/courseProgress';
import { UnitCard } from '@/src/features/learn/components/UnitCard';
import { useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

export default function LearnScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const { completedLessonIds } = useProgressStore((state) => selectLanguageProgress(state, activeLanguageCode));

  if (!activeLanguageCode) {
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

  const course = getCourseForLanguage(activeLanguageCode);

  if (!course) {
    const language = getLanguageByCode(activeLanguageCode);
    const languageLabel = language ? t(`onboarding.language.options.${language.code}.label`) : '';

    return (
      <EmptyState
        icon="construct-outline"
        title={t('learn.comingSoonTitle')}
        body={t('learn.comingSoonBody', { language: languageLabel })}
      />
    );
  }

  const units = getUnitsForCourse(course.id);
  const nextLesson = getNextLessonForCourse(course, completedLessonIds);

  return (
    <ScreenContainer maxWidth={520}>
      <Text style={styles.title}>{course.titleVi}</Text>
      <Text style={styles.description}>{course.descriptionVi}</Text>
      <View style={styles.list}>
        {units.map((unit) => {
          const { completedCount, totalCount } = getUnitProgress(unit, completedLessonIds);
          return (
            <UnitCard
              key={unit.id}
              unit={unit}
              completedCount={completedCount}
              totalCount={totalCount}
              status={getUnitStatus(unit, nextLesson, completedCount, totalCount)}
              onPress={() => router.push(`/unit/${unit.id}`)}
            />
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.display,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
});
