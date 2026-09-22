import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, LanguageMonogram, ProgressBar } from '@/src/components/ui';
import type { CEFRLevel } from '@/src/content/types';
import { getLanguageByCode } from '@/src/data/languages';
import type { LanguageHubEntry } from '@/src/features/languageHub/languageSummary';
import { colors, radius, spacing, typography } from '@/src/theme';

interface Props {
  entry: LanguageHubEntry;
  isActive: boolean;
  onPress: () => void;
  /** Switches which CEFR level (A1/A2/...) this language studies. Never touches other languages. */
  onSelectLevel: (level: CEFRLevel) => void;
}

export function LanguageCard({ entry, isActive, onPress, onSelectLevel }: Props) {
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
            <Text style={styles.subtitle}>{t('languageHub.completedLabel', { level: entry.activeLevel })}</Text>
          ) : (
            <Text style={styles.subtitle}>
              {t('languageHub.inProgressLabel', { unitIndex: entry.currentUnitIndex ?? 1, level: entry.activeLevel })}
            </Text>
          )}
        </View>
      </View>

      {entry.availableLevels.length > 1 ? (
        <View style={styles.levelRow}>
          {entry.availableLevels.map((level) => (
            <Pressable
              key={level}
              onPress={() => onSelectLevel(level)}
              style={[styles.levelPill, level === entry.activeLevel && styles.levelPillActive]}
            >
              <Text style={[styles.levelPillText, level === entry.activeLevel && styles.levelPillTextActive]}>
                {level}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

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

      {entry.nextLevel ? (
        <View style={styles.ctaSpacing}>
          <Button
            label={t('languageHub.startLevelCta', { level: entry.nextLevel })}
            variant="secondary"
            onPress={() => onSelectLevel(entry.nextLevel as CEFRLevel)}
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
  levelRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  levelPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelPillText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  levelPillTextActive: {
    color: colors.textInverse,
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
