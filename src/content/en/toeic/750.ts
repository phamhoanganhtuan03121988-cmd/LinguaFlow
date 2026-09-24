import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for TOEIC 750 — NOT a full TOEIC curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-toeic-750',
  languageCode: 'en',
  trackId: 'toeic',
  level: '750',
  titleVi: 'TOEIC 750 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOEIC 750: đọc hiểu báo cáo kinh doanh với từ vựng phân tích số liệu. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOEIC đầy đủ.',
  unitIds: ['en-toeic-750-u1-business-reports'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-toeic-750-u1-business-reports',
    courseId: 'en-toeic-750',
    title: 'Business Report Reading',
    titleVi: 'Đọc hiểu báo cáo kinh doanh',
    descriptionVi: 'Từ vựng và cấu trúc câu thường gặp trong báo cáo kinh doanh, phổ biến trong TOEIC Reading.',
    lessonIds: ['en-toeic-750-l1-business-reports'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-toeic-750-l1-business-reports',
    unitId: 'en-toeic-750-u1-business-reports',
    title: 'Understanding business reports',
    titleVi: 'Đọc hiểu báo cáo kinh doanh',
    objectiveVi: 'Nhận biết từ vựng phân tích số liệu thường gặp khi đọc báo cáo kinh doanh trong đề TOEIC Reading.',
    estimatedMinutes: 8,
    examSkill: 'reading',
    grammarNoteVi:
      "Báo cáo kinh doanh thường dùng động từ chỉ xu hướng (increase, decline, remain stable) đi kèm số liệu phần trăm và mốc thời gian (quarterly, annually).",
    vocabulary: [
      { id: 'en-toeic-750-l1-v1', term: 'revenue', translationVi: 'Doanh thu', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-750-l1-s1' },
      { id: 'en-toeic-750-l1-v2', term: 'quarterly', translationVi: 'Theo quý', partOfSpeech: 'phrase', exampleSentenceId: 'en-toeic-750-l1-s1' },
      { id: 'en-toeic-750-l1-v3', term: 'decline', translationVi: 'Giảm sút', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-750-l1-s3' },
      { id: 'en-toeic-750-l1-v4', term: 'analyze', translationVi: 'Phân tích', partOfSpeech: 'verb', exampleSentenceId: 'en-toeic-750-l1-s2' },
      { id: 'en-toeic-750-l1-v5', term: 'findings', translationVi: 'Kết quả (nghiên cứu/khảo sát)', partOfSpeech: 'noun', exampleSentenceId: 'en-toeic-750-l1-s3' },
    ],
    sentences: [
      { id: 'en-toeic-750-l1-s1', text: 'Revenue increased by 10% this quarter.', translationVi: 'Doanh thu đã tăng 10% trong quý này.' },
      { id: 'en-toeic-750-l1-s2', text: 'The report analyzes last year\'s sales performance.', translationVi: 'Báo cáo phân tích hiệu suất bán hàng của năm ngoái.' },
      { id: 'en-toeic-750-l1-s3', text: 'According to the findings, customer satisfaction has declined.', translationVi: 'Theo kết quả khảo sát, mức độ hài lòng của khách hàng đã giảm sút.' },
    ],
    exercises: [
      {
        id: 'en-toeic-750-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'findings'.",
        question: 'findings',
        options: ['Doanh thu', 'Kết quả (nghiên cứu/khảo sát)', 'Phân tích', 'Giảm sút'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-toeic-750-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'The report ___ last year\'s sales performance.',
        wordBank: ['analyzes', 'declines', 'revenue'],
        correctAnswer: 'analyzes',
      },
      {
        id: 'en-toeic-750-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'quarterly'.",
        question: 'quarterly',
        options: ['Hằng năm', 'Theo quý', 'Hằng tuần', 'Hằng ngày'],
        correctOptionIndex: 1,
      },
    ],
  },
];

export const englishToeic750Pack: ContentPack = { course, units, lessons };
