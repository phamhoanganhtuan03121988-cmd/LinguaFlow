import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for IELTS Band 7.5 — NOT a full IELTS curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-ielts-7-5',
  languageCode: 'en',
  trackId: 'ielts',
  level: '7.5',
  titleVi: 'IELTS Band 7.5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu Band 7.5: từ vựng học thuật và cách phản biện nâng cao cho IELTS Writing Task 2 band cao. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề IELTS đầy đủ.',
  unitIds: ['en-ielts-7-5-u1-advanced-argumentation'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-ielts-7-5-u1-advanced-argumentation',
    courseId: 'en-ielts-7-5',
    title: 'Advanced Argumentation',
    titleVi: 'Lập luận học thuật nâng cao',
    descriptionVi: 'Từ vựng học thuật và cấu trúc phản biện dùng trong bài luận IELTS Writing Task 2 điểm cao.',
    lessonIds: ['en-ielts-7-5-l1-advanced-argumentation'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-ielts-7-5-l1-advanced-argumentation',
    unitId: 'en-ielts-7-5-u1-advanced-argumentation',
    title: 'Building a nuanced argument',
    titleVi: 'Xây dựng lập luận có chiều sâu',
    objectiveVi: 'Sử dụng từ vựng học thuật và cấu trúc phản biện để nâng cao chất lượng lập luận trong IELTS Writing Task 2.',
    estimatedMinutes: 9,
    examSkill: 'writing',
    grammarNoteVi:
      "Ở band điểm cao, bài luận cần thể hiện lập luận có chiều sâu (nuanced), không chỉ nêu ý kiến một chiều mà còn dự đoán và phản biện lại quan điểm đối lập (counterargument).",
    vocabulary: [
      { id: 'en-ielts-7-5-l1-v1', term: 'nuanced', translationVi: 'Có chiều sâu, tinh tế', partOfSpeech: 'adjective', exampleSentenceId: 'en-ielts-7-5-l1-s1' },
      { id: 'en-ielts-7-5-l1-v2', term: 'counterargument', translationVi: 'Lập luận phản bác', partOfSpeech: 'noun', exampleSentenceId: 'en-ielts-7-5-l1-s2' },
      { id: 'en-ielts-7-5-l1-v3', term: 'substantiate', translationVi: 'Chứng minh, củng cố (lập luận)', partOfSpeech: 'verb', exampleSentenceId: 'en-ielts-7-5-l1-s3' },
      { id: 'en-ielts-7-5-l1-v4', term: 'overarching', translationVi: 'Bao trùm, tổng thể', partOfSpeech: 'adjective' },
      { id: 'en-ielts-7-5-l1-v5', term: 'refute', translationVi: 'Bác bỏ', partOfSpeech: 'verb' },
    ],
    sentences: [
      { id: 'en-ielts-7-5-l1-s1', text: 'A nuanced perspective acknowledges both the benefits and the drawbacks.', translationVi: 'Một góc nhìn có chiều sâu sẽ thừa nhận cả lợi ích lẫn hạn chế.' },
      { id: 'en-ielts-7-5-l1-s2', text: 'Critics might raise the counterargument that regulation stifles innovation.', translationVi: 'Những người phản đối có thể đưa ra lập luận phản bác rằng quy định làm kìm hãm sự đổi mới.' },
      { id: 'en-ielts-7-5-l1-s3', text: 'This claim is substantiated by recent economic data.', translationVi: 'Luận điểm này được củng cố bởi dữ liệu kinh tế gần đây.' },
    ],
    exercises: [
      {
        id: 'en-ielts-7-5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'counterargument'.",
        question: 'counterargument',
        options: ['Lập luận phản bác', 'Bằng chứng', 'Kết luận', 'Quan điểm cá nhân'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-ielts-7-5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'This claim is ___ by recent economic data.',
        wordBank: ['substantiated', 'refuted', 'overarching'],
        correctAnswer: 'substantiated',
      },
      {
        id: 'en-ielts-7-5-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['acknowledges', 'a nuanced perspective', 'both the benefits and the drawbacks'],
        correctOrder: ['a nuanced perspective', 'acknowledges', 'both the benefits and the drawbacks'],
      },
    ],
  },
];

export const englishIelts75Pack: ContentPack = { course, units, lessons };
