import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { LanguageCode } from '@/src/data/languages';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

interface ShadowingItemCardProps {
  id: string;
  term: string;
  translationVi: string;
  languageCode: LanguageCode;
  audioUrl?: string;
}

export function ShadowingItemCard({ id, term, translationVi, languageCode, audioUrl }: ShadowingItemCardProps) {
  const { t } = useTranslation();
  const isPracticed = useProgressStore((state) => state.isSpeakingPracticed(id));
  const markSpeakingPracticed = useProgressStore((state) => state.markSpeakingPracticed);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.textColumn}>
          <Text style={styles.term}>{term}</Text>
          <Text style={styles.translation}>{translationVi}</Text>
        </View>
        <SpeakButton id={`shadow-${id}`} text={term} languageCode={languageCode} audioUrl={audioUrl} size="small" />
      </View>

      <Pressable
        onPress={() => markSpeakingPracticed(id)}
        style={[styles.practiceButton, isPracticed && styles.practiceButtonDone]}
      >
        <Ionicons
          name={isPracticed ? 'checkmark-circle' : 'mic-outline'}
          size={16}
          color={isPracticed ? colors.success : colors.textSecondary}
        />
        <Text style={[styles.practiceButtonText, isPracticed && styles.practiceButtonTextDone]}>
          {isPracticed ? t('shadowing.practicedBadge') : t('shadowing.practiceCta')}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
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
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  practiceButtonDone: {
    borderColor: colors.success,
    backgroundColor: colors.success + '14',
  },
  practiceButtonText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  practiceButtonTextDone: {
    color: colors.success,
  },
});
