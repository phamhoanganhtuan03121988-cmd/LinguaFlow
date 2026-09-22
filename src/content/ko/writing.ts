import type { WritingItem } from '../types';

/** A1 Hangul syllable blocks — picked from Unit 1 (greetings/politeness) vocabulary, the first script a beginner meets. */
export const koreanA1WritingItems: WritingItem[] = [
  {
    id: 'ko-w1',
    languageCode: 'ko',
    lessonId: 'ko-l1-1-basic-greetings',
    script: 'hangul',
    character: '안',
    exampleWord: '안녕하세요',
    exampleWordTranslationVi: 'Xin chào',
  },
  {
    id: 'ko-w2',
    languageCode: 'ko',
    lessonId: 'ko-l1-1-basic-greetings',
    script: 'hangul',
    character: '녕',
    exampleWord: '안녕하세요',
    exampleWordTranslationVi: 'Xin chào',
  },
  {
    id: 'ko-w3',
    languageCode: 'ko',
    lessonId: 'ko-l1-3-politeness',
    script: 'hangul',
    character: '감',
    exampleWord: '감사합니다',
    exampleWordTranslationVi: 'Cảm ơn',
  },
  {
    id: 'ko-w4',
    languageCode: 'ko',
    lessonId: 'ko-l2-1-whats-your-name',
    script: 'hangul',
    character: '름',
    exampleWord: '이름',
    exampleWordTranslationVi: 'Tên',
  },
];
