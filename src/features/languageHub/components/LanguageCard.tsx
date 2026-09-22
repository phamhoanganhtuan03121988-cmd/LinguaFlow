import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, LanguageMonogram, ProgressBar } from '@/src/components/ui';
import { getLanguageByCode } from '@/src/data/languages';
import type { LanguageHubEntry } from '@/src/features/languageHub/languageSummary';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  entry: LanguageHubEntry;
  isActive: boolean;
  onPress: () => void;
}

export function LanguageCard({ entry, isActive, onPress }: Props) {
  const { t } = useTranslation();
  const language = getLanguageByCode(entry.code);
  if (!language) return null;

  const languageLabel = t(`onboarding.language.options.${entry.code}.label`);

  return (
    <Card style={[styles.card, isActive && styles.cardActive]}>
      <View style={styles.header}>
        <LanguageMonogram language={language} size={40} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{languageLabel}</Text>
          {entry.status === 'no-content' ? (
            <Text style={styles.subtitle}>{t('languageHub.comingSoonLabel')}</Text>
          ) : entry.status === 'not-started' ? (
            <Text style={styles.subtitle}>{t('languageHub.notStartedLabel')}</Text>
          ) : entry.status === 'completed' ? (
            <Text style={styles.subtitle}>{t('languageHub.completedLabel')}</Text>
          ) : (
            <Text style={styles.subtitle}>
              {t('languageHub.inProgressLabel', {
                unitIndex: entry.currentUnitIndex ?? 1,
                level: t(`onboarding.level.options.${entry.level ?? 'beginner'}.title`),
              })}
            </Text>
          )}
        </View>
      </View>

      {entry.status !== 'no-content' && entry.status !== 'not-started' ? (
        <View style={styles.progressRow}>
          <View style={styles.progressBarWrapper}>
            <ProgressBar progress={entry.progressRatio} color={language.accentColor} />
          </View>
          <Text style={styles.progressLabel}>{Math.round(entry.progressRatio * 100)}%</Text>
        </View>
      ) : null}

      {entry.status !== 'no-content' ? (
        <View style={styles.ctaSpacing}>
          <Button
            label={
              entry.status === 'not-started'
                ? t('languageHub.startCta')
                : entry.status === 'completed'
                  ? t('languageHub.reviewCta')
                  : t('languageHub.continueCta')
            }
            variant={isActive ? 'primary' : 'secondary'}
            onPress={onPress}
          />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  cardActive: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBarWrapper: {
    flex: 1,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  ctaSpacing: {
    marginTop: spacing.xs,
  },
});
