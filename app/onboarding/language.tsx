import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button, LanguageMonogram, ProgressTopBar, ScreenContainer, SelectableCard } from '@/src/components/ui';
import { LANGUAGES } from '@/src/data/languages';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, spacing, typography } from '@/src/theme';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const selectedLanguage = useAppStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useAppStore((state) => state.setSelectedLanguage);

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={1} totalSteps={3} onBack={() => router.back()} />

      <Text style={styles.title}>{t('onboarding.language.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.language.subtitle')}</Text>

      <View style={styles.list}>
        {LANGUAGES.map((language, index) => (
          <Animated.View key={language.code} entering={FadeInDown.delay(60 * index).duration(350)}>
            <SelectableCard
              selected={selectedLanguage === language.code}
              onPress={() => setSelectedLanguage(language.code)}
              title={t(`onboarding.language.options.${language.code}.label`)}
              description={language.nativeName}
              leading={<LanguageMonogram language={language} />}
              accentColor={language.accentColor}
            />
          </Animated.View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          label={t('common.continue')}
          onPress={() => router.push('/onboarding/goal')}
          disabled={!selectedLanguage}
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
