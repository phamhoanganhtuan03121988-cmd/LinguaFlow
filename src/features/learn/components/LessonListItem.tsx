import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/src/components/ui';
import type { Lesson } from '@/src/content/types';
import type { TimelineStatus } from '@/src/features/learn/courseProgress';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  lesson: Lesson;
  index: number;
  status: TimelineStatus;
  onPress: () => void;
}

/**
 * Status is purely a visual indicator (✓ completed / ▶ current / ○ upcoming) —
 * every lesson stays tappable via onPress regardless of status, lessons are
 * never locked.
 */
export function LessonListItem({ lesson, index, status, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.row, status === 'current' && styles.rowCurrent]}>
        <View
          style={[
            styles.indexBadge,
            status === 'completed' && styles.indexBadgeCompleted,
            status === 'current' && styles.indexBadgeCurrent,
          ]}
        >
          {status === 'completed' ? (
            <Ionicons name="checkmark" size={18} color={colors.textInverse} />
          ) : status === 'current' ? (
            <Ionicons name="play" size={14} color={colors.textInverse} />
          ) : (
            <Text style={styles.indexText}>{index + 1}</Text>
          )}
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.title}>{lesson.titleVi}</Text>
          <Text style={styles.meta}>{lesson.objectiveVi}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowCurrent: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  indexBadgeCompleted: {
    backgroundColor: colors.success,
  },
  indexBadgeCurrent: {
    backgroundColor: colors.primary,
  },
  indexText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
