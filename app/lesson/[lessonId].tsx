import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getCourseForLesson, getLessonById, getWritingItemsForLesson } from '@/src/content/loader';
import { ExampleSentenceCard } from '@/src/features/learn/components/ExampleSentenceCard';
import { ExerciseRenderer } from '@/src/features/learn/components/ExerciseRenderer';
import { VocabularyCard } from '@/src/features/learn/components/VocabularyCard';
import { ShadowingItemCard } from '@/src/features/shadowing/components/ShadowingItemCard';
import { PlaceholderScreen } from '@/src/features/tabs/PlaceholderScreen';
import { WritingItemCard } from '@/src/features/writing/components/WritingItemCard';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [answeredMap, setAnsweredMap] = useState<Record<string, boolean>>({});

  // Resolved from the content itself, not the active language — a lesson's
  // progress always belongs to its own course's language, even if the app's
  // active language were somehow different when this screen is opened.
  const lesson = getLessonById(lessonId);
  const languageCode = lesson ? getCourseForLesson(lesson)?.languageCode : undefined;

  const isComplete = useProgressStore((state) => state.isLessonComplete(lessonId, languageCode));
  const markLessonComplete = useProgressStore((state) => state.markLessonComplete);
  const isWritingItemComplete = useProgressStore((state) => state.isWritingItemComplete);
  const writingItems = getWritingItemsForLesson(lessonId);

  if (!lesson) {
    return (
      <PlaceholderScreen icon="alert-circle-outline" titleKey="lesson.notFoundTitle" bodyKey="lesson.notFoundBody" />
    );
  }

  const resolvedLanguageCode = languageCode ?? 'en';
  const totalExercises = lesson.exercises.length;
  const answeredCount = Object.keys(answeredMap).length;
  const allAnswered = totalExercises === 0 || answeredCount >= totalExercises;

  const handleAnswered = (exerciseId: string, correct: boolean) => {
    setAnsweredMap((previous) => ({ ...previous, [exerciseId]: correct }));
  };

  return (
    <ScreenContainer maxWidth={560}>
      <ProgressTopBar currentStep={answeredCount} totalSteps={totalExercises} onBack={() => router.back()} />

      <Text style={styles.title}>{lesson.titleVi}</Text>
      <Text style={styles.objective}>{lesson.objectiveVi}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('lesson.vocabularyHeading')}</Text>
        <View style={styles.stack}>
          {lesson.vocabulary.map((item) => (
            <VocabularyCard key={item.id} item={item} languageCode={resolvedLanguageCode} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('lesson.sentencesHeading')}</Text>
        <View style={styles.stack}>
          {lesson.sentences.map((sentence) => (
            <ExampleSentenceCard key={sentence.id} sentence={sentence} languageCode={resolvedLanguageCode} />
          ))}
        </View>
      </View>

      {lesson.grammarNoteVi ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('lesson.grammarHeading')}</Text>
          <Card style={styles.grammarCard}>
            <Ionicons name="bulb-outline" size={20} color={colors.accentYellow} />
            <Text style={styles.grammarText}>{lesson.grammarNoteVi}</Text>
          </Card>
        </View>
      ) : null}

      {totalExercises > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('lesson.exercisesHeading')}</Text>
          <View style={styles.stack}>
            {lesson.exercises.map((exercise) => (
              <ExerciseRenderer
                key={exercise.id}
                exercise={exercise}
                onAnswered={(correct) => handleAnswered(exercise.id, correct)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('lesson.shadowingHeading')}</Text>
        <Text style={styles.shadowingSubtitle}>{t('lesson.shadowingSubtitle')}</Text>
        <View style={styles.stack}>
          {lesson.vocabulary.map((item) => (
            <ShadowingItemCard
              key={item.id}
              id={item.id}
              term={item.term}
              translationVi={item.translationVi}
              languageCode={resolvedLanguageCode}
              audioUrl={item.audioUrl}
            />
          ))}
        </View>
      </View>

      {writingItems.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('writing.lessonSectionHeading')}</Text>
          <View style={styles.stack}>
            {writingItems.map((item) => (
              <WritingItemCard
                key={item.id}
                item={item}
                isComplete={isWritingItemComplete(item.id, languageCode)}
                onPress={() => router.push(`/writing-session?lessonId=${lesson.id}`)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.footer}>
        {isComplete ? (
          <>
            <View style={styles.completedBanner}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.completedText}>{t('lesson.completedBadge')}</Text>
            </View>
            <Button label={t('lesson.backToUnitCta')} variant="secondary" onPress={() => router.back()} />
          </>
        ) : (
          <Button
            label={t('lesson.completeCta')}
            onPress={() => markLessonComplete(lesson.id, languageCode)}
            disabled={!allAnswered}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  objective: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  shadowingSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
  },
  stack: {
    gap: spacing.sm,
  },
  grammarCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  grammarText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    flex: 1,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    justifyContent: 'center',
  },
  completedText: {
    ...typography.bodyMedium,
    color: colors.success,
  },
});
