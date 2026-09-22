import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ProgressBar } from './ProgressBar';
import { colors, spacing } from '@/src/theme';

interface ProgressTopBarProps {
  onBack: () => void;
  currentStep?: number;
  totalSteps?: number;
}

export function ProgressTopBar({ currentStep, totalSteps, onBack }: ProgressTopBarProps) {
  const showProgress = typeof currentStep === 'number' && typeof totalSteps === 'number' && totalSteps > 0;

  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
        <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
      </Pressable>
      {showProgress ? (
        <View style={styles.progressWrapper}>
          <ProgressBar progress={currentStep! / totalSteps!} />
        </View>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  progressWrapper: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
});
