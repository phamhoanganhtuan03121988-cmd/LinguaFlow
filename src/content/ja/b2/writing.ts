import type { WritingItem } from '../../types';

/**
 * B2 Kanji — picked from B2 vocabulary, same representative (not exhaustive)
 * approach as the A1/A2/B1 writing sets. See ../writing.ts, ../a2/writing.ts
 * and ../b1/writing.ts.
 */
export const japaneseB2WritingItems: WritingItem[] = [
  {
    id: 'ja-b2-w1',
    languageCode: 'ja',
    lessonId: 'ja-b2-l1-1-noni',
    script: 'kanji',
    character: '試',
    exampleWord: '試験',
    exampleWordTranslationVi: 'Kỳ thi',
  },
  {
    id: 'ja-b2-w2',
    languageCode: 'ja',
    lessonId: 'ja-b2-l2-1-hazu-da',
    script: 'kanji',
    character: '到',
    exampleWord: '到着',
    exampleWordTranslationVi: 'Đến nơi',
  },
  {
    id: 'ja-b2-w3',
    languageCode: 'ja',
    lessonId: 'ja-b2-l2-3-tame-ni',
    script: 'kanji',
    character: '将',
    exampleWord: '将来',
    exampleWordTranslationVi: 'Tương lai',
  },
  {
    id: 'ja-b2-w4',
    languageCode: 'ja',
    lessonId: 'ja-b2-l3-2-zaru-wo-enai',
    script: 'kanji',
    character: '任',
    exampleWord: '責任',
    exampleWordTranslationVi: 'Trách nhiệm',
  },
];
