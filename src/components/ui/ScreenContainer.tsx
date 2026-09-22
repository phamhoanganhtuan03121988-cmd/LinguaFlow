import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme';

interface ScreenContainerProps extends PropsWithChildren {
  maxWidth?: number;
  scroll?: boolean;
  edges?: Edge[];
  contentStyle?: ViewStyle;
}

export function ScreenContainer({
  children,
  maxWidth = 480,
  scroll = true,
  edges = ['top', 'bottom'],
  contentStyle,
}: ScreenContainerProps) {
  const inner = <View style={[styles.maxWidthWrapper, { maxWidth }, contentStyle]}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {inner}
        </ScrollView>
      ) : (
        <View style={styles.flexContent}>{inner}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  flexContent: {
    flex: 1,
    padding: spacing.lg,
  },
  maxWidthWrapper: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
});
