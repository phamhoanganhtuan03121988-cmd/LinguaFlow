import type { ContentPack, Course, Lesson, Unit } from '../../types';

/**
 * Phase 10 Milestone 3 proof-of-architecture sample for HSK 7 — NOT a full HSK
 * curriculum. Under HSK 3.0 (2021), levels 7–9 are a single combined advanced
 * band ("HSK 7-9") rather than three separately administered levels; this
 * sample registers under level '7' as the entry point into that band. See
 * 1.ts for the broader isSample rationale.
 */
const course: Course = {
  id: 'zh-hsk-7',
  languageCode: 'zh',
  trackId: 'hsk',
  level: '7',
  titleVi: 'HSK 7 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu HSK 7 (thuộc dải nâng cao HSK 7-9 theo khung 3.0): từ vựng học thuật/chuyên ngành cho viết luận nâng cao. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề HSK đầy đủ.',
  unitIds: ['zh-hsk-7-u1-advanced-writing'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'zh-hsk-7-u1-advanced-writing',
    courseId: 'zh-hsk-7',
    title: '高级写作词汇',
    titleVi: 'Từ vựng viết luận nâng cao',
    descriptionVi: 'Từ vựng học thuật/chuyên ngành dùng trong bài viết luận nâng cao ở dải HSK 7-9.',
    lessonIds: ['zh-hsk-7-l1-advanced-writing'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'zh-hsk-7-l1-advanced-writing',
    unitId: 'zh-hsk-7-u1-advanced-writing',
    title: '论证词汇',
    titleVi: 'Từ vựng lập luận',
    objectiveVi: 'Nhận biết từ vựng học thuật dùng để lập luận, khái quát trong bài viết luận nâng cao.',
    estimatedMinutes: 9,
    examSkill: 'writing',
    grammarNoteVi: 'Ở dải nâng cao HSK 7-9, bài viết yêu cầu từ vựng học thuật trang trọng như 论证, 阐述, 权威 để lập luận chặt chẽ.',
    vocabulary: [
      { id: 'zh-hsk-7-l1-v1', term: '论证', translationVi: 'Lập luận, luận chứng', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-7-l1-s1', usageNoteVi: 'Pinyin: lùnzhèng' },
      { id: 'zh-hsk-7-l1-v2', term: '概括', translationVi: 'Khái quát', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-7-l1-s2', usageNoteVi: 'Pinyin: gàikuò' },
      { id: 'zh-hsk-7-l1-v3', term: '阐述', translationVi: 'Trình bày, luận giải', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-7-l1-s3', usageNoteVi: 'Pinyin: chǎnshù' },
      { id: 'zh-hsk-7-l1-v4', term: '权威', translationVi: 'Uy tín, quyền uy', partOfSpeech: 'noun', usageNoteVi: 'Pinyin: quánwēi' },
      { id: 'zh-hsk-7-l1-v5', term: '严谨', translationVi: 'Chặt chẽ, nghiêm ngặt', partOfSpeech: 'adjective', usageNoteVi: 'Pinyin: yánjǐn' },
    ],
    sentences: [
      { id: 'zh-hsk-7-l1-s1', text: '作者用大量数据论证了自己的观点。', translationVi: 'Tác giả đã dùng nhiều dữ liệu để lập luận cho quan điểm của mình.' },
      { id: 'zh-hsk-7-l1-s2', text: '请概括这篇文章的主要内容。', translationVi: 'Hãy khái quát nội dung chính của bài viết này.' },
      { id: 'zh-hsk-7-l1-s3', text: '他详细阐述了这个理论的背景。', translationVi: 'Anh ấy đã trình bày chi tiết bối cảnh của lý thuyết này.' },
    ],
    exercises: [
      {
        id: 'zh-hsk-7-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '论证'.",
        question: '论证',
        options: ['Lập luận, luận chứng', 'Khái quát', 'Uy tín', 'Chặt chẽ'],
        correctOptionIndex: 0,
      },
      {
        id: 'zh-hsk-7-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '请___这篇文章的主要内容。',
        wordBank: ['概括', '阐述', '权威'],
        correctAnswer: '概括',
      },
      {
        id: 'zh-hsk-7-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Anh ấy đã trình bày chi tiết bối cảnh của lý thuyết này."',
        words: ['这个理论的背景', '他详细', '阐述了'],
        correctOrder: ['他详细', '阐述了', '这个理论的背景'],
      },
    ],
  },
];

export const chineseHsk7Pack: ContentPack = { course, units, lessons };
