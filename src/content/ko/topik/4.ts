import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for TOPIK 4 (TOPIK II) — NOT a full TOPIK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'ko-topik-4',
  languageCode: 'ko',
  trackId: 'topik',
  level: '4',
  titleVi: 'TOPIK 4 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOPIK 4 (TOPIK II): ngữ pháp bị động -아/어지다 thường gặp ở trình độ trung cấp cao. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOPIK đầy đủ.',
  unitIds: ['ko-topik-4-u1-passive-grammar'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ko-topik-4-u1-passive-grammar',
    courseId: 'ko-topik-4',
    title: '피동 표현',
    titleVi: 'Ngữ pháp bị động',
    descriptionVi: 'Cấu trúc bị động -아/어지다, thường gặp ở cấp TOPIK II khi mô tả sự việc/hiện tượng khách quan.',
    lessonIds: ['ko-topik-4-l1-passive-grammar'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ko-topik-4-l1-passive-grammar',
    unitId: 'ko-topik-4-u1-passive-grammar',
    title: '-아/어지다 피동 표현',
    titleVi: 'Bị động với -아/어지다',
    objectiveVi: "Sử dụng cấu trúc -아/어지다 để diễn đạt bị động, mô tả sự việc một cách khách quan.",
    estimatedMinutes: 8,
    examSkill: 'grammar',
    grammarNoteVi:
      "'-아/어지다' gắn vào động từ để tạo thể bị động, thường dùng khi mô tả sự việc/kết quả một cách khách quan mà không nhấn mạnh người thực hiện: '이 다리는 100년 전에 만들어졌어요' (Cây cầu này được xây dựng cách đây 100 năm).",
    vocabulary: [
      { id: 'ko-topik-4-l1-v1', term: '만들어지다', translationVi: 'Được làm ra, được xây dựng', partOfSpeech: 'verb', exampleSentenceId: 'ko-topik-4-l1-s1', usageNoteVi: 'Cách đọc: mandeureojida' },
      { id: 'ko-topik-4-l1-v2', term: '알려지다', translationVi: 'Được biết đến', partOfSpeech: 'verb', exampleSentenceId: 'ko-topik-4-l1-s2', usageNoteVi: 'Cách đọc: allyeojida' },
      { id: 'ko-topik-4-l1-v3', term: '세워지다', translationVi: 'Được xây dựng, thành lập', partOfSpeech: 'verb', usageNoteVi: 'Cách đọc: sewojida' },
      { id: 'ko-topik-4-l1-v4', term: '이루어지다', translationVi: 'Được thực hiện, đạt được', partOfSpeech: 'verb', exampleSentenceId: 'ko-topik-4-l1-s3', usageNoteVi: 'Cách đọc: irueojida' },
      { id: 'ko-topik-4-l1-v5', term: '놓이다', translationVi: 'Được đặt (ở đâu đó)', partOfSpeech: 'verb', usageNoteVi: 'Cách đọc: nohida' },
    ],
    sentences: [
      { id: 'ko-topik-4-l1-s1', text: '이 다리는 100년 전에 만들어졌어요.', translationVi: 'Cây cầu này được xây dựng cách đây 100 năm.' },
      { id: 'ko-topik-4-l1-s2', text: '그 배우는 전 세계에 알려져 있어요.', translationVi: 'Diễn viên đó được biết đến trên toàn thế giới.' },
      { id: 'ko-topik-4-l1-s3', text: '그의 꿈이 드디어 이루어졌어요.', translationVi: 'Cuối cùng ước mơ của anh ấy đã được thực hiện.' },
    ],
    exercises: [
      {
        id: 'ko-topik-4-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng bị động đúng của '만들다'.",
        question: '이 다리는 100년 전에 ___.',
        options: ['만들어요', '만들어졌어요', '만들었어요', '만들 거예요'],
        correctOptionIndex: 1,
      },
      {
        id: 'ko-topik-4-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng.',
        sentenceTemplate: '그의 꿈이 드디어 ___.',
        wordBank: ['이루어졌어요', '이루었어요', '이루고 있어요'],
        correctAnswer: '이루어졌어요',
      },
      {
        id: 'ko-topik-4-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '알려지다'.",
        question: '알려지다',
        options: ['Được biết đến', 'Được xây dựng', 'Được đặt', 'Được thực hiện'],
        correctOptionIndex: 0,
      },
    ],
  },
];

export const koreanTopik4Pack: ContentPack = { course, units, lessons };
