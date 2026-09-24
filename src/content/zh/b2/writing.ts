import type { WritingItem } from '../../types';

/**
 * B2 Hanzi characters — picked from B2 vocabulary, same representative (not
 * exhaustive) approach as the A1/A2/B1 writing sets. See ../writing.ts,
 * ../a2/writing.ts and ../b1/writing.ts.
 */
export const chineseB2WritingItems: WritingItem[] = [
  {
    id: 'zh-b2-w1',
    languageCode: 'zh',
    lessonId: 'zh-b2-l1-1-shi-de',
    script: 'hanzi',
    character: '毕',
    exampleWord: '毕业',
    exampleWordTranslationVi: 'Tốt nghiệp',
  },
  {
    id: 'zh-b2-w2',
    languageCode: 'zh',
    lessonId: 'zh-b2-l1-2-potential-complement',
    script: 'hanzi',
    character: '受',
    exampleWord: '受不了',
    exampleWordTranslationVi: 'Không chịu đựng được',
  },
  {
    id: 'zh-b2-w3',
    languageCode: 'zh',
    lessonId: 'zh-b2-l2-1-lian-dou',
    script: 'hanzi',
    character: '认',
    exampleWord: '承认',
    exampleWordTranslationVi: 'Thừa nhận',
  },
  {
    id: 'zh-b2-w4',
    languageCode: 'zh',
    lessonId: 'zh-b2-l3-1-jinguan-danshi',
    script: 'hanzi',
    character: '挑',
    exampleWord: '挑战',
    exampleWordTranslationVi: 'Thử thách',
  },
];
