import type { LanguageCode } from '@/src/data/languages';
import type { ContentPack } from './types';
import { englishA1Pack } from './en';
import { koreanA1Pack } from './ko';
import { chineseA1Pack } from './zh';
import { japaneseA1Pack } from './ja';

/**
 * Registry of content packs by language. Adding a new language pack later means
 * adding one entry here — nothing else in the app (stores, screens, progress
 * logic) needs to change. Every pack's unit/lesson/grammar/conversation ids are
 * prefixed with its own language code (ko-, zh-, ja-, en's existing convention)
 * so they can never collide with another pack's ids in loader.ts's composite-key
 * lookup, on top of the collision guard already enforcing this at load time.
 */
export const CONTENT_PACKS: Partial<Record<LanguageCode, ContentPack>> = {
  en: englishA1Pack,
  ko: koreanA1Pack,
  zh: chineseA1Pack,
  ja: japaneseA1Pack,
};
