import type { WritingItem } from '../../types';

/**
 * A2 Hangul syllable blocks — picked from A2 vocabulary that use more complex
 * vowel/consonant combinations than the A1 set (see ../writing.ts), e.g.
 * diphthong vowels (ㅛ, ㅑ) and double-batchim-adjacent syllables.
 */
export const koreanA2WritingItems: WritingItem[] = [
  {
    id: 'ko-a2-w1',
    languageCode: 'ko',
    lessonId: 'ko-a2-l2-1-transportation',
    script: 'hangul',
    character: '교',
    exampleWord: '교통',
    exampleWordTranslationVi: 'Giao thông',
  },
  {
    id: 'ko-a2-w2',
    languageCode: 'ko',
    lessonId: 'ko-a2-l3-1-past-experiences',
    script: 'hangul',
    character: '행',
    exampleWord: '여행',
    exampleWordTranslationVi: 'Du lịch',
  },
  {
    id: 'ko-a2-w3',
    languageCode: 'ko',
    lessonId: 'ko-a2-l2-2-shopping',
    script: 'hangul',
    character: '쇼',
    exampleWord: '쇼핑',
    exampleWordTranslationVi: 'Mua sắm',
  },
  {
    id: 'ko-a2-w4',
    languageCode: 'ko',
    lessonId: 'ko-a2-l3-2-future-plans',
    script: 'hangul',
    character: '획',
    exampleWord: '계획',
    exampleWordTranslationVi: 'Kế hoạch',
  },
];
