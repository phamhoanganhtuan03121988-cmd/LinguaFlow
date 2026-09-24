import type { ContentPack, Course, Lesson, Unit } from '../../types';

/** Phase 10 proof-of-architecture sample for HSK 4 — NOT a full HSK curriculum. See 1.ts for rationale. */
const course: Course = {
  id: 'zh-hsk-4',
  languageCode: 'zh',
  trackId: 'hsk',
  level: '4',
  titleVi: 'HSK 4 — Mẫu',
  descriptionVi:
    'Mẫu nội dung mục tiêu HSK 4: cấu trúc câu chữ 把 (bǎ) thường gặp ở trình độ trung cấp. Đây là nội dung luyện tập tham khảo, chưa phải bộ đề HSK đầy đủ.',
  unitIds: ['zh-hsk-4-u1-ba-structure'],
  isSample: true,
};

const units: Unit[] = [
  {
    id: 'zh-hsk-4-u1-ba-structure',
    courseId: 'zh-hsk-4',
    title: '把字句',
    titleVi: 'Câu chữ 把',
    descriptionVi: 'Cấu trúc câu chữ 把 (bǎ) diễn đạt việc xử lý một đối tượng cụ thể, thường gặp ở HSK 4.',
    lessonIds: ['zh-hsk-4-l1-ba-structure'],
  },
];

const lessons: Lesson[] = [
  {
    id: 'zh-hsk-4-l1-ba-structure',
    unitId: 'zh-hsk-4-u1-ba-structure',
    title: '把字句结构',
    titleVi: 'Cấu trúc câu chữ 把',
    objectiveVi: 'Sử dụng cấu trúc "把 + tân ngữ + động từ" để diễn đạt việc xử lý một đối tượng cụ thể.',
    estimatedMinutes: 8,
    examSkill: 'grammar',
    grammarNoteVi:
      "Cấu trúc 把 nhấn mạnh kết quả tác động lên một đối tượng xác định: '我把书放在桌子上' (Tôi đặt cuốn sách lên bàn). Động từ sau 把 thường cần bổ ngữ đi kèm.",
    vocabulary: [
      { id: 'zh-hsk-4-l1-v1', term: '把', translationVi: 'Đem, lấy (giới từ xử trí)', partOfSpeech: 'phrase', usageNoteVi: 'Pinyin: bǎ' },
      { id: 'zh-hsk-4-l1-v2', term: '放', translationVi: 'Đặt, để', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-4-l1-s1', usageNoteVi: 'Pinyin: fàng' },
      { id: 'zh-hsk-4-l1-v3', term: '完成', translationVi: 'Hoàn thành', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-4-l1-s2', usageNoteVi: 'Pinyin: wánchéng' },
      { id: 'zh-hsk-4-l1-v4', term: '打扫', translationVi: 'Dọn dẹp', partOfSpeech: 'verb', exampleSentenceId: 'zh-hsk-4-l1-s3', usageNoteVi: 'Pinyin: dǎsǎo' },
      { id: 'zh-hsk-4-l1-v5', term: '桌子', translationVi: 'Cái bàn', partOfSpeech: 'noun', usageNoteVi: 'Pinyin: zhuōzi' },
    ],
    sentences: [
      { id: 'zh-hsk-4-l1-s1', text: '我把书放在桌子上。', translationVi: 'Tôi đặt cuốn sách lên bàn.' },
      { id: 'zh-hsk-4-l1-s2', text: '他把作业完成了。', translationVi: 'Anh ấy đã hoàn thành bài tập.' },
      { id: 'zh-hsk-4-l1-s3', text: '我们把房间打扫干净了。', translationVi: 'Chúng tôi đã dọn dẹp sạch sẽ căn phòng.' },
    ],
    exercises: [
      {
        id: 'zh-hsk-4-l1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn câu đúng cấu trúc 把.',
        question: 'Choose the correct sentence.',
        options: ['我书把放在桌子上。', '我把书放在桌子上。', '把我书放在桌子上。', '我放把书桌子上。'],
        correctOptionIndex: 1,
      },
      {
        id: 'zh-hsk-4-l1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '他把作业___了。',
        wordBank: ['完成', '打扫', '桌子'],
        correctAnswer: '完成',
      },
      {
        id: 'zh-hsk-4-l1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '打扫'.",
        question: '打扫',
        options: ['Hoàn thành', 'Dọn dẹp', 'Đặt, để', 'Cái bàn'],
        correctOptionIndex: 1,
      },
    ],
  },
];

export const chineseHsk4Pack: ContentPack = { course, units, lessons };
