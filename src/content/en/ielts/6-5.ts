import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for IELTS Band 6.5 — NOT a full IELTS curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-ielts-6-5',
  languageCode: 'en',
  trackId: 'ielts',
  level: '6.5',
  titleVi: 'IELTS Band 6.5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu Band 6.5: cách triển khai ý chi tiết cho IELTS Speaking Part 2 (cue card). Đây là nội dung luyện tập tham khảo, chưa phải bộ đề IELTS đầy đủ.',
  unitIds: ['en-ielts-6-5-u1-cue-card-speaking'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-ielts-6-5-u1-cue-card-speaking',
    courseId: 'en-ielts-6-5',
    title: 'Cue Card Speaking',
    titleVi: 'Nói theo thẻ chủ đề (cue card)',
    descriptionVi: 'Cụm từ triển khai ý chi tiết, mạch lạc cho phần thi IELTS Speaking Part 2.',
    lessonIds: ['en-ielts-6-5-l1-cue-card-speaking'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-ielts-6-5-l1-cue-card-speaking',
    unitId: 'en-ielts-6-5-u1-cue-card-speaking',
    title: 'Elaborating on a cue card topic',
    titleVi: 'Triển khai ý cho chủ đề cue card',
    objectiveVi: 'Sử dụng cụm từ triển khai ý chi tiết, mạch lạc trong bài nói 1-2 phút ở IELTS Speaking Part 2.',
    estimatedMinutes: 8,
    examSkill: 'speaking',
    grammarNoteVi:
      "IELTS Speaking Part 2 yêu cầu nói liên tục 1-2 phút theo gợi ý trên cue card — nên dùng cụm từ triển khai ý ('let me elaborate', 'in detail') để tránh ngập ngừng.",
    vocabulary: [
      { id: 'en-ielts-6-5-l1-v1', term: 'let me elaborate', translationVi: 'Để tôi nói rõ hơn', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-6-5-l1-s1' },
      { id: 'en-ielts-6-5-l1-v2', term: 'memorable', translationVi: 'Đáng nhớ', partOfSpeech: 'adjective', exampleSentenceId: 'en-ielts-6-5-l1-s2' },
      { id: 'en-ielts-6-5-l1-v3', term: 'in detail', translationVi: 'Một cách chi tiết', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-6-5-l1-s3' },
      { id: 'en-ielts-6-5-l1-v4', term: 'to begin with', translationVi: 'Trước tiên', partOfSpeech: 'phrase' },
      { id: 'en-ielts-6-5-l1-v5', term: 'what made it special', translationVi: 'Điều gì làm nó đặc biệt', partOfSpeech: 'phrase' },
    ],
    sentences: [
      { id: 'en-ielts-6-5-l1-s1', text: "I'd like to talk about a memorable trip. Let me elaborate on why it mattered to me.", translationVi: 'Tôi muốn nói về một chuyến đi đáng nhớ. Để tôi nói rõ hơn vì sao nó có ý nghĩa với tôi.' },
      { id: 'en-ielts-6-5-l1-s2', text: 'It was memorable because I met people from all over the world.', translationVi: 'Nó đáng nhớ vì tôi đã gặp những người đến từ khắp nơi trên thế giới.' },
      { id: 'en-ielts-6-5-l1-s3', text: 'Let me describe the place in detail.', translationVi: 'Để tôi miêu tả nơi đó một cách chi tiết.' },
    ],
    exercises: [
      {
        id: 'en-ielts-6-5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'memorable'.",
        question: 'memorable',
        options: ['Đáng nhớ', 'Chi tiết', 'Đặc biệt', 'Trước tiên'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-ielts-6-5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền cụm từ còn thiếu.',
        sentenceTemplate: 'Let me describe the place ___.',
        wordBank: ['in detail', 'to begin with', 'memorable'],
        correctAnswer: 'in detail',
      },
      {
        id: 'en-ielts-6-5-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['from all over the world', 'I met people', 'because'],
        correctOrder: ['because', 'I met people', 'from all over the world'],
      },
    ],
  },
];

export const englishIelts65Pack: ContentPack = { course, units, lessons };
