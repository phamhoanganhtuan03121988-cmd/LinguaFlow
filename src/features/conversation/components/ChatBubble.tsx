import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { LanguageCode } from '@/src/data/languages';
import type { DialogueLine } from '@/src/content/types';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

interface ChatBubbleProps {
  line: DialogueLine;
  languageCode: LanguageCode;
  showTranslation: boolean;
}

export function ChatBubble({ line, languageCode, showTranslation }: ChatBubbleProps) {
  const { t } = useTranslation();
  const isA = line.speaker === 'A';
  const practicedId = `conv-${line.id}`;
  const isPracticed = useProgressStore((state) => state.isSpeakingPracticed(practicedId));
  const markSpeakingPracticed = useProgressStore((state) => state.markSpeakingPracticed);

  return (
    <View style={[styles.row, isA ? styles.rowLeft : styles.rowRight]}>
      <View style={[styles.bubble, isA ? styles.bubbleA : styles.bubbleB]}>
        <View style={styles.bubbleHeader}>
          <View style={[styles.speakerBadge, isA ? styles.speakerBadgeA : styles.speakerBadgeB]}>
            <Text style={styles.speakerBadgeText}>{line.speaker}</Text>
          </View>
          <SpeakButton id={`conv-speak-${line.id}`} text={line.text} languageCode={languageCode} size="small" />
        </View>

        <Text style={styles.text}>{line.text}</Text>
        {showTranslation ? <Text style={styles.translation}>{line.translationVi}</Text> : null}

        <Pressable
          onPress={() => markSpeakingPracticed(practicedId)}
          style={[styles.practiceButton, isPracticed && styles.practiceButtonDone]}
        >
          <Ionicons
            name={isPracticed ? 'checkmark-circle' : 'mic-outline'}
            size={14}
            color={isPracticed ? colors.success : colors.textSecondary}
          />
          <Text style={[styles.practiceButtonText, isPracticed && styles.practiceButtonTextDone]}>
            {isPracticed ? t('shadowing.practicedBadge') : t('shadowing.practiceCta')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  rowLeft: {
    justifyContent: 'flex-start',
  },
  rowRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 4,
  },
  bubbleA: {
    backgroundColor: colors.accentBlueLight,
    borderTopLeftRadius: 4,
  },
  bubbleB: {
    backgroundColor: colors.accentYellowLight,
    borderTopRightRadius: 4,
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speakerBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerBadgeA: {
    backgroundColor: colors.accentBlue,
  },
  speakerBadgeB: {
    backgroundColor: colors.accentYellow,
  },
  speakerBadgeText: {
    ...typography.caption,
    color: colors.textInverse,
  },
  text: {
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
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface + 'CC',
  },
  practiceButtonDone: {
    backgroundColor: colors.success + '1A',
  },
  practiceButtonText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  practiceButtonTextDone: {
    color: colors.success,
  },
});
