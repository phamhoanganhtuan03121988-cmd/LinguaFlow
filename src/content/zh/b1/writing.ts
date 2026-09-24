import type { WritingItem } from '../../types';

/**
 * B1 Hanzi characters — picked from B1 vocabulary, same representative (not
 * exhaustive) approach as the A1/A2 writing sets. See ../writing.ts and
 * ../a2/writing.ts.
 */
export const chineseB1WritingItems: WritingItem[] = [
  {
    id: 'zh-b1-w1',
    languageCode: 'zh',
    lessonId: 'zh-b1-l1-1-ba',
    script: 'hanzi',
    character: '钥',
    exampleWord: '钥匙',
    exampleWordTranslationVi: 'Chìa khóa',
  },
  {
    id: 'zh-b1-w2',
    languageCode: 'zh',
    lessonId: 'zh-b1-l1-2-bei',
    script: 'hanzi',
    character: '板',
    exampleWord: '老板',
    exampleWordTranslationVi: 'Ông chủ, sếp',
  },
  {
    id: 'zh-b1-w3',
    languageCode: 'zh',
    lessonId: 'zh-b1-l2-1-yue-yue',
    script: 'hanzi',
    character: '压',
    exampleWord: '压力',
    exampleWordTranslationVi: 'Áp lực',
  },
  {
    id: 'zh-b1-w4',
    languageCode: 'zh',
    lessonId: 'zh-b1-l3-1-juede-renwei',
    script: 'hanzi',
    character: '证',
    exampleWord: '证据',
    exampleWordTranslationVi: 'Bằng chứng',
  },
];
