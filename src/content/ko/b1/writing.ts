import type { WritingItem } from '../../types';

/**
 * B1 Hangul syllable blocks — picked from B1 vocabulary, same representative
 * (not exhaustive) approach as the A1/A2 writing sets. See ../writing.ts and
 * ../a2/writing.ts.
 */
export const koreanB1WritingItems: WritingItem[] = [
  {
    id: 'ko-b1-w1',
    languageCode: 'ko',
    lessonId: 'ko-b1-l1-1-geot-gatda',
    script: 'hangul',
    character: '짐',
    exampleWord: '짐작',
    exampleWordTranslationVi: 'Phỏng đoán',
  },
  {
    id: 'ko-b1-w2',
    languageCode: 'ko',
    lessonId: 'ko-b1-l1-2-gi-ttaemune',
    script: 'hangul',
    character: '통',
    exampleWord: '교통',
    exampleWordTranslationVi: 'Giao thông',
  },
  {
    id: 'ko-b1-w3',
    languageCode: 'ko',
    lessonId: 'ko-b1-l2-1-ryeogo-hada',
    script: 'hangul',
    character: '격',
    exampleWord: '자격증',
    exampleWordTranslationVi: 'Chứng chỉ',
  },
  {
    id: 'ko-b1-w4',
    languageCode: 'ko',
    lessonId: 'ko-b1-l3-1-honorific-si',
    script: 'hangul',
    character: '함',
    exampleWord: '성함',
    exampleWordTranslationVi: 'Tên (kính ngữ)',
  },
];
