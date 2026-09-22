export type CurrentLevelId = 'beginner' | 'elementary' | 'intermediate';

export interface CurrentLevelOption {
  id: CurrentLevelId;
  progressHint: number;
}

export const CURRENT_LEVELS: CurrentLevelOption[] = [
  { id: 'beginner', progressHint: 0.12 },
  { id: 'elementary', progressHint: 0.45 },
  { id: 'intermediate', progressHint: 0.78 },
];
