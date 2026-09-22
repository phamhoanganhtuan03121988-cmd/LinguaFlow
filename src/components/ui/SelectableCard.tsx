import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { Card } from './Card';
import { colors, spacing, typography } from '@/src/theme';

interface SelectableCardProps {
  selected: boolean;
  onPress: () => void;
  title: string;
  description?: string;
  leading?: ReactNode;
  accentColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SelectableCard({
  selected,
  onPress,
  title,
  description,
  leading,
  accentColor = colors.primary,
}: SelectableCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.98, { duration: 100 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 100 });
      }}
      style={animatedStyle}
    >
      <Card
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          borderWidth: 2,
          borderColor: selected ? accentColor : 'transparent',
          backgroundColor: selected ? `${accentColor}0D` : colors.surface,
        }}
      >
        {leading}
        <View style={styles.textColumn}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
        {selected ? (
          <Ionicons name="checkmark-circle" size={24} color={accentColor} />
        ) : (
          <View style={styles.unselectedDot} />
        )}
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  textColumn: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  unselectedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
});
