import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Card, LanguageMonogram, ProgressBar } from '@/src/components/ui';
import { getTracksForLanguage, formatLevelLabel, getTrack } from '@/src/content/tracks';
import { getLanguageByCode } from '@/src/data/languages';
import type { LanguageHubEntry } from '@/src/features/languageHub/languageSummary';
import { colors, radius, spacing, typography } from '@/src/theme';

interface Props {
  entry: LanguageHubEntry;
  isActive: boolean;
  onPress: () => void;
  /** Switches which track this language actively studies — jumps to that track's first level. Never touches other languages or the trackGoal. */
  onSelectTrack: (trackId: string) => void;
  /** Switches which level WITHIN the currently active track. Never touches other languages or the trackGoal. */
  onSelectLevel: (levelId: string) => void;
  /** Opens the dedicated Track+Level selector in "goal" mode. */
  onChangeGoal: () => void;
}

export function LanguageCard({ entry, isActive, onPress, onSelectTrack, onSelectLevel, onChangeGoal }: Props) {
  const { t } = useTranslation();
  const language = getLanguageByCode(entry.code);
  if (!language) return null;

  const languageLabel = t(`onboarding.language.options.${entry.code}.label`);
  const tracks = getTracksForLanguage(entry.code);
  const activeTrack = getTrack(entry.code, entry.activeTrackId);
  const activeLevelLabel = activeTrack ? formatLevelLabel(activeTrack, entry.activeLevelId) : entry.activeLevelId;
  const goalTrack = entry.trackGoal ? getTrack(entry.code, entry.trackGoal.trackId) : undefined;

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
            <Text style={styles.subtitle}>{t('languageHub.completedLabel', { level: activeLevelLabel })}</Text>
          ) : (
            <Text style={styles.subtitle}>
              {t('languageHub.inProgressLabel', { unitIndex: entry.currentUnitIndex ?? 1, level: activeLevelLabel })}
            </Text>
          )}
        </View>
      </View>

      {entry.trackGoal && goalTrack ? (
        <Text style={styles.goalLine}>
          🎯 {t('languageHub.goalLabel')}: {goalTrack.shortName} {formatLevelLabel(goalTrack, entry.trackGoal.targetLevelId)}
        </Text>
      ) : null}

      {entry.isSample ? <Text style={styles.sampleBadge}>{t('languageHub.sampleBadge')}</Text> : null}

      {tracks.length > 1 ? (
        <View style={styles.pillRow}>
          {tracks.map((track) => (
            <Pressable
              key={track.id}
              onPress={() => onSelectTrack(track.id)}
              style={[styles.pill, track.id === entry.activeTrackId && styles.pillActive]}
            >
              <Text style={[styles.pillText, track.id === entry.activeTrackId && styles.pillTextActive]}>
                {track.shortName}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {entry.availableLevels.length > 1 ? (
        <View style={styles.pillRow}>
          {entry.availableLevels.map((levelId) => (
            <Pressable
              key={levelId}
              onPress={() => onSelectLevel(levelId)}
              style={[styles.pill, levelId === entry.activeLevelId && styles.pillActive]}
            >
              <Text style={[styles.pillText, levelId === entry.activeLevelId && styles.pillTextActive]}>
                {activeTrack ? formatLevelLabel(activeTrack, levelId) : levelId}
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
            label={t('languageHub.startLevelCta', {
              level: activeTrack ? formatLevelLabel(activeTrack, entry.nextLevel) : entry.nextLevel,
            })}
            variant="secondary"
            onPress={() => onSelectLevel(entry.nextLevel as string)}
          />
        </View>
      ) : null}

      <View style={styles.ctaSpacing}>
        <Button label={t('languageHub.changeGoalCta')} variant="secondary" onPress={onChangeGoal} />
      </View>
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
  goalLine: {
    ...typography.bodySmall,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  sampleBadge: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  pillTextActive: {
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
