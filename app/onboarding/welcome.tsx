import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button, ScreenContainer } from '@/src/components/ui';
import { WelcomeIllustration } from '@/src/features/onboarding/components/WelcomeIllustration';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, spacing, typography } from '@/src/theme';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  return (
    <ScreenContainer scroll={false} contentStyle={styles.content} maxWidth={480}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={styles.eyebrow}>{t('onboarding.welcome.eyebrow')}</Text>
      </Animated.View>

      <WelcomeIllustration />

      <Animated.View entering={FadeInDown.delay(150).duration(400)}>
        <Text style={styles.headline}>{t('onboarding.welcome.headline')}</Text>
        <Text style={styles.description}>{t('onboarding.welcome.description')}</Text>
      </Animated.View>

      <View style={styles.spacer} />

      <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.actions}>
        <Button label={t('onboarding.welcome.primaryCta')} onPress={() => router.push('/onboarding/language')} />
        <Button
          label={t('onboarding.welcome.secondaryCta')}
          variant="secondary"
          onPress={() => {
            completeOnboarding();
            router.replace('/home');
          }}
        />
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: spacing.xl,
  },
  eyebrow: {
    ...typography.h3,
    color: colors.primary,
  },
  headline: {
    ...typography.display,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
});
