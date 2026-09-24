import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for JLPT N3 — NOT a full JLPT curriculum. See n5.ts for rationale. */
const course: Course = {
  id: 'ja-jlpt-n3',
  languageCode: 'ja',
  trackId: 'jlpt',
  level: 'N3',
  titleVi: 'JLPT N3 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu N3: ngữ pháp diễn đạt lý do ～ので thường gặp ở trình độ trung cấp. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề JLPT đầy đủ.',
  unitIds: ['ja-jlpt-n3-u1-reason-grammar'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ja-jlpt-n3-u1-reason-grammar',
    courseId: 'ja-jlpt-n3',
    title: '理由の表現',
    titleVi: 'Ngữ pháp diễn đạt lý do',
    descriptionVi: 'Cấu trúc ngữ pháp diễn đạt lý do/nguyên nhân với ～ので, thường gặp ở cấp N3.',
    lessonIds: ['ja-jlpt-n3-l1-reason-grammar'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ja-jlpt-n3-l1-reason-grammar',
    unitId: 'ja-jlpt-n3-u1-reason-grammar',
    title: '～ので の使い方',
    titleVi: 'Cách dùng ～ので',
    objectiveVi: 'Sử dụng cấu trúc ～ので để diễn đạt lý do một cách lịch sự, khách quan hơn so với ～から.',
    estimatedMinutes: 8,
    examSkill: 'language-knowledge',
    grammarNoteVi:
      "'～ので' diễn đạt lý do một cách nhẹ nhàng, khách quan hơn '～から', thường dùng trong văn viết hoặc khi xin phép/giải thích lịch sự: '雨が降ったので、家にいました' (Vì trời mưa nên tôi đã ở nhà).",
    vocabulary: [
      { id: 'ja-jlpt-n3-l1-v1', term: '理由', translationVi: 'Lý do', partOfSpeech: 'noun', usageNoteVi: 'Đọc: riyuu' },
      { id: 'ja-jlpt-n3-l1-v2', term: '忙しい', translationVi: 'Bận rộn', partOfSpeech: 'adjective', exampleSentenceId: 'ja-jlpt-n3-l1-s1', usageNoteVi: 'Đọc: isogashii' },
      { id: 'ja-jlpt-n3-l1-v3', term: '遅れる', translationVi: 'Trễ, muộn', partOfSpeech: 'verb', exampleSentenceId: 'ja-jlpt-n3-l1-s2', usageNoteVi: 'Đọc: okureru' },
      { id: 'ja-jlpt-n3-l1-v4', term: '疲れる', translationVi: 'Mệt mỏi', partOfSpeech: 'verb', exampleSentenceId: 'ja-jlpt-n3-l1-s3', usageNoteVi: 'Đọc: tsukareru' },
      { id: 'ja-jlpt-n3-l1-v5', term: '渋滞', translationVi: 'Kẹt xe', partOfSpeech: 'noun', usageNoteVi: 'Đọc: juutai' },
    ],
    sentences: [
      { id: 'ja-jlpt-n3-l1-s1', text: '忙しかったので、電話できませんでした。', translationVi: 'Vì bận nên tôi đã không gọi điện được.' },
      { id: 'ja-jlpt-n3-l1-s2', text: '渋滞していたので、遅れました。', translationVi: 'Vì kẹt xe nên tôi đã đến trễ.' },
      { id: 'ja-jlpt-n3-l1-s3', text: '疲れたので、早く寝ました。', translationVi: 'Vì mệt nên tôi đã đi ngủ sớm.' },
    ],
    exercises: [
      {
        id: 'ja-jlpt-n3-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn cách diễn đạt lý do đúng.',
        question: '渋滞していた___、遅れました。',
        options: ['ので', 'のに', 'まで', 'けど'],
        correctOptionIndex: 0,
      },
      {
        id: 'ja-jlpt-n3-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '___ので、早く寝ました。',
        wordBank: ['疲れた', '忙しかった', '理由'],
        correctAnswer: '疲れた',
      },
      {
        id: 'ja-jlpt-n3-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '渋滞'.",
        question: '渋滞',
        options: ['Mệt mỏi', 'Bận rộn', 'Kẹt xe', 'Trễ giờ'],
        correctOptionIndex: 2,
      },
    ],
  },
];

export const japaneseJlptN3Pack: ContentPack = { course, units, lessons };
