import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for TOEIC 550 — NOT a full TOEIC curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-toeic-550',
  languageCode: 'en',
  trackId: 'toeic',
  level: '550',
  titleVi: 'TOEIC 550 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOEIC 550: đọc email/thông báo công sở với thể bị động. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOEIC đầy đủ.',
  unitIds: ['en-toeic-550-u1-workplace-reading'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-toeic-550-u1-workplace-reading',
    courseId: 'en-toeic-550',
    title: 'Workplace Reading',
    titleVi: 'Đọc hiểu văn bản công sở',
    descriptionVi: 'Đọc email và thông báo công sở, nhận biết thể bị động thường gặp trong đề TOEIC Reading.',
    lessonIds: ['en-toeic-550-l1-passive-voice-memos'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-toeic-550-l1-passive-voice-memos',
    unitId: 'en-toeic-550-u1-workplace-reading',
    title: 'Passive voice in office memos',
    titleVi: 'Thể bị động trong thông báo công sở',
    objectiveVi: 'Nhận biết và sử dụng thể bị động trong văn bản thông báo, email công sở.',
    estimatedMinutes: 8,
    examSkill: 'grammar',
    grammarNoteVi:
      "Thể bị động ('be + past participle') thường dùng khi nhấn mạnh hành động hơn người thực hiện, phổ biến trong thông báo công sở: 'The report was submitted yesterday.'",
    vocabulary: [
      { id: 'en-toeic-550-l1-v1', term: 'submit', translationVi: 'Nộp, đệ trình', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-550-l1-s1' },
      { id: 'en-toeic-550-l1-v2', term: 'approve', translationVi: 'Phê duyệt', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-550-l1-s2' },
      { id: 'en-toeic-550-l1-v3', term: 'notify', translationVi: 'Thông báo cho', partOfSpeech: 'verb' },
      { id: 'en-toeic-550-l1-v4', term: 'postpone', translationVi: 'Hoãn lại', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-550-l1-s3' },
      { id: 'en-toeic-550-l1-v5', term: 'memo', translationVi: 'Thông báo nội bộ', partOfSpeech: 'noun' },
    ],
    sentences: [
      { id: 'en-toeic-550-l1-s1', text: 'The report was submitted yesterday.', translationVi: 'Báo cáo đã được nộp hôm qua.' },
      { id: 'en-toeic-550-l1-s2', text: 'The budget has been approved by the manager.', translationVi: 'Ngân sách đã được quản lý phê duyệt.' },
      { id: 'en-toeic-550-l1-s3', text: 'The meeting was postponed until Friday.', translationVi: 'Cuộc họp đã bị hoãn đến thứ Sáu.' },
    ],
    exercises: [
      {
        id: 'en-toeic-550-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng bị động đúng.',
        question: 'The report ___ (submit) yesterday.',
        options: ['submitted', 'was submitted', 'submits', 'is submitting'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-toeic-550-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'The meeting was ___ until Friday.',
        wordBank: ['postponed', 'approved', 'notified'],
        correctAnswer: 'postponed',
      },
      {
        id: 'en-toeic-550-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'approve'.",
        question: 'approve',
        options: ['Hoãn lại', 'Phê duyệt', 'Thông báo', 'Nộp'],
        correctOptionIndex: 1,
      },
    ],
  },
];

export const englishToeic550Pack: ContentPack = { course, units, lessons };
