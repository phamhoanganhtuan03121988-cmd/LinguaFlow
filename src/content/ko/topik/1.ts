import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for the TOPIK track — NOT a full TOPIK curriculum. */
const course: Course = {
  id: 'ko-topik-1',
  languageCode: 'ko',
  trackId: 'topik',
  level: '1',
  titleVi: 'TOPIK 1 — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho lộ trình TOPIK: từ vựng sinh hoạt cơ bản (TOPIK I). Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOPIK đầy đủ.',
  unitIds: ['ko-topik-1-u1-daily-basics'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ko-topik-1-u1-daily-basics',
    courseId: 'ko-topik-1',
    title: '일상 기초 어휘',
    titleVi: 'Từ vựng sinh hoạt cơ bản',
    descriptionVi: 'Từ vựng sinh hoạt hằng ngày thường gặp ở cấp TOPIK 1.',
    lessonIds: ['ko-topik-1-l1-daily-basics'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ko-topik-1-l1-daily-basics',
    unitId: 'ko-topik-1-u1-daily-basics',
    title: '일상 어휘',
    titleVi: 'Từ vựng sinh hoạt',
    objectiveVi: 'Nhận biết các từ vựng sinh hoạt cơ bản thường xuất hiện ở cấp TOPIK 1.',
    estimatedMinutes: 6,
    examSkill: 'vocabulary',
    grammarNoteVi: 'TOPIK I (cấp 1–2) tập trung vào từ vựng và ngữ pháp giao tiếp cơ bản trong đời sống hằng ngày.',
    vocabulary: [
      { id: 'ko-topik-1-l1-v1', term: '학교', translationVi: 'Trường học', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-1-l1-s1', usageNoteVi: 'Cách đọc: hakgyo' },
      { id: 'ko-topik-1-l1-v2', term: '친구', translationVi: 'Bạn bè', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-1-l1-s2', usageNoteVi: 'Cách đọc: chingu' },
      { id: 'ko-topik-1-l1-v3', term: '음식', translationVi: 'Thức ăn', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: eumsik' },
      { id: 'ko-topik-1-l1-v4', term: '시간', translationVi: 'Thời gian', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-1-l1-s3', usageNoteVi: 'Cách đọc: sigan' },
      { id: 'ko-topik-1-l1-v5', term: '버스', translationVi: 'Xe buýt', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: beoseu' },
    ],
    sentences: [
      { id: 'ko-topik-1-l1-s1', text: '저는 학교에 가요.', translationVi: 'Tôi đi đến trường học.' },
      { id: 'ko-topik-1-l1-s2', text: '친구를 만나요.', translationVi: 'Tôi gặp bạn bè.' },
      { id: 'ko-topik-1-l1-s3', text: '시간이 없어요.', translationVi: 'Tôi không có thời gian.' },
    ],
    exercises: [
      {
        id: 'ko-topik-1-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '친구'.",
        question: '친구',
        options: ['Trường học', 'Bạn bè', 'Thức ăn', 'Xe buýt'],
        correctOptionIndex: 1,
      },
      {
        id: 'ko-topik-1-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '저는 ___에 가요.',
        wordBank: ['학교', '음식', '버스'],
        correctAnswer: '학교',
      },
      {
        id: 'ko-topik-1-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '시간'.",
        question: '시간',
        options: ['Thời gian', 'Bạn bè', 'Xe buýt', 'Thức ăn'],
        correctOptionIndex: 0,
      },
    ],
  },
];

export const koreanTopik1Pack: ContentPack = { course, units, lessons };
