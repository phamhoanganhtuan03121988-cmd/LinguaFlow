import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getLessonsForUnit, getUnitById } from '@/src/content/loader';
import { LessonListItem } from '@/src/features/learn/components/LessonListItem';
import { PlaceholderScreen } from '@/src/features/tabs/PlaceholderScreen';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const completedLessonIds = useProgressStore((state) => state.completedLessonIds);

  const unit = getUnitById(unitId);

  if (!unit) {
    return (
      <PlaceholderScreen icon="alert-circle-outline" titleKey="unit.notFoundTitle" bodyKey="unit.notFoundBody" />
    );
  }

  const lessons = getLessonsForUnit(unit.id);

  return (
    <ScreenContainer maxWidth={520}>
      <ProgressTopBar onBack={() => router.back()} />
      <Text style={styles.title}>{unit.titleVi}</Text>
      <Text style={styles.description}>{unit.descriptionVi}</Text>
      <View style={styles.list}>
        {lessons.map((lesson, index) => (
          <LessonListItem
            key={lesson.id}
            lesson={lesson}
            index={index}
            completed={Boolean(completedLessonIds[lesson.id])}
            onPress={() => router.push(`/lesson/${lesson.id}`)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
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
