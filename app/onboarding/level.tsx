import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button, ProgressTopBar, ScreenContainer, SelectableCard } from '@/src/components/ui';
import { CURRENT_LEVELS } from '@/src/data/levels';
import { selectLanguageProfile, useAppStore } from '@/src/store/useAppStore';
import { colors, spacing, typography } from '@/src/theme';

export default function LevelScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const currentLevel = useAppStore((state) => selectLanguageProfile(state, activeLanguageCode).currentLevel);
  const setCurrentLevel = useAppStore((state) => state.setCurrentLevel);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={3} totalSteps={3} onBack={() => router.back()} />

      <Text style={styles.title}>{t('onboarding.level.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.level.subtitle')}</Text>

      <View style={styles.list}>
        {CURRENT_LEVELS.map((level, index) => (
          <Animated.View key={level.id} entering={FadeInDown.delay(60 * index).duration(350)}>
            <SelectableCard
              selected={currentLevel === level.id}
              onPress={() => setCurrentLevel(level.id)}
              title={t(`onboarding.level.options.${level.id}.title`)}
              description={t(`onboarding.level.options.${level.id}.description`)}
              accentColor={colors.primary}
            />
          </Animated.View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          label={t('onboarding.level.finishCta')}
          onPress={() => {
            completeOnboarding();
            router.replace('/home');
          }}
          disabled={!currentLevel}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
    paddingBottom: spacing.md,
  },
});
