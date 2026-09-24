import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for HSK 5 — NOT a full HSK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'zh-hsk-5',
  languageCode: 'zh',
  trackId: 'hsk',
  level: '5',
  titleVi: 'HSK 5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu HSK 5: từ vựng học thuật cho đọc hiểu bài viết. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề HSK đầy đủ.',
  unitIds: ['zh-hsk-5-u1-academic-reading'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'zh-hsk-5-u1-academic-reading',
    courseId: 'zh-hsk-5',
    title: '学术阅读',
    titleVi: 'Đọc hiểu học thuật',
    descriptionVi: 'Từ vựng học thuật thường gặp trong bài viết, báo cáo ở cấp HSK 5.',
    lessonIds: ['zh-hsk-5-l1-academic-reading'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'zh-hsk-5-l1-academic-reading',
    unitId: 'zh-hsk-5-u1-academic-reading',
    title: '学术词汇',
    titleVi: 'Từ vựng học thuật',
    objectiveVi: 'Nhận biết từ vựng học thuật thường gặp trong bài viết, báo cáo ở đề thi HSK 5.',
    estimatedMinutes: 8,
    examSkill: 'reading',
    grammarNoteVi: 'HSK 5 yêu cầu đọc hiểu bài viết dài hơn với từ vựng học thuật như 现象, 趋势, 数据.',
    vocabulary: [
      { id: 'zh-hsk-5-l1-v1', term: '现象', translationVi: 'Hiện tượng', partOfSpeech: 'noun', exampleSentenceId: 'zh-hsk-5-l1-s1', usageNoteVi: 'Pinyin: xiànxiàng' },
      { id: 'zh-hsk-5-l1-v2', term: '趋势', translationVi: 'Xu hướng', partOfSpeech: 'noun', exampleSentenceId: 'zh-hsk-5-l1-s2', usageNoteVi: 'Pinyin: qūshì' },
      { id: 'zh-hsk-5-l1-v3', term: '数据', translationVi: 'Dữ liệu, số liệu', partOfSpeech: 'noun', exampleSentenceId: 'zh-hsk-5-l1-s2', usageNoteVi: 'Pinyin: shùjù' },
      { id: 'zh-hsk-5-l1-v4', term: '证明', translationVi: 'Chứng minh', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-5-l1-s3', usageNoteVi: 'Pinyin: zhèngmíng' },
      { id: 'zh-hsk-5-l1-v5', term: '观察', translationVi: 'Quan sát', partOfSpeech: 'verb', usageNoteVi: 'Pinyin: guānchá' },
    ],
    sentences: [
      { id: 'zh-hsk-5-l1-s1', text: '这是一个值得关注的社会现象。', translationVi: 'Đây là một hiện tượng xã hội đáng được quan tâm.' },
      { id: 'zh-hsk-5-l1-s2', text: '数据显示了明显的上升趋势。', translationVi: 'Dữ liệu cho thấy một xu hướng tăng rõ rệt.' },
      { id: 'zh-hsk-5-l1-s3', text: '这项研究证明了这个理论。', translationVi: 'Nghiên cứu này đã chứng minh lý thuyết đó.' },
    ],
    exercises: [
      {
        id: 'zh-hsk-5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '趋势'.",
        question: '趋势',
        options: ['Xu hướng', 'Hiện tượng', 'Dữ liệu', 'Chứng minh'],
        correctOptionIndex: 0,
      },
      {
        id: 'zh-hsk-5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '这项研究___了这个理论。',
        wordBank: ['证明', '观察', '现象'],
        correctAnswer: '证明',
      },
      {
        id: 'zh-hsk-5-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Dữ liệu cho thấy một xu hướng tăng rõ rệt."',
        words: ['上升趋势', '数据显示了', '明显的'],
        correctOrder: ['数据显示了', '明显的', '上升趋势'],
      },
    ],
  },
];

export const chineseHsk5Pack: ContentPack = { course, units, lessons };
