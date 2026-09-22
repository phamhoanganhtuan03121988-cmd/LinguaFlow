import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/src/components/ui';
import { shuffleArray } from '@/src/features/learn/shuffle';
import type { MultipleChoiceExercise as MultipleChoiceExerciseData } from '@/src/content/types';
import { colors, radius, spacing, typography } from '@/src/theme';

interface Props {
  exercise: MultipleChoiceExerciseData;
  onAnswered: (correct: boolean) => void;
}

export function MultipleChoiceExercise({ exercise, onAnswered }: Props) {
  const [options] = useState(() => shuffleArray(exercise.options));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const correctOption = exercise.options[exercise.correctOptionIndex];
  const hasAnswered = selectedOption !== null;

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    onAnswered(option === correctOption);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.prompt}>{exercise.promptVi}</Text>
      <Text style={styles.question}>{exercise.question}</Text>
      <View style={styles.optionsList}>
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === correctOption;
          const showCorrect = hasAnswered && isCorrectOption;
          const showIncorrect = hasAnswered && isSelected && !isCorrectOption;

          return (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              disabled={hasAnswered}
              style={[styles.option, showCorrect && styles.optionCorrect, showIncorrect && styles.optionIncorrect]}
            >
              <Text style={styles.optionText}>{option}</Text>
              {showCorrect ? <Ionicons name="checkmark-circle" size={20} color={colors.success} /> : null}
              {showIncorrect ? <Ionicons name="close-circle" size={20} color={colors.danger} /> : null}
            </Pressable>
          );
        })}
      </View>
      {hasAnswered && exercise.explanationVi ? <Text style={styles.explanation}>{exercise.explanationVi}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  prompt: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  question: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  optionsList: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '1A',
  },
  optionIncorrect: {
    borderColor: colors.danger,
    backgroundColor: colors.danger + '1A',
  },
  optionText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
