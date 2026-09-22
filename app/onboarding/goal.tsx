import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Button, ProgressTopBar, ScreenContainer, SelectableCard } from '@/src/components/ui';
import { LEARNING_GOALS } from '@/src/data/goals';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, spacing, typography } from '@/src/theme';

export default function GoalScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const learningGoal = useAppStore((state) => state.learningGoal);
  const setLearningGoal = useAppStore((state) => state.setLearningGoal);

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={2} totalSteps={3} onBack={() => router.back()} />

      <Text style={styles.title}>{t('onboarding.goal.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.goal.subtitle')}</Text>

      <View style={styles.list}>
        {LEARNING_GOALS.map((goal, index) => (
          <Animated.View key={goal.id} entering={FadeInDown.delay(60 * index).duration(350)}>
            <SelectableCard
              selected={learningGoal === goal.id}
              onPress={() => setLearningGoal(goal.id)}
              title={t(`onboarding.goal.options.${goal.id}.title`)}
              description={t(`onboarding.goal.options.${goal.id}.description`)}
              leading={
                <View style={styles.iconBadge}>
                  <Ionicons name={goal.icon} size={22} color={colors.primary} />
                </View>
              }
              accentColor={colors.primary}
            />
          </Animated.View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          label={t('common.continue')}
          onPress={() => router.push('/onboarding/level')}
          disabled={!learningGoal}
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
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight + '33',
  },
  footer: {
    marginTop: spacing.xl,
    paddingBottom: spacing.md,
  },
});
