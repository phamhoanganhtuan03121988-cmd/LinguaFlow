import { StyleSheet, Text, View } from 'react-native';

import type { LanguageCode } from '@/src/data/languages';
import type { ExampleSentence } from '@/src/content/types';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { colors, radius, spacing, typography } from '@/src/theme';

interface ExampleSentenceCardProps {
  sentence: ExampleSentence;
  languageCode: LanguageCode;
}

export function ExampleSentenceCard({ sentence, languageCode }: ExampleSentenceCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textColumn}>
        <Text style={styles.text}>{sentence.text}</Text>
        <Text style={styles.translation}>{sentence.translationVi}</Text>
      </View>
      <SpeakButton
        id={`sentence-${sentence.id}`}
        text={sentence.text}
        languageCode={languageCode}
        audioUrl={sentence.audioUrl}
        size="small"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  text: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  translation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
