import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/src/components/ui';
import type { ConversationTask } from '@/src/content/types';
import { colors, radius, spacing, typography } from '@/src/theme';

interface ConversationTaskCardProps {
  task: ConversationTask;
  onAnswered: (correct: boolean) => void;
}

export function ConversationTaskCard({ task, onAnswered }: ConversationTaskCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hasAnswered = selectedId !== null;

  const handleSelect = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedId(optionId);
    onAnswered(optionId === task.correctOptionId);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.prompt}>{task.promptVi}</Text>
      <View style={styles.optionsList}>
        {task.options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === task.correctOptionId;
          const showCorrect = hasAnswered && isCorrectOption;
          const showIncorrect = hasAnswered && isSelected && !isCorrectOption;

          return (
            <Pressable
              key={option.id}
              onPress={() => handleSelect(option.id)}
              disabled={hasAnswered}
              style={[styles.option, showCorrect && styles.optionCorrect, showIncorrect && styles.optionIncorrect]}
            >
              <Text style={styles.optionText}>{option.text}</Text>
              {showCorrect ? <Ionicons name="checkmark-circle" size={20} color={colors.success} /> : null}
              {showIncorrect ? <Ionicons name="close-circle" size={20} color={colors.danger} /> : null}
            </Pressable>
          );
        })}
      </View>
      {hasAnswered && task.explanationVi ? <Text style={styles.explanation}>{task.explanationVi}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  prompt: {
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
    flex: 1,
  },
  explanation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
