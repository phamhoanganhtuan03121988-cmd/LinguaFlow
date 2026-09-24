import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for the JLPT track — NOT a full JLPT curriculum. */
const course: Course = {
  id: 'ja-jlpt-n5',
  languageCode: 'ja',
  trackId: 'jlpt',
  level: 'N5',
  titleVi: 'JLPT N5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho lộ trình JLPT: từ vựng chào hỏi cơ bản (N5). Đây là nội dung luyện tập tham khảo, chưa phải bộ đề JLPT đầy đủ.',
  unitIds: ['ja-jlpt-n5-u1-basic-greetings'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ja-jlpt-n5-u1-basic-greetings',
    courseId: 'ja-jlpt-n5',
    title: '基本のあいさつ',
    titleVi: 'Chào hỏi cơ bản',
    descriptionVi: 'Từ vựng chào hỏi và giới thiệu bản thân cơ bản ở cấp N5.',
    lessonIds: ['ja-jlpt-n5-l1-basic-greetings'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ja-jlpt-n5-l1-basic-greetings',
    unitId: 'ja-jlpt-n5-u1-basic-greetings',
    title: '基本のあいさつ',
    titleVi: 'Chào hỏi cơ bản',
    objectiveVi: 'Nhận biết và sử dụng các từ chào hỏi cơ bản thường gặp trong đề thi N5.',
    estimatedMinutes: 6,
    examSkill: 'language-knowledge',
    grammarNoteVi: 'N5 là cấp độ dễ nhất của JLPT, tập trung vào từ vựng và ngữ pháp giao tiếp cơ bản nhất.',
    vocabulary: [
      { id: 'ja-jlpt-n5-l1-v1', term: 'こんにちは', translationVi: 'Xin chào', partOfSpeech: 'greeting', exampleSentenceId: 'ja-jlpt-n5-l1-s1', usageNoteVi: 'Đọc: konnichiwa' },
      { id: 'ja-jlpt-n5-l1-v2', term: 'ありがとう', translationVi: 'Cảm ơn', partOfSpeech: 'phrase', exampleSentenceId: 'ja-jlpt-n5-l1-s2', usageNoteVi: 'Đọc: arigatou' },
      { id: 'ja-jlpt-n5-l1-v3', term: 'さようなら', translationVi: 'Tạm biệt', partOfSpeech: 'phrase', usageNoteVi: 'Đọc: sayounara' },
      { id: 'ja-jlpt-n5-l1-v4', term: '名前', translationVi: 'Tên', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n5-l1-s3', usageNoteVi: 'Đọc: namae' },
      { id: 'ja-jlpt-n5-l1-v5', term: '友達', translationVi: 'Bạn bè', partOfSpeech: 'noun', usageNoteVi: 'Đọc: tomodachi' },
    ],
    sentences: [
      { id: 'ja-jlpt-n5-l1-s1', text: 'こんにちは、はじめまして。', translationVi: 'Xin chào, rất vui được gặp bạn.' },
      { id: 'ja-jlpt-n5-l1-s2', text: 'ありがとうございます。', translationVi: 'Cảm ơn bạn rất nhiều.' },
      { id: 'ja-jlpt-n5-l1-s3', text: '私の名前は田中です。', translationVi: 'Tên tôi là Tanaka.' },
    ],
    exercises: [
      {
        id: 'ja-jlpt-n5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'ありがとう'.",
        question: 'ありがとう',
        options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Bạn bè'],
        correctOptionIndex: 1,
      },
      {
        id: 'ja-jlpt-n5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '私の___は田中です。',
        wordBank: ['名前', '友達', 'こんにちは'],
        correctAnswer: '名前',
      },
      {
        id: 'ja-jlpt-n5-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '友達'.",
        question: '友達',
        options: ['Tạm biệt', 'Cảm ơn', 'Bạn bè', 'Tên'],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const japaneseJlptN5Pack: ContentPack = { course, units, lessons };
