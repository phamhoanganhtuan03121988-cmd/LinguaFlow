import type { LanguageCode } from '@/src/data/languages';
import type { ContentPack } from './types';
import { englishA1Pack } from './en';

/**
 * Registry of content packs by language. Only 'en' exists today — adding Korean,
 * Chinese, or Japanese later means adding one entry here, nothing else in the app
 * needs to change.
 */
export const CONTENT_PACKS: Partial<Record<LanguageCode, ContentPack>> = {
  en: englishA1Pack,
};
