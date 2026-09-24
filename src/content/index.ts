import type { LanguageCode } from '@/src/data/languages';
import type { ContentPack } from './types';
import { englishA1Pack } from './en';
import { englishA2Pack } from './en/a2';
import { englishB1Pack } from './en/b1';
import { englishB2Pack } from './en/b2';
import { englishC1Pack } from './en/c1';
import { englishC2Pack } from './en/c2';
import { englishToeicFoundationPack } from './en/toeic/foundation';
import { englishToeic550Pack } from './en/toeic/550';
import { englishToeic750Pack } from './en/toeic/750';
import { englishToeic850Pack } from './en/toeic/850';
import { englishIeltsFoundationPack } from './en/ielts/foundation';
import { englishIelts55Pack } from './en/ielts/5-5';
import { englishIelts60Pack } from './en/ielts/6-0';
import { englishIelts65Pack } from './en/ielts/6-5';
import { englishIelts75Pack } from './en/ielts/7-5';
import { koreanA1Pack } from './ko';
import { koreanA2Pack } from './ko/a2';
import { koreanB1Pack } from './ko/b1';
import { koreanB2Pack } from './ko/b2';
import { koreanTopik1Pack } from './ko/topik/1';
import { koreanTopik3Pack } from './ko/topik/3';
import { koreanTopik4Pack } from './ko/topik/4';
import { koreanTopik5Pack } from './ko/topik/5';
import { chineseA1Pack } from './zh';
import { chineseA2Pack } from './zh/a2';
import { chineseB1Pack } from './zh/b1';
import { chineseB2Pack } from './zh/b2';
import { chineseHsk1Pack } from './zh/hsk/1';
import { chineseHsk3Pack } from './zh/hsk/3';
import { chineseHsk4Pack } from './zh/hsk/4';
import { chineseHsk5Pack } from './zh/hsk/5';
import { chineseHsk7Pack } from './zh/hsk/7';
import { japaneseA1Pack } from './ja';
import { japaneseA2Pack } from './ja/a2';
import { japaneseB1Pack } from './ja/b1';
import { japaneseB2Pack } from './ja/b2';
import { japaneseJlptN5Pack } from './ja/jlpt/n5';
import { japaneseJlptN3Pack } from './ja/jlpt/n3';
import { japaneseJlptN2Pack } from './ja/jlpt/n2';
import { japaneseJlptN1Pack } from './ja/jlpt/n1';

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
 *
 * Phase 10 adds small proof-of-architecture SAMPLE packs for each language's
 * exam track(s) (`isSample: true`) — TOEIC/IELTS for English, TOPIK for
 * Korean, HSK for Chinese, JLPT for Japanese. Their ids are prefixed with the
 * trackId + levelId (e.g. "en-toeic-550-...", "ja-jlpt-n3-...") so they stay
 * isolated from the 'general' track's A1/A2 content and from each other,
 * using the exact same id-prefixing isolation mechanism — no new store
 * dimension was needed. These are NOT full exam curricula (see Part 11 of
 * the Phase 10 spec).
 */
export const CONTENT_PACKS: Partial<Record<LanguageCode, ContentPack[]>> = {
  en: [
    englishA1Pack, englishA2Pack, englishB1Pack, englishB2Pack, englishC1Pack, englishC2Pack,
    englishToeicFoundationPack, englishToeic550Pack, englishToeic750Pack, englishToeic850Pack,
    englishIeltsFoundationPack, englishIelts55Pack, englishIelts60Pack, englishIelts65Pack, englishIelts75Pack,
  ],
  ko: [koreanA1Pack, koreanA2Pack, koreanB1Pack, koreanB2Pack, koreanTopik1Pack, koreanTopik3Pack, koreanTopik4Pack, koreanTopik5Pack],
  zh: [chineseA1Pack, chineseA2Pack, chineseB1Pack, chineseB2Pack, chineseHsk1Pack, chineseHsk3Pack, chineseHsk4Pack, chineseHsk5Pack, chineseHsk7Pack],
  ja: [japaneseA1Pack, japaneseA2Pack, japaneseB1Pack, japaneseB2Pack, japaneseJlptN5Pack, japaneseJlptN3Pack, japaneseJlptN2Pack, japaneseJlptN1Pack],
};
