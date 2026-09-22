import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type LearningGoalId = 'daily-conversation' | 'travel' | 'work' | 'self-improvement';

export interface LearningGoalOption {
  id: LearningGoalId;
  icon: ComponentProps<typeof Ionicons>['name'];
}

export const LEARNING_GOALS: LearningGoalOption[] = [
  { id: 'daily-conversation', icon: 'chatbubbles-outline' },
  { id: 'travel', icon: 'airplane-outline' },
  { id: 'work', icon: 'briefcase-outline' },
  { id: 'self-improvement', icon: 'sparkles-outline' },
];
