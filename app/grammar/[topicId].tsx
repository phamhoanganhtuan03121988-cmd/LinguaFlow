import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getGrammarTopicById } from '@/src/content/loader';
import { ExampleSentenceCard } from '@/src/features/learn/components/ExampleSentenceCard';
import { ExerciseRenderer } from '@/src/features/learn/components/ExerciseRenderer';
import { PlaceholderScreen } from '@/src/features/tabs/PlaceholderScreen';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

export default function GrammarTopicScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [answeredMap, setAnsweredMap] = useState<Record<string, boolean>>({});

  // Resolved from the content itself, not the active language.
  const topic = getGrammarTopicById(topicId);

  const isComplete = useProgressStore((state) => state.isGrammarTopicComplete(topicId, topic?.languageCode));
  const markGrammarTopicComplete = useProgressStore((state) => state.markGrammarTopicComplete);

  if (!topic) {
    return (
      <PlaceholderScreen icon="alert-circle-outline" titleKey="grammar.notFoundTitle" bodyKey="grammar.notFoundBody" />
    );
  }

  const totalExercises = topic.exercises.length;
  const answeredCount = Object.keys(answeredMap).length;
  const allAnswered = totalExercises === 0 || answeredCount >= totalExercises;

  const handleAnswered = (exerciseId: string, correct: boolean) => {
    setAnsweredMap((previous) => ({ ...previous, [exerciseId]: correct }));
  };

  return (
    <ScreenContainer maxWidth={560}>
      <ProgressTopBar currentStep={answeredCount} totalSteps={totalExercises} onBack={() => router.back()} />

      <Text style={styles.title}>{topic.titleVi}</Text>
      <Text style={styles.subtitle}>{topic.title}</Text>

      <Card style={styles.section}>
        <Text style={styles.sectionHeading}>{t('grammar.explanationHeading')}</Text>
        <Text style={styles.bodyText}>{topic.explanationVi}</Text>

        <Text style={[styles.sectionHeading, styles.structureHeading]}>{t('grammar.structureHeading')}</Text>
        <View style={styles.structureBox}>
          <Text style={styles.structureText}>{topic.structure}</Text>
        </View>

        {topic.keyPoints && topic.keyPoints.length > 0 ? (
          <View style={styles.keyPoints}>
            {topic.keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPointRow}>
                <View style={styles.keyPointDot} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('grammar.examplesHeading')}</Text>
        <View style={styles.stack}>
          {topic.examples.map((example) => (
            <ExampleSentenceCard key={example.id} sentence={example} languageCode={topic.languageCode} />
          ))}
        </View>
      </View>

      {topic.commonMistakesVi ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('grammar.commonMistakesHeading')}</Text>
          <Card style={styles.mistakeCard}>
            <Ionicons name="warning-outline" size={20} color={colors.warning} />
            <Text style={styles.mistakeText}>{topic.commonMistakesVi}</Text>
          </Card>
        </View>
      ) : null}

      {totalExercises > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('grammar.exercisesHeading')}</Text>
          <View style={styles.stack}>
            {topic.exercises.map((exercise) => (
              <ExerciseRenderer
                key={exercise.id}
                exercise={exercise}
                onAnswered={(correct) => handleAnswered(exercise.id, correct)}
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
              <Text style={styles.completedText}>{t('grammar.completedBadge')}</Text>
            </View>
            <Button label={t('grammar.backCta')} variant="secondary" onPress={() => router.back()} />
          </>
        ) : (
          <Button
            label={t('grammar.completeCta')}
            onPress={() => markGrammarTopicComplete(topic.id, topic.languageCode)}
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
  subtitle: {
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
  bodyText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  structureHeading: {
    marginTop: spacing.md,
  },
  structureBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 12,
    padding: spacing.md,
  },
  structureText: {
    ...typography.bodyMedium,
    color: colors.primaryDark,
  },
  keyPoints: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  keyPointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  keyPointText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    flex: 1,
  },
  stack: {
    gap: spacing.sm,
  },
  mistakeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  mistakeText: {
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
