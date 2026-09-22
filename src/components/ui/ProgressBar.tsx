import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors, radius } from '@/src/theme';

interface ProgressBarProps {
  progress: number;
  color?: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({ progress, color = colors.primary, trackColor = colors.surfaceMuted, height = 8 }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  const widthValue = useSharedValue(0);

  useEffect(() => {
    widthValue.value = withTiming(clamped, { duration: 500 });
  }, [clamped, widthValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthValue.value * 100}%`,
  }));

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: radius.full }]}>
      <Animated.View style={[styles.fill, { backgroundColor: color, borderRadius: radius.full }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
