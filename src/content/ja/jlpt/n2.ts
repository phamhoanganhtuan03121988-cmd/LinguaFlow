import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for JLPT N2 — NOT a full JLPT curriculum. See n5.ts for rationale. */
const course: Course = {
  id: 'ja-jlpt-n2',
  languageCode: 'ja',
  trackId: 'jlpt',
  level: 'N2',
  titleVi: 'JLPT N2 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu N2: ngữ pháp nhượng bộ ～にもかかわらず thường gặp trong đọc hiểu N2. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề JLPT đầy đủ.',
  unitIds: ['ja-jlpt-n2-u1-concession-grammar'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ja-jlpt-n2-u1-concession-grammar',
    courseId: 'ja-jlpt-n2',
    title: '譲歩の表現',
    titleVi: 'Ngữ pháp nhượng bộ',
    descriptionVi: 'Cấu trúc ngữ pháp nhượng bộ ～にもかかわらず, thường gặp trong bài đọc hiểu ở cấp N2.',
    lessonIds: ['ja-jlpt-n2-l1-concession-grammar'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ja-jlpt-n2-l1-concession-grammar',
    unitId: 'ja-jlpt-n2-u1-concession-grammar',
    title: '～にもかかわらず の使い方',
    titleVi: 'Cách dùng ～にもかかわらず',
    objectiveVi: 'Sử dụng cấu trúc ～にもかかわらず để diễn đạt sự nhượng bộ trang trọng, thường gặp trong văn viết N2.',
    estimatedMinutes: 8,
    examSkill: 'reading',
    grammarNoteVi:
      "'～にもかかわらず' (mặc dù, bất chấp) trang trọng hơn ～のに, thường dùng trong văn viết/bài báo: '努力したにもかかわらず、結果は予想に反した' (Mặc dù đã nỗ lực, kết quả vẫn trái với dự đoán).",
    vocabulary: [
      { id: 'ja-jlpt-n2-l1-v1', term: '～にもかかわらず', translationVi: 'Mặc dù, bất chấp', partOfSpeech: 'phrase', exampleSentenceId: 'ja-jlpt-n2-l1-s1', usageNoteVi: 'Đọc: ~ni mo kakawarazu' },
      { id: 'ja-jlpt-n2-l1-v2', term: '努力', translationVi: 'Nỗ lực', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n2-l1-s1', usageNoteVi: 'Đọc: doryoku' },
      { id: 'ja-jlpt-n2-l1-v3', term: '予想', translationVi: 'Dự đoán', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n2-l1-s1', usageNoteVi: 'Đọc: yosou' },
      { id: 'ja-jlpt-n2-l1-v4', term: '反する', translationVi: 'Trái ngược, đi ngược lại', partOfSpeech: 'verb', exampleSentenceId: 'ja-jlpt-n2-l1-s1', usageNoteVi: 'Đọc: hansuru' },
      { id: 'ja-jlpt-n2-l1-v5', term: '悪天候', translationVi: 'Thời tiết xấu', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n2-l1-s2', usageNoteVi: 'Đọc: akutenkou' },
    ],
    sentences: [
      { id: 'ja-jlpt-n2-l1-s1', text: '努力したにもかかわらず、結果は予想に反した。', translationVi: 'Mặc dù đã nỗ lực, kết quả vẫn trái với dự đoán.' },
      { id: 'ja-jlpt-n2-l1-s2', text: '悪天候にもかかわらず、イベントは予定通り行われた。', translationVi: 'Mặc dù thời tiết xấu, sự kiện vẫn diễn ra theo đúng kế hoạch.' },
      { id: 'ja-jlpt-n2-l1-s3', text: '若いにもかかわらず、彼はとても落ち着いている。', translationVi: 'Mặc dù còn trẻ, anh ấy rất điềm tĩnh.' },
    ],
    exercises: [
      {
        id: 'ja-jlpt-n2-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng.',
        question: '努力した___、結果は予想に反した。',
        options: ['にもかかわらず', 'ので', 'ように', 'ために'],
        correctOptionIndex: 0,
      },
      {
        id: 'ja-jlpt-n2-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền cụm từ còn thiếu.',
        sentenceTemplate: '悪天候___、イベントは予定通り行われた。',
        wordBank: ['にもかかわらず', 'ために', 'のに'],
        correctAnswer: 'にもかかわらず',
      },
      {
        id: 'ja-jlpt-n2-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '反する'.",
        question: '反する',
        options: ['Trái ngược, đi ngược lại', 'Nỗ lực', 'Dự đoán', 'Thời tiết xấu'],
        correctOptionIndex: 0,
      },
    ],
  },
];

export const japaneseJlptN2Pack: ContentPack = { course, units, lessons };
