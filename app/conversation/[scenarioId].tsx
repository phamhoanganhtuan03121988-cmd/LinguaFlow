import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, ProgressBar, ScreenContainer } from '@/src/components/ui';
import { getConversationScenarioById } from '@/src/content/loader';
import { ChatBubble } from '@/src/features/conversation/components/ChatBubble';
import { ConversationTaskCard } from '@/src/features/conversation/components/ConversationTaskCard';
import { PlaceholderScreen } from '@/src/features/tabs/PlaceholderScreen';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export default function ConversationScreen() {
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [showTranslation, setShowTranslation] = useState(true);

  // Resolved from the content itself, not the active language.
  const scenario = getConversationScenarioById(scenarioId);
  const languageCode = scenario?.languageCode;

  const isComplete = useProgressStore((state) => state.isConversationScenarioComplete(scenarioId, languageCode));
  const markConversationScenarioComplete = useProgressStore((state) => state.markConversationScenarioComplete);
  const { practicedSpeakingIds } = useProgressStore((state) => selectLanguageProgress(state, languageCode ?? null));

  if (!scenario) {
    return (
      <PlaceholderScreen
        icon="alert-circle-outline"
        titleKey="conversation.notFoundTitle"
        bodyKey="conversation.notFoundBody"
      />
    );
  }

  const practicedCount = scenario.dialogue.filter((line) => practicedSpeakingIds[`conv-${line.id}`]).length;

  const handleTaskAnswered = () => {
    markConversationScenarioComplete(scenario.id, scenario.languageCode);
  };

  return (
    <ScreenContainer maxWidth={560}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Pressable onPress={() => setShowTranslation((value) => !value)} style={styles.translateToggle}>
          <Ionicons name={showTranslation ? 'eye-off-outline' : 'eye-outline'} size={16} color={colors.primary} />
          <Text style={styles.translateToggleText}>
            {showTranslation ? t('conversation.hideTranslation') : t('conversation.showTranslation')}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.title}>{scenario.titleVi}</Text>
      <Text style={styles.description}>{scenario.descriptionVi}</Text>

      <Card style={styles.contextCard}>
        <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
        <Text style={styles.contextText}>{scenario.contextVi}</Text>
      </Card>

      <View style={styles.practiceProgress}>
        <Text style={styles.practiceProgressLabel}>
          {t('conversation.practiceProgressLabel', { practiced: practicedCount, total: scenario.dialogue.length })}
        </Text>
        <ProgressBar progress={scenario.dialogue.length > 0 ? practicedCount / scenario.dialogue.length : 0} />
      </View>

      <View style={styles.dialogue}>
        {scenario.dialogue.map((line) => (
          <ChatBubble key={line.id} line={line} languageCode={scenario.languageCode} showTranslation={showTranslation} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('conversation.taskHeading')}</Text>
        <ConversationTaskCard task={scenario.task} onAnswered={handleTaskAnswered} />
      </View>

      {isComplete ? (
        <View style={styles.footer}>
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.completedText}>{t('conversation.completedBadge')}</Text>
          </View>
          <Button label={t('conversation.backCta')} variant="secondary" onPress={() => router.back()} />
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  translateToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight + '33',
  },
  translateToggleText: {
    ...typography.caption,
    color: colors.primaryDark,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  contextText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    flex: 1,
  },
  practiceProgress: {
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  practiceProgressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dialogue: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    justifyContent: 'center',
  },
  completedText: {
    ...typography.bodyMedium,
    color: colors.success,
  },
});
