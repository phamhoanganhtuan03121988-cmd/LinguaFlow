import { StyleSheet, Text, View } from 'react-native';

import type { LanguageCode } from '@/src/data/languages';
import type { VocabularyItem } from '@/src/content/types';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { colors, radius, spacing, typography } from '@/src/theme';

interface VocabularyCardProps {
  item: VocabularyItem;
  languageCode: LanguageCode;
}

export function VocabularyCard({ item, languageCode }: VocabularyCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textColumn}>
        <Text style={styles.term}>{item.term}</Text>
        <Text style={styles.translation}>{item.translationVi}</Text>
        {item.usageNoteVi ? <Text style={styles.usageNote}>{item.usageNoteVi}</Text> : null}
      </View>
      <SpeakButton
        id={`vocab-${item.id}`}
        text={item.term}
        languageCode={languageCode}
        audioUrl={item.audioUrl}
        size="small"
        showSpeedToggle
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
  term: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  translation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  usageNote: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
