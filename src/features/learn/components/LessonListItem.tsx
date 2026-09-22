import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/src/components/ui';
import type { Lesson } from '@/src/content/types';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  lesson: Lesson;
  index: number;
  completed: boolean;
  onPress: () => void;
}

export function LessonListItem({ lesson, index, completed, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.row}>
        <View style={[styles.indexBadge, completed && styles.indexBadgeCompleted]}>
          {completed ? (
            <Ionicons name="checkmark" size={18} color={colors.textInverse} />
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
