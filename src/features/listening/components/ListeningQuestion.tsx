import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui';
import { speakContent } from '@/src/features/pronunciation/pronunciationService';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { colors, radius, spacing, typography } from '@/src/theme';
import type { ListeningItem } from '../types';

const PROMPT_KEY_BY_TYPE: Record<ListeningItem['type'], string> = {
  'choose-word': 'listening.chooseWordPrompt',
  'choose-meaning': 'listening.chooseMeaningPrompt',
  'choose-sentence-meaning': 'listening.chooseSentencePrompt',
};

interface ListeningQuestionProps {
  item: ListeningItem;
  onAnswered: (correct: boolean) => void;
}

export function ListeningQuestion({ item, onAnswered }: ListeningQuestionProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const hasAnswered = selected !== null;

  useEffect(() => {
    speakContent(item.id, item.audioText, item.languageCode);
  }, [item.id, item.audioText, item.languageCode]);

  const handleSelect = (option: string) => {
    if (hasAnswered) return;
    setSelected(option);
    onAnswered(option === item.correctAnswer);
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.prompt}>{t(PROMPT_KEY_BY_TYPE[item.type])}</Text>

      <View style={styles.playRow}>
        <SpeakButton id={item.id} text={item.audioText} languageCode={item.languageCode} size="medium" />
        <Text style={styles.playLabel}>{t('listening.playCta')}</Text>
      </View>

      <View style={styles.options}>
        {item.options.map((option) => {
          const isSelected = selected === option;
          const isCorrectOption = option === item.correctAnswer;
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
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  prompt: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  playRow: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  playLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  options: {
    gap: spacing.sm,
  },
  option: {
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
    textAlign: 'center',
  },
});
