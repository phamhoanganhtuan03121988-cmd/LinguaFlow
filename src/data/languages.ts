import { colors } from '@/src/theme';

export type LanguageCode = 'en' | 'ko' | 'zh' | 'ja';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  monogram: string;
  accentColor: string;
  accentColorLight: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    nativeName: 'English',
    monogram: 'EN',
    accentColor: colors.primary,
    accentColorLight: colors.primaryLight,
  },
  {
    code: 'ko',
    nativeName: '한국어',
    monogram: '한',
    accentColor: colors.accent,
    accentColorLight: colors.accentLight,
  },
  {
    code: 'zh',
    nativeName: '中文',
    monogram: '中',
    accentColor: colors.accentYellow,
    accentColorLight: colors.accentYellowLight,
  },
  {
    code: 'ja',
    nativeName: '日本語',
    monogram: 'あ',
    accentColor: colors.accentBlue,
    accentColorLight: colors.accentBlueLight,
  },
];

export function getLanguageByCode(code: LanguageCode | null | undefined): LanguageOption | undefined {
  return LANGUAGES.find((language) => language.code === code);
}
