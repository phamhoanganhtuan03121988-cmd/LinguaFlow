import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, ProgressBar } from '@/src/components/ui';
import type { Unit } from '@/src/content/types';
import type { TimelineStatus } from '@/src/features/learn/courseProgress';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  unit: Unit;
  completedCount: number;
  totalCount: number;
  status: TimelineStatus;
  onPress: () => void;
}

export function UnitCard({ unit, completedCount, totalCount, status, onPress }: Props) {
  const { t } = useTranslation();

  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.card, status === 'current' && styles.cardCurrent]}>
        <Text style={styles.title}>{unit.titleVi}</Text>
        <Text style={styles.description}>{unit.descriptionVi}</Text>
        <View style={styles.progressRow}>
          <View style={styles.progressBarWrapper}>
            <ProgressBar progress={totalCount > 0 ? completedCount / totalCount : 0} />
          </View>
          <Text style={styles.progressLabel}>
            {t('learn.unitsCompletedLabel', { completed: completedCount, total: totalCount })}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
  },
  cardCurrent: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  progressBarWrapper: {
    flex: 1,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
