import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import vi from './locales/vi.json';

const SUPPORTED_LANGUAGES = ['vi', 'en'] as const;
const FALLBACK_LANGUAGE = 'vi';

function resolveDeviceLanguage(): string {
  const deviceLanguageCode = getLocales()[0]?.languageCode;
  return SUPPORTED_LANGUAGES.find((language) => language === deviceLanguageCode) ?? FALLBACK_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
  },
  lng: resolveDeviceLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
