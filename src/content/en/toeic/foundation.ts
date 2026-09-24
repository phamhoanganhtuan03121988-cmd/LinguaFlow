import type { ContentPack, Course, Lesson, Unit } from '../../types';

/**
 * Phase 10 proof-of-architecture sample for the TOEIC track — NOT a full TOEIC
 * curriculum. One unit, one lesson, proving that (language, track, level)
 * registers and isolates correctly. Labeled honestly via `isSample: true`
 * (see Part 11 of the Phase 10 spec) so the UI never implies complete exam
 * preparation.
 */
const course: Course = {
  id: 'en-toeic-foundation',
  languageCode: 'en',
  trackId: 'toeic',
  level: 'foundation',
  titleVi: 'TOEIC Foundation — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho lộ trình TOEIC: từ vựng công sở cơ bản. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOEIC đầy đủ.',
  unitIds: ['en-toeic-foundation-u1-office-basics'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-toeic-foundation-u1-office-basics',
    courseId: 'en-toeic-foundation',
    title: 'Office Basics',
    titleVi: 'Từ vựng công sở cơ bản',
    descriptionVi: 'Các từ và cụm từ thường gặp trong môi trường công sở, làm nền tảng cho TOEIC.',
    lessonIds: ['en-toeic-foundation-l1-office-vocab'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-toeic-foundation-l1-office-vocab',
    unitId: 'en-toeic-foundation-u1-office-basics',
    title: 'Office vocabulary',
    titleVi: 'Từ vựng công sở',
    objectiveVi: 'Nhận biết các từ vựng công sở cơ bản thường xuất hiện trong đề thi TOEIC.',
    estimatedMinutes: 6,
    examSkill: 'vocabulary',
    grammarNoteVi: "Các từ chỉ chức danh và hoạt động văn phòng thường xuất hiện trong phần Nghe và Đọc của TOEIC.",
    vocabulary: [
      { id: 'en-toeic-foundation-l1-v1', term: 'colleague', translationVi: 'Đồng nghiệp', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-foundation-l1-s1' },
      { id: 'en-toeic-foundation-l1-v2', term: 'meeting', translationVi: 'Cuộc họp', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-foundation-l1-s2' },
      { id: 'en-toeic-foundation-l1-v3', term: 'deadline', translationVi: 'Hạn chót', partOfSpeech: 'noun' },
      { id: 'en-toeic-foundation-l1-v4', term: 'schedule', translationVi: 'Lịch trình', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-foundation-l1-s3' },
      { id: 'en-toeic-foundation-l1-v5', term: 'department', translationVi: 'Phòng ban', partOfSpeech: 'noun' },
    ],
    sentences: [
      { id: 'en-toeic-foundation-l1-s1', text: 'I will discuss the project with my colleague.', translationVi: 'Tôi sẽ bàn về dự án với đồng nghiệp của mình.' },
      { id: 'en-toeic-foundation-l1-s2', text: 'The meeting starts at nine o\'clock.', translationVi: 'Cuộc họp bắt đầu lúc 9 giờ.' },
      { id: 'en-toeic-foundation-l1-s3', text: 'Please check the schedule before you leave.', translationVi: 'Vui lòng kiểm tra lịch trình trước khi bạn rời đi.' },
    ],
    exercises: [
      {
        id: 'en-toeic-foundation-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'deadline'.",
        question: 'deadline',
        options: ['Đồng nghiệp', 'Hạn chót', 'Phòng ban', 'Lịch trình'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-toeic-foundation-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'The ___ starts at nine o\'clock.',
        wordBank: ['meeting', 'deadline', 'department'],
        correctAnswer: 'meeting',
      },
      {
        id: 'en-toeic-foundation-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['the', 'schedule', 'check', 'please'],
        correctOrder: ['please', 'check', 'the', 'schedule'],
      },
    ],
  },
];

export const englishToeicFoundationPack: ContentPack = { course, units, lessons };
