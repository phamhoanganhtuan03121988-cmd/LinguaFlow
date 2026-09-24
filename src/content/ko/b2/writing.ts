import type { WritingItem } from '../../types';

/**
 * B2 Hangul syllable blocks — picked from B2 vocabulary, same representative
 * (not exhaustive) approach as the A1/A2/B1 writing sets. See ../writing.ts,
 * ../a2/writing.ts and ../b1/writing.ts.
 */
export const koreanB2WritingItems: WritingItem[] = [
  {
    id: 'ko-b2-w1',
    languageCode: 'ko',
    lessonId: 'ko-b2-l1-1-neun-barame',
    script: 'hangul',
    character: '잠',
    exampleWord: '늦잠',
    exampleWordTranslationVi: 'Ngủ quên, ngủ nướng',
  },
  {
    id: 'ko-b2-w2',
    languageCode: 'ko',
    lessonId: 'ko-b2-l1-3-lsurok',
    script: 'hangul',
    character: '력',
    exampleWord: '실력',
    exampleWordTranslationVi: 'Thực lực, trình độ',
  },
  {
    id: 'ko-b2-w3',
    languageCode: 'ko',
    lessonId: 'ko-b2-l2-1-lppunman-anira',
    script: 'hangul',
    character: '질',
    exampleWord: '품질',
    exampleWordTranslationVi: 'Chất lượng',
  },
  {
    id: 'ko-b2-w4',
    languageCode: 'ko',
    lessonId: 'ko-b2-l3-1-humble-verbs',
    script: 'hangul',
    character: '예',
    exampleWord: '예의',
    exampleWordTranslationVi: 'Phép lịch sự, lễ nghĩa',
  },
];
