import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getCourseById, getLessonsForUnit, getUnitById } from '@/src/content/loader';
import { LessonListItem } from '@/src/features/learn/components/LessonListItem';
import { getLessonStatus, getNextLessonForCourse } from '@/src/features/learn/courseProgress';
import { PlaceholderScreen } from '@/src/features/tabs/PlaceholderScreen';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const router = useRouter();
  const { t } = useTranslation();

  // Resolved from the content itself (unit -> course -> languageCode), not the
  // active language — same reasoning as lesson/grammar/conversation screens.
  const unit = getUnitById(unitId);
  const course = unit ? getCourseById(unit.courseId) : undefined;
  const { completedLessonIds } = useProgressStore((state) => selectLanguageProgress(state, course?.languageCode ?? null));

  if (!unit || !course) {
    return (
      <PlaceholderScreen icon="alert-circle-outline" titleKey="unit.notFoundTitle" bodyKey="unit.notFoundBody" />
    );
  }

  const lessons = getLessonsForUnit(unit.id, course.languageCode);
  const nextLesson = getNextLessonForCourse(course, completedLessonIds);

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
            status={getLessonStatus(lesson, nextLesson, completedLessonIds)}
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
