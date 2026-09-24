import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for IELTS Band 5.5 — NOT a full IELTS curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-ielts-5-5',
  languageCode: 'en',
  trackId: 'ielts',
  level: '5.5',
  titleVi: 'IELTS Band 5.5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu Band 5.5: từ vựng chủ đề quen thuộc cho IELTS Speaking Part 1. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề IELTS đầy đủ.',
  unitIds: ['en-ielts-5-5-u1-everyday-topics'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-ielts-5-5-u1-everyday-topics',
    courseId: 'en-ielts-5-5',
    title: 'Everyday Topics',
    titleVi: 'Chủ đề quen thuộc',
    descriptionVi: 'Từ vựng để nói về bản thân, quê hương và thói quen hằng ngày trong IELTS Speaking Part 1.',
    lessonIds: ['en-ielts-5-5-l1-everyday-topics'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-ielts-5-5-l1-everyday-topics',
    unitId: 'en-ielts-5-5-u1-everyday-topics',
    title: 'Talking about yourself',
    titleVi: 'Nói về bản thân',
    objectiveVi: 'Sử dụng từ vựng cơ bản để trả lời các câu hỏi quen thuộc trong IELTS Speaking Part 1.',
    estimatedMinutes: 6,
    examSkill: 'speaking',
    grammarNoteVi: "IELTS Speaking Part 1 hỏi về chủ đề quen thuộc (quê hương, công việc, sở thích) — nên trả lời tự nhiên, mở rộng câu bằng lý do ngắn gọn.",
    vocabulary: [
      { id: 'en-ielts-5-5-l1-v1', term: 'hometown', translationVi: 'Quê hương', partOfSpeech: 'noun', exampleSentenceId: 'en-ielts-5-5-l1-s1' },
      { id: 'en-ielts-5-5-l1-v2', term: 'routine', translationVi: 'Thói quen, lịch trình', partOfSpeech: 'noun', exampleSentenceId: 'en-ielts-5-5-l1-s2' },
      { id: 'en-ielts-5-5-l1-v3', term: 'leisure time', translationVi: 'Thời gian rảnh', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-5-5-l1-s3' },
      { id: 'en-ielts-5-5-l1-v4', term: 'weekday', translationVi: 'Ngày trong tuần (thứ Hai-thứ Sáu)', partOfSpeech: 'noun' },
      { id: 'en-ielts-5-5-l1-v5', term: 'hobby', translationVi: 'Sở thích', partOfSpeech: 'noun' },
    ],
    sentences: [
      { id: 'en-ielts-5-5-l1-s1', text: 'My hometown is a small city near the coast.', translationVi: 'Quê hương tôi là một thành phố nhỏ gần bờ biển.' },
      { id: 'en-ielts-5-5-l1-s2', text: 'My daily routine starts with a cup of coffee.', translationVi: 'Thói quen hằng ngày của tôi bắt đầu bằng một tách cà phê.' },
      { id: 'en-ielts-5-5-l1-s3', text: 'I usually spend my leisure time reading books.', translationVi: 'Tôi thường dành thời gian rảnh để đọc sách.' },
    ],
    exercises: [
      {
        id: 'en-ielts-5-5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'hometown'.",
        question: 'hometown',
        options: ['Quê hương', 'Thói quen', 'Sở thích', 'Thời gian rảnh'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-ielts-5-5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'I usually spend my ___ time reading books.',
        wordBank: ['leisure', 'weekday', 'routine'],
        correctAnswer: 'leisure',
      },
      {
        id: 'en-ielts-5-5-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['starts with', 'my daily routine', 'a cup of coffee'],
        correctOrder: ['my daily routine', 'starts with', 'a cup of coffee'],
      },
    ],
  },
];

export const englishIelts55Pack: ContentPack = { course, units, lessons };
