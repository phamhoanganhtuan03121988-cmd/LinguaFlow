import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors, radius, spacing, typography } from '@/src/theme';

const GREETING_CHIPS = [
  { greeting: 'Hello', accent: colors.primary, accentBg: colors.primaryLight },
  { greeting: '안녕', accent: colors.accent, accentBg: colors.accentLight },
  { greeting: '你好', accent: colors.accentYellow, accentBg: colors.accentYellowLight },
  { greeting: 'こんにちは', accent: colors.accentBlue, accentBg: colors.accentBlueLight },
];

export function WelcomeIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.backdropCircleLarge} />
      <View style={styles.backdropCircleSmall} />

      <View style={styles.chipGrid}>
        {GREETING_CHIPS.map((chip, index) => (
          <Animated.View
            key={chip.greeting}
            entering={FadeInDown.delay(150 * index).duration(450)}
            style={[styles.chip, { backgroundColor: chip.accentBg }]}
          >
            <Text style={[styles.chipText, { color: chip.accent }]}>{chip.greeting}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  backdropCircleLarge: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primaryLight,
    opacity: 0.18,
  },
  backdropCircleSmall: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    top: 10,
    right: 40,
    backgroundColor: colors.accentYellow,
    opacity: 0.16,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    width: 220,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    ...Platform.select({
      web: { boxShadow: '0 6px 14px rgba(15, 23, 42, 0.10)' },
      default: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  chipText: {
    ...typography.bodyMedium,
  },
});
