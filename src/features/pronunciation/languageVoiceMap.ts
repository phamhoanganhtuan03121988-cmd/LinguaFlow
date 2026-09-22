import type { LanguageCode } from '@/src/data/languages';

/** IETF BCP-47 locale used to select a text-to-speech voice per learning language. */
export const LANGUAGE_TO_SPEECH_LOCALE: Record<LanguageCode, string> = {
  en: 'en-US',
  ko: 'ko-KR',
  zh: 'zh-CN',
  ja: 'ja-JP',
};
