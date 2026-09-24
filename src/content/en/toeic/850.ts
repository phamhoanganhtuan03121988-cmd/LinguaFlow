import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for TOEIC 850 — NOT a full TOEIC curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-toeic-850',
  languageCode: 'en',
  trackId: 'toeic',
  level: '850',
  titleVi: 'TOEIC 850 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOEIC 850: từ vựng thông báo sân bay/nhà ga thường gặp trong TOEIC Listening. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOEIC đầy đủ.',
  unitIds: ['en-toeic-850-u1-announcements'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-toeic-850-u1-announcements',
    courseId: 'en-toeic-850',
    title: 'Public Announcements',
    titleVi: 'Thông báo công cộng',
    descriptionVi: 'Từ vựng thông báo tại sân bay, nhà ga và văn phòng, phổ biến trong TOEIC Listening.',
    lessonIds: ['en-toeic-850-l1-announcements'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-toeic-850-l1-announcements',
    unitId: 'en-toeic-850-u1-announcements',
    title: 'Listening to announcements',
    titleVi: 'Nghe hiểu thông báo',
    objectiveVi: 'Nhận biết từ vựng và cấu trúc câu thường dùng trong thông báo công cộng ở đề TOEIC Listening.',
    estimatedMinutes: 8,
    examSkill: 'listening',
    grammarNoteVi:
      "Thông báo công cộng thường mở đầu bằng 'Attention...' hoặc 'Ladies and gentlemen...', và dùng thì tương lai gần hoặc hiện tại hoàn thành để báo tin.",
    vocabulary: [
      { id: 'en-toeic-850-l1-v1', term: 'announcement', translationVi: 'Thông báo', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-850-l1-s1' },
      { id: 'en-toeic-850-l1-v2', term: 'boarding', translationVi: 'Lên máy bay/tàu', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-850-l1-s1' },
      { id: 'en-toeic-850-l1-v3', term: 'delay', translationVi: 'Sự trì hoãn, trễ giờ', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-850-l1-s2' },
      { id: 'en-toeic-850-l1-v4', term: 'platform', translationVi: 'Sân ga', partOfSpeech: 'noun' },
      { id: 'en-toeic-850-l1-v5', term: 'notify', translationVi: 'Thông báo cho', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-850-l1-s3' },
    ],
    sentences: [
      { id: 'en-toeic-850-l1-s1', text: 'Attention passengers, this is the final boarding announcement.', translationVi: 'Kính mời quý khách chú ý, đây là thông báo lên máy bay cuối cùng.' },
      { id: 'en-toeic-850-l1-s2', text: 'The train has been delayed due to technical issues.', translationVi: 'Chuyến tàu đã bị trễ do sự cố kỹ thuật.' },
      { id: 'en-toeic-850-l1-s3', text: 'We will notify you as soon as the gate is confirmed.', translationVi: 'Chúng tôi sẽ thông báo cho quý khách ngay khi cổng ra được xác nhận.' },
    ],
    exercises: [
      {
        id: 'en-toeic-850-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'delay'.",
        question: 'delay',
        options: ['Sự trì hoãn, trễ giờ', 'Thông báo', 'Sân ga', 'Lên máy bay'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-toeic-850-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'We will ___ you as soon as the gate is confirmed.',
        wordBank: ['notify', 'delay', 'board'],
        correctAnswer: 'notify',
      },
      {
        id: 'en-toeic-850-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['due to', 'the train has been delayed', 'technical issues'],
        correctOrder: ['the train has been delayed', 'due to', 'technical issues'],
      },
    ],
  },
];

export const englishToeic850Pack: ContentPack = { course, units, lessons };
