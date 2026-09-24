import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for TOPIK 3 (TOPIK II) — NOT a full TOPIK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'ko-topik-3',
  languageCode: 'ko',
  trackId: 'topik',
  level: '3',
  titleVi: 'TOPIK 3 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOPIK 3 (TOPIK II): ngữ pháp diễn đạt lý do. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOPIK đầy đủ.',
  unitIds: ['ko-topik-3-u1-reason-grammar'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ko-topik-3-u1-reason-grammar',
    courseId: 'ko-topik-3',
    title: '이유 표현 문법',
    titleVi: 'Ngữ pháp diễn đạt lý do',
    descriptionVi: 'Cấu trúc ngữ pháp diễn đạt lý do/nguyên nhân, thường gặp ở cấp TOPIK II.',
    lessonIds: ['ko-topik-3-l1-reason-grammar'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ko-topik-3-l1-reason-grammar',
    unitId: 'ko-topik-3-u1-reason-grammar',
    title: '-아서/어서 이유 표현',
    titleVi: 'Diễn đạt lý do với -아서/어서',
    objectiveVi: 'Sử dụng cấu trúc -아서/어서 để diễn đạt lý do, nguyên nhân trong câu.',
    estimatedMinutes: 8,
    examSkill: 'grammar',
    grammarNoteVi:
      "'-아서/어서' gắn vào động từ/tính từ để diễn đạt lý do: '비가 와서 집에 있어요' (Vì trời mưa nên tôi ở nhà). Không dùng được với câu mệnh lệnh/đề nghị.",
    vocabulary: [
      { id: 'ko-topik-3-l1-v1', term: '이유', translationVi: 'Lý do', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: iyu' },
      { id: 'ko-topik-3-l1-v2', term: '바쁘다', translationVi: 'Bận rộn', partOfSpeech: 'adjective', exampleSentenceId: 'ko-topik-3-l1-s1', usageNoteVi: 'Cách đọc: bappeuda' },
      { id: 'ko-topik-3-l1-v3', term: '늦다', translationVi: 'Trễ, muộn', partOfSpeech: 'verb', exampleSentenceId: 'ko-topik-3-l1-s2', usageNoteVi: 'Cách đọc: neutda' },
      { id: 'ko-topik-3-l1-v4', term: '피곤하다', translationVi: 'Mệt mỏi', partOfSpeech: 'adjective', exampleSentenceId: 'ko-topik-3-l1-s3', usageNoteVi: 'Cách đọc: pigonhada' },
      { id: 'ko-topik-3-l1-v5', term: '길이 막히다', translationVi: 'Kẹt xe', partOfSpeech: 'phrase', usageNoteVi: 'Cách đọc: giri makhida' },
    ],
    sentences: [
      { id: 'ko-topik-3-l1-s1', text: '바빠서 전화를 못 했어요.', translationVi: 'Vì bận nên tôi đã không gọi điện được.' },
      { id: 'ko-topik-3-l1-s2', text: '길이 막혀서 늦었어요.', translationVi: 'Vì kẹt xe nên tôi đã đến trễ.' },
      { id: 'ko-topik-3-l1-s3', text: '피곤해서 일찍 잤어요.', translationVi: 'Vì mệt nên tôi đã đi ngủ sớm.' },
    ],
    exercises: [
      {
        id: 'ko-topik-3-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn cách diễn đạt lý do đúng.',
        question: '길이 막혀서 ___.',
        options: ['늦었어요', '늦어요 하세요', '늦다', '늦었습니까'],
        correctOptionIndex: 0,
      },
      {
        id: 'ko-topik-3-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '___해서 일찍 잤어요.',
        wordBank: ['피곤', '바쁘', '이유'],
        correctAnswer: '피곤',
      },
      {
        id: 'ko-topik-3-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '길이 막히다'.",
        question: '길이 막히다',
        options: ['Mệt mỏi', 'Bận rộn', 'Kẹt xe', 'Trễ giờ'],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const koreanTopik3Pack: ContentPack = { course, units, lessons };
