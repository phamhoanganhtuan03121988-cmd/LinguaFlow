import type { LanguageCode } from '@/src/data/languages';
import type { ContentPack } from './types';
import { englishA1Pack } from './en';
import { englishA2Pack } from './en/a2';
import { koreanA1Pack } from './ko';
import { koreanA2Pack } from './ko/a2';
import { chineseA1Pack } from './zh';
import { chineseA2Pack } from './zh/a2';
import { japaneseA1Pack } from './ja';
import { japaneseA2Pack } from './ja/a2';

/**
 * Registry of content packs by language. Each language now maps to an ARRAY of
 * packs — one per CEFR level currently registered (A1, A2; B1/B2 slot in later
 * the same way). Adding a new language or level later means adding one entry
 * to the relevant array here — nothing else in the app (stores, screens,
 * progress logic) needs to change.
 *
 * Every pack's unit/lesson/grammar/conversation/writing ids are prefixed to
 * stay globally unique: each language's A1 pack keeps its original (Phase 8C)
 * id convention, and every A2 pack additionally inserts an "-a2-" segment
 * (e.g. "ko-a2-l1-1-..."). This is what makes A1 and A2 progress naturally
 * isolate from each other in the stores — see Part 19 of the Phase 9 spec —
 * without needing a separate "level" dimension in useProgressStore/useReviewStore.
 */
export const CONTENT_PACKS: Partial<Record<LanguageCode, ContentPack[]>> = {
  en: [englishA1Pack, englishA2Pack],
  ko: [koreanA1Pack, koreanA2Pack],
  zh: [chineseA1Pack, chineseA2Pack],
  ja: [japaneseA1Pack, japaneseA2Pack],
};
