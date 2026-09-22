import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button, Card } from '@/src/components/ui';
import { colors, radius, spacing, typography } from '@/src/theme';

interface SessionSummaryProps {
  reviewedCount: number;
  xpGained: number;
  onFinish: () => void;
}

/**
 * Extension point for Phase 4+: this is where a confetti burst, a streak
 * celebration, or a badge unlock toast would trigger once this component
 * mounts (e.g. via a useEffect reacting to the 'session-completed' event
 * from src/features/gamification/events.ts). No celebratory effect is
 * implemented yet — Phase 3 only renders the plain summary below.
 */
export function SessionSummary({ reviewedCount, xpGained, onFinish }: SessionSummaryProps) {
  const { t } = useTranslation();
  return (
    <Card style={styles.card}>
      <View style={styles.iconBadge}>
        <Ionicons name="checkmark-circle" size={32} color={colors.success} />
      </View>
      <Text style={styles.title}>{t('review.summary.title')}</Text>
      <Text style={styles.body}>{t('review.summary.body', { count: reviewedCount, xp: xpGained })}</Text>
      <View style={styles.cta}>
        <Button label={t('review.summary.cta')} onPress={onFinish} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.success + '1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
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
