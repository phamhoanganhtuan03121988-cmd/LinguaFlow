import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card, EmptyState, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getAvailableLevelsForTrack } from '@/src/content/loader';
import { formatLevelLabel, getTracksForLanguage, getTrack, type LearningTrack } from '@/src/content/tracks';
import { getLanguageByCode, type LanguageCode } from '@/src/data/languages';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, radius, spacing, typography } from '@/src/theme';

type Mode = 'active' | 'goal';

export default function TrackLevelSelectorScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { languageCode, mode } = useLocalSearchParams<{ languageCode?: LanguageCode; mode?: Mode }>();
  const setActiveTrackLevel = useAppStore((state) => state.setActiveTrackLevel);
  const setActiveLanguage = useAppStore((state) => state.setActiveLanguage);
  const setTrackGoal = useAppStore((state) => state.setTrackGoal);

  const [step, setStep] = useState<'track' | 'level'>('track');
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);

  const effectiveMode: Mode = mode === 'goal' ? 'goal' : 'active';

  if (!languageCode) {
    return (
      <EmptyState icon="alert-circle-outline" title={t('trackSelector.notFoundTitle')} body={t('trackSelector.notFoundBody')} />
    );
  }

  const language = getLanguageByCode(languageCode);
  const languageLabel = language ? t(`onboarding.language.options.${languageCode}.label`) : languageCode;
  const tracks = getTracksForLanguage(languageCode);

  const handleSelectTrack = (track: LearningTrack) => {
    setSelectedTrack(track);
    setStep('level');
  };

  const handleSelectLevel = (levelId: string, hasContent: boolean) => {
    if (!selectedTrack) return;
    if (effectiveMode === 'active' && !hasContent) return; // can't study a level with no content yet

    if (effectiveMode === 'goal') {
      setTrackGoal(selectedTrack.id, levelId, languageCode);
    } else {
      setActiveLanguage(languageCode);
      setActiveTrackLevel(selectedTrack.id, levelId, languageCode);
    }
    router.back();
  };

  if (step === 'level' && selectedTrack) {
    const availableLevels = getAvailableLevelsForTrack(languageCode, selectedTrack.id, selectedTrack.levels);

    return (
      <ScreenContainer maxWidth={480}>
        <ProgressTopBar onBack={() => setStep('track')} />
        <Text style={styles.title}>
          {selectedTrack.name}
          {selectedTrack.frameworkVersion ? ` (${selectedTrack.frameworkVersion})` : ''}
        </Text>
        <Text style={styles.subtitle}>{selectedTrack.descriptionVi}</Text>

        <View style={styles.list}>
          {selectedTrack.levels.map((levelId) => {
            const hasContent = availableLevels.includes(levelId);
            const disabled = effectiveMode === 'active' && !hasContent;
            return (
              <Pressable
                key={levelId}
                onPress={() => handleSelectLevel(levelId, hasContent)}
                disabled={disabled}
                style={[styles.levelRow, disabled && styles.levelRowDisabled]}
              >
                <Text style={styles.levelLabel}>{formatLevelLabel(selectedTrack, levelId)}</Text>
                {!hasContent ? <Text style={styles.comingSoonTag}>{t('trackSelector.comingSoonTag')}</Text> : null}
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              </Pressable>
            );
          })}
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar onBack={() => router.back()} />
      <Text style={styles.title}>
        {t(effectiveMode === 'goal' ? 'trackSelector.goalTitle' : 'trackSelector.activeTitle', { language: languageLabel })}
      </Text>
      <Text style={styles.subtitle}>{t('trackSelector.subtitle')}</Text>

      <View style={styles.list}>
        {tracks.map((track) => (
          <Pressable key={track.id} onPress={() => handleSelectTrack(track)}>
            <Card style={styles.trackCard}>
              <View style={styles.trackTextColumn}>
                <Text style={styles.trackName}>{track.name}</Text>
                <Text style={styles.trackDescription}>{track.descriptionVi}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  trackTextColumn: {
    flex: 1,
    gap: 2,
  },
  trackName: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  trackDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelRowDisabled: {
    opacity: 0.5,
  },
  levelLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    flex: 1,
  },
  comingSoonTag: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
