import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for HSK 3 — NOT a full HSK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'zh-hsk-3',
  languageCode: 'zh',
  trackId: 'hsk',
  level: '3',
  titleVi: 'HSK 3 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu HSK 3: từ vựng sinh hoạt mở rộng thường gặp ở trình độ trung cấp. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề HSK đầy đủ.',
  unitIds: ['zh-hsk-3-u1-daily-life-vocab'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'zh-hsk-3-u1-daily-life-vocab',
    courseId: 'zh-hsk-3',
    title: '日常生活词汇',
    titleVi: 'Từ vựng sinh hoạt mở rộng',
    descriptionVi: 'Từ vựng về kế hoạch, chuẩn bị và liên lạc trong đời sống hằng ngày, thường gặp ở cấp HSK 3.',
    lessonIds: ['zh-hsk-3-l1-daily-life-vocab'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'zh-hsk-3-l1-daily-life-vocab',
    unitId: 'zh-hsk-3-u1-daily-life-vocab',
    title: '日常生活词汇',
    titleVi: 'Từ vựng sinh hoạt mở rộng',
    objectiveVi: 'Nhận biết từ vựng về kế hoạch và liên lạc trong đời sống hằng ngày ở cấp HSK 3.',
    estimatedMinutes: 6,
    examSkill: 'vocabulary',
    grammarNoteVi: 'HSK 3 mở rộng khoảng 300 từ vựng, tập trung vào chủ đề kế hoạch, công việc và giao tiếp hằng ngày.',
    vocabulary: [
      { id: 'zh-hsk-3-l1-v1', term: '计划', translationVi: 'Kế hoạch', partOfSpeech: 'noun', exampleSentenceId: 'zh-hsk-3-l1-s1', usageNoteVi: 'Pinyin: jìhuà' },
      { id: 'zh-hsk-3-l1-v2', term: '决定', translationVi: 'Quyết định', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-3-l1-s2', usageNoteVi: 'Pinyin: juédìng' },
      { id: 'zh-hsk-3-l1-v3', term: '提前', translationVi: 'Trước (thời gian)', partOfSpeech: 'phrase', usageNoteVi: 'Pinyin: tíqián' },
      { id: 'zh-hsk-3-l1-v4', term: '准备', translationVi: 'Chuẩn bị', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-3-l1-s3', usageNoteVi: 'Pinyin: zhǔnbèi' },
      { id: 'zh-hsk-3-l1-v5', term: '联系', translationVi: 'Liên lạc', partOfSpeech: 'verb', usageNoteVi: 'Pinyin: liánxì' },
    ],
    sentences: [
      { id: 'zh-hsk-3-l1-s1', text: '我们的旅行计划变了。', translationVi: 'Kế hoạch du lịch của chúng tôi đã thay đổi.' },
      { id: 'zh-hsk-3-l1-s2', text: '他决定明天出发。', translationVi: 'Anh ấy quyết định xuất phát vào ngày mai.' },
      { id: 'zh-hsk-3-l1-s3', text: '你准备好了吗？', translationVi: 'Bạn đã chuẩn bị xong chưa?' },
    ],
    exercises: [
      {
        id: 'zh-hsk-3-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '计划'.",
        question: '计划',
        options: ['Kế hoạch', 'Quyết định', 'Chuẩn bị', 'Liên lạc'],
        correctOptionIndex: 0,
      },
      {
        id: 'zh-hsk-3-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '他___明天出发。',
        wordBank: ['决定', '联系', '提前'],
        correctAnswer: '决定',
      },
      {
        id: 'zh-hsk-3-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu hỏi đúng.',
        words: ['了吗', '你', '准备好'],
        correctOrder: ['你', '准备好', '了吗'],
      },
    ],
  },
];

export const chineseHsk3Pack: ContentPack = { course, units, lessons };
