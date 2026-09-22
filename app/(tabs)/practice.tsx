import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card, EmptyState, ScreenContainer } from '@/src/components/ui';
import {
  getConversationScenariosForLanguage,
  getCourseForLanguage,
  getGrammarTopicsForLanguage,
  getWritingItemsForLanguage,
} from '@/src/content/loader';
import { getLanguageByCode } from '@/src/data/languages';
import { getCourseProgress } from '@/src/features/learn/courseProgress';
import { GrammarTopicCard } from '@/src/features/grammar/components/GrammarTopicCard';
import { ScenarioCard } from '@/src/features/conversation/components/ScenarioCard';
import { selectLanguageProfile, useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

const SECTION_ACCENTS = [
  { color: colors.primary, light: colors.primaryLight },
  { color: colors.accent, light: colors.accentLight },
  { color: colors.accentBlue, light: colors.accentBlueLight },
  { color: colors.accentYellow, light: colors.accentYellowLight },
];

export default function PracticeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const { activeLevel } = useAppStore((state) => selectLanguageProfile(state, activeLanguageCode));
  const {
    completedLessonIds,
    practicedSpeakingIds,
    totalListeningSessionsCompleted,
    completedGrammarTopicIds,
    completedConversationScenarioIds,
  } = useProgressStore((state) => selectLanguageProgress(state, activeLanguageCode));

  if (!activeLanguageCode) {
    return (
      <EmptyState
        icon="flag-outline"
        title={t('learn.chooseLanguageTitle')}
        body={t('learn.chooseLanguageBody')}
        ctaLabel={t('learn.chooseLanguageCta')}
        onCtaPress={() => router.push('/onboarding/language')}
      />
    );
  }

  const course = getCourseForLanguage(activeLanguageCode, activeLevel);

  if (!course) {
    const language = getLanguageByCode(activeLanguageCode);
    const languageLabel = language ? t(`onboarding.language.options.${language.code}.label`) : '';

    return (
      <EmptyState
        icon="construct-outline"
        title={t('learn.comingSoonTitle')}
        body={t('learn.comingSoonBody', { language: languageLabel })}
      />
    );
  }

  const { completedCount } = getCourseProgress(course, completedLessonIds);

  if (completedCount === 0) {
    return (
      <EmptyState
        icon="headset-outline"
        title={t('listening.noLessonsTitle')}
        body={t('listening.noLessonsBody')}
        ctaLabel={t('listening.noLessonsCta')}
        onCtaPress={() => router.push('/learn')}
      />
    );
  }

  const grammarTopics = getGrammarTopicsForLanguage(activeLanguageCode, activeLevel);
  const conversationScenarios = getConversationScenariosForLanguage(activeLanguageCode, activeLevel);
  const writingItems = getWritingItemsForLanguage(activeLanguageCode).filter(
    (item) => completedLessonIds[item.lessonId],
  );

  return (
    <ScreenContainer maxWidth={520}>
      <Text style={styles.title}>{t('tabs.practice')}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('listening.tabTitle')}</Text>
        <Text style={styles.sectionSubtitle}>{t('listening.tabSubtitle')}</Text>
        <Card style={styles.startCard}>
          <View style={styles.iconBadge}>
            <Ionicons name="headset-outline" size={28} color={colors.primary} />
          </View>
          <View style={styles.startCta}>
            <Button label={t('listening.startCta')} onPress={() => router.push('/listening-session')} />
          </View>
        </Card>
      </View>

      {getWritingItemsForLanguage(activeLanguageCode).length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{t('writing.sectionHeading')}</Text>
          <Text style={styles.sectionSubtitle}>{t('writing.sectionSubtitle')}</Text>
          <Card style={styles.startCard}>
            <View style={styles.iconBadge}>
              <Ionicons name="create-outline" size={28} color={colors.primary} />
            </View>
            {writingItems.length > 0 ? (
              <>
                <Text style={styles.writingCountLabel}>
                  {t('writing.itemsAvailableLabel', { count: writingItems.length })}
                </Text>
                <View style={styles.startCta}>
                  <Button label={t('writing.startCta')} onPress={() => router.push('/writing-session')} />
                </View>
              </>
            ) : (
              <Text style={styles.writingCountLabel}>{t('writing.noItemsBody')}</Text>
            )}
          </Card>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('grammar.tabHeading')}</Text>
        <Text style={styles.sectionSubtitle}>{t('grammar.tabSubtitle')}</Text>
        {grammarTopics.length === 0 ? (
          <Card style={styles.emptySectionCard}>
            <Text style={styles.emptySectionText}>{t('grammar.noContentBody')}</Text>
          </Card>
        ) : (
          <View style={styles.stack}>
            {grammarTopics.map((topic, index) => {
              const accent = SECTION_ACCENTS[index % SECTION_ACCENTS.length];
              return (
                <GrammarTopicCard
                  key={topic.id}
                  topic={topic}
                  isComplete={Boolean(completedGrammarTopicIds[topic.id])}
                  accentColor={accent.color}
                  accentColorLight={accent.light}
                  onPress={() => router.push(`/grammar/${topic.id}`)}
                />
              );
            })}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>{t('conversation.tabHeading')}</Text>
        <Text style={styles.sectionSubtitle}>{t('conversation.tabSubtitle')}</Text>
        {conversationScenarios.length === 0 ? (
          <Card style={styles.emptySectionCard}>
            <Text style={styles.emptySectionText}>{t('conversation.noContentBody')}</Text>
          </Card>
        ) : (
          <View style={styles.stack}>
            {conversationScenarios.map((scenario, index) => {
              const accent = SECTION_ACCENTS[index % SECTION_ACCENTS.length];
              return (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  isComplete={Boolean(completedConversationScenarioIds[scenario.id])}
                  accentColor={accent.color}
                  accentColorLight={accent.light}
                  onPress={() => router.push(`/conversation/${scenario.id}`)}
                />
              );
            })}
          </View>
        )}
      </View>

      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>{t('listening.statsTitle')}</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('listening.practicedSpeakingLabel')}</Text>
          <Text style={styles.statsValue}>{Object.keys(practicedSpeakingIds).length}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>{t('listening.sessionsCompletedLabel')}</Text>
          <Text style={styles.statsValue}>{totalListeningSessionsCompleted}</Text>
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.display,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  startCard: {
    alignItems: 'center',
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startCta: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
  writingCountLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  stack: {
    gap: spacing.sm,
  },
  emptySectionCard: {
    paddingVertical: spacing.md,
  },
  emptySectionText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsCard: {
    gap: spacing.sm,
  },
  statsTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsValue: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
});
