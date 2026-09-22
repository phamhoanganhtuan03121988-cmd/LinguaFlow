import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';
import { Card } from './Card';
import { ScreenContainer } from './ScreenContainer';
import { colors, radius, spacing, typography } from '@/src/theme';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  body: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
}

export function EmptyState({ icon, title, body, ctaLabel, onCtaPress }: EmptyStateProps) {
  return (
    <ScreenContainer maxWidth={480} scroll={false} contentStyle={styles.centered}>
      <Card style={styles.card}>
        <View style={styles.iconBadge}>
          <Ionicons name={icon} size={28} color={colors.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
        {ctaLabel && onCtaPress ? (
          <View style={styles.cta}>
            <Button label={ctaLabel} onPress={onCtaPress} />
          </View>
        ) : null}
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight + '33',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  cta: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
});
