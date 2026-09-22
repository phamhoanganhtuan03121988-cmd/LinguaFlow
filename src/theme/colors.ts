export const colors = {
  primary: '#0F766E',
  primaryLight: '#14B8A6',
  primaryDark: '#0B5852',
  accent: '#FB7C68',
  accentLight: '#FFDCD3',
  accentYellow: '#F5B942',
  accentYellowLight: '#FDECC3',
  accentBlue: '#5B9BD5',
  accentBlueLight: '#DCEBF9',

  background: '#FAF9F6',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F0EB',

  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textInverse: '#FFFFFF',

  border: '#E5E7EB',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const;

export type ThemeColors = typeof colors;
