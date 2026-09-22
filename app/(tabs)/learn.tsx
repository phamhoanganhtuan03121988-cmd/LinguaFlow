import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { EmptyState, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage, getCourseLevelsForLanguage, getUnitsForCourse } from '@/src/content/loader';
import type { CEFRLevel } from '@/src/content/types';
import { getLanguageByCode } from '@/src/data/languages';
import { getNextLessonForCourse, getUnitProgress, getUnitStatus } from '@/src/features/learn/courseProgress';
import { UnitCard } from '@/src/features/learn/components/UnitCard';
import { selectLanguageProfile, useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export default function LearnScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const { activeLevel } = useAppStore((state) => selectLanguageProfile(state, activeLanguageCode));
  const setActiveLevel = useAppStore((state) => state.setActiveLevel);
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

  const availableLevels = getCourseLevelsForLanguage(activeLanguageCode);
  const course = getCourseForLanguage(activeLanguageCode, activeLevel);

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

      {availableLevels.length > 1 ? (
        <View style={styles.levelRow}>
          <Text style={styles.levelLabel}>{t('level.sectionTitle')}</Text>
          <View style={styles.levelPillRow}>
            {availableLevels.map((level) => (
              <Pressable
                key={level}
                onPress={() => setActiveLevel(level, activeLanguageCode)}
                style={[styles.levelPill, level === activeLevel && styles.levelPillActive]}
              >
                <Text style={[styles.levelPillText, level === activeLevel && styles.levelPillTextActive]}>
                  {level}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

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
  levelRow: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  levelLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  levelPillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  levelPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelPillText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  levelPillTextActive: {
    color: colors.textInverse,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
});
