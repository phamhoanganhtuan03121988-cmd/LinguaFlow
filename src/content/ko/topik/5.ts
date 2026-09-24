import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 Milestone 3 proof-of-architecture sample for TOPIK 5 (TOPIK II) — NOT a full TOPIK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'ko-topik-5',
  languageCode: 'ko',
  trackId: 'topik',
  level: '5',
  titleVi: 'TOPIK 5 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu TOPIK 5 (TOPIK II): từ vựng học thuật cho đọc hiểu văn bản nâng cao. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề TOPIK đầy đủ.',
  unitIds: ['ko-topik-5-u1-academic-reading'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'ko-topik-5-u1-academic-reading',
    courseId: 'ko-topik-5',
    title: '학술 읽기',
    titleVi: 'Đọc hiểu học thuật',
    descriptionVi: 'Từ vựng học thuật thường gặp trong văn bản nghiên cứu, báo cáo ở cấp TOPIK 5.',
    lessonIds: ['ko-topik-5-l1-academic-reading'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'ko-topik-5-l1-academic-reading',
    unitId: 'ko-topik-5-u1-academic-reading',
    title: '학술 어휘',
    titleVi: 'Từ vựng học thuật',
    objectiveVi: 'Nhận biết từ vựng học thuật thường gặp trong văn bản nghiên cứu, báo cáo ở đề thi TOPIK II nâng cao.',
    estimatedMinutes: 8,
    examSkill: 'reading',
    grammarNoteVi:
      "Văn bản đọc hiểu TOPIK II nâng cao thường dùng thể văn viết trang trọng (-다) và từ vựng học thuật như 연구, 조사, 분석.",
    vocabulary: [
      { id: 'ko-topik-5-l1-v1', term: '연구', translationVi: 'Nghiên cứu', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-5-l1-s1', usageNoteVi: 'Cách đọc: yeongu' },
      { id: 'ko-topik-5-l1-v2', term: '조사', translationVi: 'Khảo sát, điều tra', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-5-l1-s1', usageNoteVi: 'Cách đọc: josa' },
      { id: 'ko-topik-5-l1-v3', term: '분석하다', translationVi: 'Phân tích', partOfSpeech: 'verb', exampleSentenceId: 'ko-topik-5-l1-s2', usageNoteVi: 'Cách đọc: bunseokhada' },
      { id: 'ko-topik-5-l1-v4', term: '결론', translationVi: 'Kết luận', partOfSpeech: 'noun', exampleSentenceId: 'ko-topik-5-l1-s3', usageNoteVi: 'Cách đọc: gyeollon' },
      { id: 'ko-topik-5-l1-v5', term: '자료', translationVi: 'Tư liệu, dữ liệu', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: jaryo' },
    ],
    sentences: [
      { id: 'ko-topik-5-l1-s1', text: '이 연구는 청소년의 수면 습관을 조사했다.', translationVi: 'Nghiên cứu này đã khảo sát thói quen ngủ của thanh thiếu niên.' },
      { id: 'ko-topik-5-l1-s2', text: '연구팀은 수집된 자료를 분석했다.', translationVi: 'Nhóm nghiên cứu đã phân tích dữ liệu đã thu thập.' },
      { id: 'ko-topik-5-l1-s3', text: '이 보고서의 결론은 다음과 같다.', translationVi: 'Kết luận của báo cáo này như sau.' },
    ],
    exercises: [
      {
        id: 'ko-topik-5-l1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '분석하다'.",
        question: '분석하다',
        options: ['Phân tích', 'Khảo sát', 'Kết luận', 'Nghiên cứu'],
        correctOptionIndex: 0,
      },
      {
        id: 'ko-topik-5-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '이 보고서의 ___은 다음과 같다.',
        wordBank: ['결론', '자료', '조사'],
        correctAnswer: '결론',
      },
      {
        id: 'ko-topik-5-l1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Nhóm nghiên cứu đã phân tích dữ liệu đã thu thập."',
        words: ['분석했다', '연구팀은', '수집된 자료를'],
        correctOrder: ['연구팀은', '수집된 자료를', '분석했다'],
      },
    ],
  },
];

export const koreanTopik5Pack: ContentPack = { course, units, lessons };
