import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { SrsRating } from '@/src/features/review/srs';
import { colors, fontFamily, radius, spacing } from '@/src/theme';

interface RatingOption {
  rating: SrsRating;
  color: string;
}

const RATING_OPTIONS: RatingOption[] = [
  { rating: 'again', color: colors.danger },
  { rating: 'hard', color: colors.warning },
  { rating: 'good', color: colors.primary },
  { rating: 'easy', color: colors.success },
];

interface RatingButtonRowProps {
  onRate: (rating: SrsRating) => void;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function RatingButton({ option, disabled, onRate }: { option: RatingOption; disabled: boolean; onRate: (rating: SrsRating) => void }) {
  const { t } = useTranslation();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      onPress={() => onRate(option.rating)}
      disabled={disabled}
      onPressIn={() => {
        if (!disabled) scale.value = withTiming(0.95, { duration: 100 });
      }}
      onPressOut={() => {
        if (!disabled) scale.value = withTiming(1, { duration: 100 });
      }}
      style={[styles.button, { backgroundColor: option.color }, disabled && styles.buttonDisabled, animatedStyle]}
    >
      <Text style={styles.buttonLabel}>{t(`review.rating.${option.rating}`)}</Text>
    </AnimatedPressable>
  );
}

export function RatingButtonRow({ onRate, disabled = false }: RatingButtonRowProps) {
  return (
    <View style={styles.row}>
      {RATING_OPTIONS.map((option) => (
        <RatingButton key={option.rating} option={option} disabled={disabled} onRate={onRate} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    minHeight: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.textInverse,
    textAlign: 'center',
  },
});
