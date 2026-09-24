import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for JLPT N1 — NOT a full JLPT curriculum. See n5.ts for rationale. */
const course: Course = {
  id: 'ja-jlpt-n1',
  languageCode: 'ja',
  trackId: 'jlpt',
  level: 'N1',
  titleVi: 'JLPT N1 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu N1: ngữ pháp trang trọng ～を余儀なくされる thường gặp trong 言語知識 (kiến thức ngôn ngữ) ở cấp N1. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề JLPT đầy đủ.',
  unitIds: ['ja-jlpt-n1-u1-formal-grammar'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ja-jlpt-n1-u1-formal-grammar',
    courseId: 'ja-jlpt-n1',
    title: '硬い表現',
    titleVi: 'Ngữ pháp trang trọng nâng cao',
    descriptionVi: 'Cấu trúc ngữ pháp trang trọng ～を余儀なくされる, thường gặp trong văn viết/phát biểu chính thức ở cấp N1.',
    lessonIds: ['ja-jlpt-n1-l1-formal-grammar'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ja-jlpt-n1-l1-formal-grammar',
    unitId: 'ja-jlpt-n1-u1-formal-grammar',
    title: '～を余儀なくされる の使い方',
    titleVi: 'Cách dùng ～を余儀なくされる',
    objectiveVi: 'Nhận biết và sử dụng cấu trúc trang trọng ～を余儀なくされる để diễn đạt việc bị buộc phải làm gì do hoàn cảnh khách quan.',
    estimatedMinutes: 9,
    examSkill: 'language-knowledge',
    grammarNoteVi:
      "'～を余儀なくされる' (bị buộc phải..., không thể tránh khỏi việc...) là cách diễn đạt rất trang trọng, thường dùng trong văn viết học thuật/báo chí: '会社は工場の閉鎖を余儀なくされた' (Công ty đã buộc phải đóng cửa nhà máy).",
    vocabulary: [
      { id: 'ja-jlpt-n1-l1-v1', term: '～を余儀なくされる', translationVi: 'Bị buộc phải, không thể tránh khỏi việc', partOfSpeech: 'phrase', exampleSentenceId: 'ja-jlpt-n1-l1-s1', usageNoteVi: 'Đọc: ~wo yogi naku sareru' },
      { id: 'ja-jlpt-n1-l1-v2', term: '閉鎖', translationVi: 'Đóng cửa (nhà máy, cơ sở)', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n1-l1-s1', usageNoteVi: 'Đọc: heisa' },
      { id: 'ja-jlpt-n1-l1-v3', term: '直面する', translationVi: 'Đối mặt', partOfSpeech: 'verb', exampleSentenceId: 'ja-jlpt-n1-l1-s2', usageNoteVi: 'Đọc: chokumen suru' },
      { id: 'ja-jlpt-n1-l1-v4', term: '深刻だ', translationVi: 'Nghiêm trọng, sâu sắc', partOfSpeech: 'adjective', exampleSentenceId: 'ja-jlpt-n1-l1-s2', usageNoteVi: 'Đọc: shinkoku da' },
      { id: 'ja-jlpt-n1-l1-v5', term: '課題', translationVi: 'Vấn đề, bài toán cần giải quyết', partOfSpeech: 'noun', exampleSentenceId: 'ja-jlpt-n1-l1-s3', usageNoteVi: 'Đọc: kadai' },
    ],
    sentences: [
      { id: 'ja-jlpt-n1-l1-s1', text: '会社は工場の閉鎖を余儀なくされた。', translationVi: 'Công ty đã buộc phải đóng cửa nhà máy.' },
      { id: 'ja-jlpt-n1-l1-s2', text: '深刻な人手不足に直面し、事業の縮小を余儀なくされた。', translationVi: 'Đối mặt với tình trạng thiếu nhân lực nghiêm trọng, công ty đã buộc phải thu hẹp quy mô kinh doanh.' },
      { id: 'ja-jlpt-n1-l1-s3', text: 'この課題を解決するのは容易ではない。', translationVi: 'Việc giải quyết vấn đề này không hề dễ dàng.' },
    ],
    exercises: [
      {
        id: 'ja-jlpt-n1-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng.',
        question: '会社は工場の閉鎖___。',
        options: ['を余儀なくされた', 'にもかかわらずだった', 'ようにされた', 'を認めた'],
        correctOptionIndex: 0,
      },
      {
        id: 'ja-jlpt-n1-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '深刻な人手不足に___、事業の縮小を余儀なくされた。',
        wordBank: ['直面し', '反し', '関して'],
        correctAnswer: '直面し',
      },
      {
        id: 'ja-jlpt-n1-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '課題'.",
        question: '課題',
        options: ['Vấn đề, bài toán cần giải quyết', 'Đóng cửa', 'Đối mặt', 'Nghiêm trọng'],
        correctOptionIndex: 0,
      },
    ],
  },
];

export const japaneseJlptN1Pack: ContentPack = { course, units, lessons };
