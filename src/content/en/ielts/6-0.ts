import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for IELTS Band 6.0 — NOT a full IELTS curriculum. See foundation.ts for rationale. */
const course: Course = {
  id: 'en-ielts-6-0',
  languageCode: 'en',
  trackId: 'ielts',
  level: '6.0',
  titleVi: 'IELTS Band 6.0 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu Band 6.0: cấu trúc câu nêu quan điểm cho bài luận Writing Task 2. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề IELTS đầy đủ.',
  unitIds: ['en-ielts-6-0-u1-opinion-essays'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'en-ielts-6-0-u1-opinion-essays',
    courseId: 'en-ielts-6-0',
    title: 'Opinion Essays',
    titleVi: 'Bài luận nêu quan điểm',
    descriptionVi: 'Cấu trúc câu và từ vựng để nêu quan điểm cá nhân trong Writing Task 2.',
    lessonIds: ['en-ielts-6-0-l1-stating-opinions'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'en-ielts-6-0-l1-stating-opinions',
    unitId: 'en-ielts-6-0-u1-opinion-essays',
    title: 'Stating opinions clearly',
    titleVi: 'Nêu quan điểm rõ ràng',
    objectiveVi: 'Sử dụng cấu trúc nêu quan điểm học thuật phù hợp cho bài luận IELTS Writing Task 2.',
    estimatedMinutes: 8,
    examSkill: 'writing',
    grammarNoteVi:
      "Trong văn phong học thuật, nên dùng 'It is widely believed that...' hoặc 'This essay will argue that...' thay vì 'I think' lặp lại nhiều lần.",
    vocabulary: [
      { id: 'en-ielts-6-0-l1-v1', term: 'argue', translationVi: 'Lập luận, cho rằng', partOfSpeech: 'verb', exampleSentenceId: 'en-ielts-6-0-l1-s1' },
      { id: 'en-ielts-6-0-l1-v2', term: 'widely believed', translationVi: 'Được cho là phổ biến', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-6-0-l1-s2' },
      { id: 'en-ielts-6-0-l1-v3', term: 'on the other hand', translationVi: 'Mặt khác', partOfSpeech: 'phrase' },
      { id: 'en-ielts-6-0-l1-v4', term: 'in conclusion', translationVi: 'Tóm lại', partOfSpeech: 'phrase', exampleSentenceId: 'en-ielts-6-0-l1-s3' },
      { id: 'en-ielts-6-0-l1-v5', term: 'perspective', translationVi: 'Góc nhìn, quan điểm', partOfSpeech: 'noun' },
    ],
    sentences: [
      { id: 'en-ielts-6-0-l1-s1', text: 'This essay will argue that remote work benefits employees.', translationVi: 'Bài luận này sẽ lập luận rằng làm việc từ xa mang lại lợi ích cho nhân viên.' },
      { id: 'en-ielts-6-0-l1-s2', text: 'It is widely believed that technology improves education.', translationVi: 'Người ta tin rằng công nghệ cải thiện giáo dục.' },
      { id: 'en-ielts-6-0-l1-s3', text: 'In conclusion, both sides have valid points.', translationVi: 'Tóm lại, cả hai phía đều có luận điểm hợp lý.' },
    ],
    exercises: [
      {
        id: 'en-ielts-6-0-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn cách mở đầu phù hợp cho bài luận học thuật.',
        question: 'Choose the most academic opening.',
        options: ['I think remote work is good.', 'This essay will argue that remote work benefits employees.', 'Remote work good for me.', 'My opinion remote work.'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-ielts-6-0-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền cụm từ còn thiếu.',
        sentenceTemplate: '___, both sides have valid points.',
        wordBank: ['In conclusion', 'On the other hand', 'Widely believed'],
        correctAnswer: 'In conclusion',
      },
      {
        id: 'en-ielts-6-0-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'perspective'.",
        question: 'perspective',
        options: ['Kết luận', 'Góc nhìn, quan điểm', 'Lập luận', 'Mặt khác'],
        correctOptionIndex: 1,
      },
    ],
  },
];

export const englishIelts60Pack: ContentPack = { course, units, lessons };
