import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/src/components/ui';
import type { ConversationScenario } from '@/src/content/types';
import { colors, radius, spacing, typography } from '@/src/theme';

interface ScenarioCardProps {
  scenario: ConversationScenario;
  isComplete: boolean;
  accentColor: string;
  accentColorLight: string;
  onPress: () => void;
}

export function ScenarioCard({ scenario, isComplete, accentColor, accentColorLight, onPress }: ScenarioCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={[styles.iconBadge, { backgroundColor: accentColorLight }]}>
          <Ionicons name="chatbubbles-outline" size={22} color={accentColor} />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.title}>{scenario.titleVi}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            {scenario.descriptionVi}
          </Text>
        </View>
        {isComplete ? (
          <Ionicons name="checkmark-circle" size={22} color={colors.success} />
        ) : (
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});
