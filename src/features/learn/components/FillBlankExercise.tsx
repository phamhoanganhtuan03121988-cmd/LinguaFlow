import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui';
import { shuffleArray } from '@/src/features/learn/shuffle';
import type { FillBlankExercise as FillBlankExerciseData } from '@/src/content/types';
import { colors, radius, spacing, typography } from '@/src/theme';

interface Props {
  exercise: FillBlankExerciseData;
  onAnswered: (correct: boolean) => void;
}

export function FillBlankExercise({ exercise, onAnswered }: Props) {
  const [wordBank] = useState(() => shuffleArray(exercise.wordBank));
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const hasAnswered = selectedWord !== null;
  const displaySentence = exercise.sentenceTemplate.replace('___', hasAnswered ? selectedWord : '___');

  const handleSelect = (word: string) => {
    if (hasAnswered) return;
    setSelectedWord(word);
    onAnswered(word === exercise.correctAnswer);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.prompt}>{exercise.promptVi}</Text>
      <Text style={styles.sentence}>{displaySentence}</Text>
      <View style={styles.wordBank}>
        {wordBank.map((word) => {
          const isSelected = selectedWord === word;
          const isCorrectWord = word === exercise.correctAnswer;
          const showCorrect = hasAnswered && isCorrectWord;
          const showIncorrect = hasAnswered && isSelected && !isCorrectWord;

          return (
            <Pressable
              key={word}
              onPress={() => handleSelect(word)}
              disabled={hasAnswered}
              style={[styles.chip, showCorrect && styles.chipCorrect, showIncorrect && styles.chipIncorrect]}
            >
              <Text style={styles.chipText}>{word}</Text>
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
  sentence: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  chipCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '1A',
  },
  chipIncorrect: {
    borderColor: colors.danger,
    backgroundColor: colors.danger + '1A',
  },
  chipText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
