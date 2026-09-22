import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui';
import { shuffleArray } from '@/src/features/learn/shuffle';
import type { WordOrderExercise as WordOrderExerciseData } from '@/src/content/types';
import { colors, radius, spacing, typography } from '@/src/theme';

interface Props {
  exercise: WordOrderExerciseData;
  onAnswered: (correct: boolean) => void;
}

interface Tile {
  key: string;
  word: string;
}

export function WordOrderExercise({ exercise, onAnswered }: Props) {
  const bank = useMemo<Tile[]>(
    () => shuffleArray(exercise.words.map((word, index) => ({ key: `${word}-${index}`, word }))),
    [exercise.words],
  );

  const [remaining, setRemaining] = useState<Tile[]>(bank);
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePick = (tile: Tile) => {
    if (hasAnswered) return;
    const nextPlaced = [...placed, tile];
    setPlaced(nextPlaced);
    setRemaining((prev) => prev.filter((item) => item.key !== tile.key));

    if (nextPlaced.length === exercise.words.length) {
      const correct = nextPlaced.map((item) => item.word).join(' ') === exercise.correctOrder.join(' ');
      setIsCorrect(correct);
      setHasAnswered(true);
      onAnswered(correct);
    }
  };

  const handleRemove = (tile: Tile) => {
    if (hasAnswered) return;
    setPlaced((prev) => prev.filter((item) => item.key !== tile.key));
    setRemaining((prev) => [...prev, tile]);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.prompt}>{exercise.promptVi}</Text>

      <View style={[styles.answerArea, hasAnswered && (isCorrect ? styles.answerAreaCorrect : styles.answerAreaIncorrect)]}>
        {placed.length === 0 ? (
          <Text style={styles.placeholder}>...</Text>
        ) : (
          placed.map((tile) => (
            <Pressable key={tile.key} onPress={() => handleRemove(tile)} disabled={hasAnswered} style={styles.placedChip}>
              <Text style={styles.placedChipText}>{tile.word}</Text>
            </Pressable>
          ))
        )}
      </View>

      {hasAnswered && !isCorrect ? <Text style={styles.correctAnswerText}>{exercise.correctOrder.join(' ')}</Text> : null}

      <View style={styles.bank}>
        {remaining.map((tile) => (
          <Pressable key={tile.key} onPress={() => handlePick(tile)} disabled={hasAnswered} style={styles.bankChip}>
            <Text style={styles.bankChipText}>{tile.word}</Text>
          </Pressable>
        ))}
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
  answerArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 48,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  answerAreaCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '1A',
  },
  answerAreaIncorrect: {
    borderColor: colors.danger,
    backgroundColor: colors.danger + '1A',
  },
  placeholder: {
    ...typography.body,
    color: colors.textSecondary,
  },
  placedChip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placedChipText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  correctAnswerText: {
    ...typography.bodySmall,
    color: colors.success,
  },
  bank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  bankChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  bankChipText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
