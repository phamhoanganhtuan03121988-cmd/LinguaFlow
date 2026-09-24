import type { WritingItem } from '../../types';

/**
 * B1 Kanji — picked from B1 vocabulary, same representative (not exhaustive)
 * approach as the A1/A2 writing sets. See ../writing.ts and ../a2/writing.ts.
 */
export const japaneseB1WritingItems: WritingItem[] = [
  {
    id: 'ja-b1-w1',
    languageCode: 'ja',
    lessonId: 'ja-b1-l1-1-keiken',
    script: 'kanji',
    character: '経',
    exampleWord: '経験',
    exampleWordTranslationVi: 'Kinh nghiệm',
  },
  {
    id: 'ja-b1-w2',
    languageCode: 'ja',
    lessonId: 'ja-b1-l1-2-to-omoimasu',
    script: 'kanji',
    character: '意',
    exampleWord: '意見',
    exampleWordTranslationVi: 'Ý kiến',
  },
  {
    id: 'ja-b1-w3',
    languageCode: 'ja',
    lessonId: 'ja-b1-l2-3-obligation',
    script: 'kanji',
    character: '規',
    exampleWord: '規則',
    exampleWordTranslationVi: 'Quy tắc, quy định',
  },
  {
    id: 'ja-b1-w4',
    languageCode: 'ja',
    lessonId: 'ja-b1-l3-2-sou-desu',
    script: 'kanji',
    character: '報',
    exampleWord: '予報',
    exampleWordTranslationVi: 'Dự báo',
  },
];
