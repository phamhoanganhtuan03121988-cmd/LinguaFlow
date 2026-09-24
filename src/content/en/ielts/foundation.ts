import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for the IELTS track — NOT a full IELTS curriculum. */
const course: Course = {
  id: 'en-ielts-foundation',
  languageCode: 'en',
  trackId: 'ielts',
  level: 'foundation',
  titleVi: 'IELTS Foundation — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho lộ trình IELTS: từ nối ý cơ bản cho Writing/Speaking. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề IELTS đầy đủ.',
  unitIds: ['en-ielts-foundation-u1-linking-basics'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-ielts-foundation-u1-linking-basics',
    courseId: 'en-ielts-foundation',
    title: 'Linking Words Basics',
    titleVi: 'Từ nối cơ bản',
    descriptionVi: 'Các từ nối cơ bản để liên kết ý tưởng khi viết hoặc nói.',
    lessonIds: ['en-ielts-foundation-l1-linking-words'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-ielts-foundation-l1-linking-words',
    unitId: 'en-ielts-foundation-u1-linking-basics',
    title: 'Basic linking words',
    titleVi: 'Từ nối cơ bản',
    objectiveVi: 'Sử dụng các từ nối cơ bản (and, but, because, so) để liên kết ý tưởng mạch lạc hơn.',
    estimatedMinutes: 6,
    examSkill: 'writing',
    grammarNoteVi: "Từ nối giúp bài viết/nói mạch lạc hơn — một tiêu chí chấm điểm quan trọng trong IELTS Writing và Speaking.",
    vocabulary: [
      { id: 'en-ielts-foundation-l1-v1', term: 'because', translationVi: 'Bởi vì', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-foundation-l1-s1' },
      { id: 'en-ielts-foundation-l1-v2', term: 'however', translationVi: 'Tuy nhiên', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-foundation-l1-s2' },
      { id: 'en-ielts-foundation-l1-v3', term: 'in addition', translationVi: 'Thêm vào đó', partOfSpeech: 'phrase' },
      { id: 'en-ielts-foundation-l1-v4', term: 'therefore', translationVi: 'Vì vậy', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-foundation-l1-s3' },
      { id: 'en-ielts-foundation-l1-v5', term: 'for example', translationVi: 'Ví dụ như', partOfSpeech: 'phrase' },
    ],
    sentences: [
      { id: 'en-ielts-foundation-l1-s1', text: 'I stayed home because it was raining.', translationVi: 'Tôi ở nhà vì trời mưa.' },
      { id: 'en-ielts-foundation-l1-s2', text: 'The plan was good. However, it was too expensive.', translationVi: 'Kế hoạch khá tốt. Tuy nhiên, nó quá đắt.' },
      { id: 'en-ielts-foundation-l1-s3', text: 'She studied hard; therefore, she passed the exam.', translationVi: 'Cô ấy học chăm chỉ; vì vậy, cô ấy đã đỗ kỳ thi.' },
    ],
    exercises: [
      {
        id: 'en-ielts-foundation-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn từ nối phù hợp.',
        question: 'I stayed home ___ it was raining.',
        options: ['however', 'because', 'in addition', 'for example'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-ielts-foundation-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'She studied hard; ___, she passed the exam.',
        wordBank: ['therefore', 'because', 'however'],
        correctAnswer: 'therefore',
      },
      {
        id: 'en-ielts-foundation-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'however'.",
        question: 'however',
        options: ['Vì vậy', 'Tuy nhiên', 'Ví dụ như', 'Thêm vào đó'],
        correctOptionIndex: 1,
      },
    ],
  },
];

export const englishIeltsFoundationPack: ContentPack = { course, units, lessons };
