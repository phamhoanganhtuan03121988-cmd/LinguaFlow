import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for the HSK track — NOT a full HSK curriculum. */
const course: Course = {
  id: 'zh-hsk-1',
  languageCode: 'zh',
  trackId: 'hsk',
  level: '1',
  titleVi: 'HSK 1 — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho lộ trình HSK: từ vựng chào hỏi cơ bản (HSK 1). Đây là nội dung luyện tập tham khảo, chưa phải bộ đề HSK đầy đủ.',
  unitIds: ['zh-hsk-1-u1-basic-greetings'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'zh-hsk-1-u1-basic-greetings',
    courseId: 'zh-hsk-1',
    title: '基本问候',
    titleVi: 'Chào hỏi cơ bản',
    descriptionVi: 'Từ vựng chào hỏi và giới thiệu bản thân cơ bản ở cấp HSK 1.',
    lessonIds: ['zh-hsk-1-l1-basic-greetings'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'zh-hsk-1-l1-basic-greetings',
    unitId: 'zh-hsk-1-u1-basic-greetings',
    title: '基本问候',
    titleVi: 'Chào hỏi cơ bản',
    objectiveVi: 'Nhận biết và sử dụng các từ chào hỏi, giới thiệu bản thân cơ bản ở cấp HSK 1.',
    estimatedMinutes: 6,
    examSkill: 'vocabulary',
    grammarNoteVi: 'HSK 1 tập trung vào khoảng 150 từ vựng giao tiếp cơ bản nhất trong đời sống hằng ngày.',
    vocabulary: [
      { id: 'zh-hsk-1-l1-v1', term: '你好', translationVi: 'Xin chào', partOfSpeech: 'greeting', exampleSentenceId: 'zh-hsk-1-l1-s1', usageNoteVi: 'Pinyin: nǐ hǎo' },
      { id: 'zh-hsk-1-l1-v2', term: '谢谢', translationVi: 'Cảm ơn', partOfSpeech: 'phrase', exampleSentenceId: 'zh-hsk-1-l1-s2', usageNoteVi: 'Pinyin: xièxie' },
      { id: 'zh-hsk-1-l1-v3', term: '再见', translationVi: 'Tạm biệt', partOfSpeech: 'phrase', usageNoteVi: 'Pinyin: zàijiàn' },
      { id: 'zh-hsk-1-l1-v4', term: '我叫', translationVi: 'Tôi tên là', partOfSpeech: 'phrase', exampleSentenceId: 'zh-hsk-1-l1-s3', usageNoteVi: 'Pinyin: wǒ jiào' },
      { id: 'zh-hsk-1-l1-v5', term: '朋友', translationVi: 'Bạn bè', partOfSpeech: 'noun', usageNoteVi: 'Pinyin: péngyou' },
    ],
    sentences: [
      { id: 'zh-hsk-1-l1-s1', text: '你好，很高兴认识你。', translationVi: 'Xin chào, rất vui được quen bạn.' },
      { id: 'zh-hsk-1-l1-s2', text: '谢谢你的帮助。', translationVi: 'Cảm ơn sự giúp đỡ của bạn.' },
      { id: 'zh-hsk-1-l1-s3', text: '我叫小明。', translationVi: 'Tôi tên là Tiểu Minh.' },
    ],
    exercises: [
      {
        id: 'zh-hsk-1-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '谢谢'.",
        question: '谢谢',
        options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Bạn bè'],
        correctOptionIndex: 1,
      },
      {
        id: 'zh-hsk-1-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '___小明。',
        wordBank: ['我叫', '你好', '再见'],
        correctAnswer: '我叫',
      },
      {
        id: 'zh-hsk-1-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '朋友'.",
        question: '朋友',
        options: ['Tạm biệt', 'Cảm ơn', 'Bạn bè', 'Xin chào'],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const chineseHsk1Pack: ContentPack = { course, units, lessons };
