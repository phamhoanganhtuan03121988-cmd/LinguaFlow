import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card } from '@/src/components/ui';
import type { WritingItem } from '@/src/content/types';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  item: WritingItem;
  isComplete: boolean;
  onPress: () => void;
}

export function WritingItemCard({ item, isComplete, onPress }: Props) {
  const { t } = useTranslation();

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={styles.characterBadge}>
          <Text style={styles.character}>{item.character}</Text>
        </View>
        <View style={styles.textColumn}>
          {item.exampleWord ? <Text style={styles.exampleWord}>{item.exampleWord}</Text> : null}
          {item.exampleWordTranslationVi ? (
            <Text style={styles.translation}>{item.exampleWordTranslationVi}</Text>
          ) : null}
        </View>
        {isComplete ? <Ionicons name="checkmark-circle" size={20} color={colors.success} /> : null}
      </View>
      <Button
        label={isComplete ? t('writing.practiceAgainCta') : t('writing.practiceCta')}
        variant={isComplete ? 'secondary' : 'primary'}
        onPress={onPress}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  characterBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  exampleWord: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  translation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
