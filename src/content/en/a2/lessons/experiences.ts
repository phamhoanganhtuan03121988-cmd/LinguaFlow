import type { Lesson } from '../../../types';

export const englishA2ExperiencesLessons: Lesson[] = [
  {
    id: 'en-a2-l3-1-past-experiences',
    unitId: 'en-a2-u3-experiences',
    title: 'Past experiences',
    titleVi: 'Trải nghiệm trong quá khứ',
    objectiveVi: 'Kể lại một sự việc đã xảy ra bằng Past Simple.',
    estimatedMinutes: 7,
    grammarNoteVi:
      "Past Simple dùng cho hành động đã hoàn tất trong quá khứ, thường có mốc thời gian cụ thể ('last year', 'in 2020'). Động từ có quy tắc thêm -ed, động từ bất quy tắc phải học riêng (go → went).",
    vocabulary: [
      { id: 'en-a2-l3-1-v1', term: 'last year', translationVi: 'Năm ngoái', partOfSpeech: 'phrase', exampleSentenceId: 'en-a2-l3-1-s1' },
      { id: 'en-a2-l3-1-v2', term: 'visit', translationVi: 'Thăm, tham quan', partOfSpeech: 'verb' },
      { id: 'en-a2-l3-1-v3', term: 'went (go)', translationVi: 'Đã đi (quá khứ của go)', partOfSpeech: 'verb', exampleSentenceId: 'en-a2-l3-1-s2' },
      { id: 'en-a2-l3-1-v4', term: 'unforgettable', translationVi: 'Đáng nhớ, không thể quên', partOfSpeech: 'adjective' },
      { id: 'en-a2-l3-1-v5', term: 'ago', translationVi: 'Trước đây, cách đây', partOfSpeech: 'phrase', exampleSentenceId: 'en-a2-l3-1-s3' },
      { id: 'en-a2-l3-1-v6', term: 'experience', translationVi: 'Trải nghiệm', partOfSpeech: 'noun' },
    ],
    sentences: [
      { id: 'en-a2-l3-1-s1', text: 'I visited Japan last year.', translationVi: 'Tôi đã đi thăm Nhật Bản năm ngoái.' },
      { id: 'en-a2-l3-1-s2', text: 'We went to the beach in the summer.', translationVi: 'Chúng tôi đã đi biển vào mùa hè.' },
      { id: 'en-a2-l3-1-s3', text: 'That happened three years ago.', translationVi: 'Chuyện đó xảy ra ba năm trước.' },
    ],
    exercises: [
      {
        id: 'en-a2-l3-1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng quá khứ đúng của 'go'.",
        question: 'Last year, I ___ (go) to Japan.',
        options: ['go', 'goes', 'went', 'going'],
        correctOptionIndex: 2,
      },
      {
        id: 'en-a2-l3-1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'That happened three years ___.',
        wordBank: ['ago', 'last', 'yet'],
        correctAnswer: 'ago',
      },
      {
        id: 'en-a2-l3-1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của 'unforgettable'.",
        question: 'unforgettable',
        options: ['Đáng nhớ, không thể quên', 'Buồn tẻ', 'Ngắn ngủi', 'Đắt đỏ'],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: 'en-a2-l3-2-future-plans',
    unitId: 'en-a2-u3-experiences',
    title: 'Future plans and invitations',
    titleVi: 'Kế hoạch tương lai và lời mời',
    objectiveVi: "Nói về kế hoạch bằng 'going to', mời ai đó bằng 'Would you like to...?'.",
    estimatedMinutes: 7,
    grammarNoteVi:
      "'Going to' dùng cho dự định/kế hoạch đã quyết định trước ('I'm going to travel next month'). 'Will' dùng cho quyết định tức thời hoặc dự đoán.",
    vocabulary: [
      { id: 'en-a2-l3-2-v1', term: "I'm going to...", translationVi: 'Tôi định/sẽ...', partOfSpeech: 'phrase', exampleSentenceId: 'en-a2-l3-2-s1' },
      { id: 'en-a2-l3-2-v2', term: 'would you like to...?', translationVi: 'Bạn có muốn... không?', partOfSpeech: 'phrase', exampleSentenceId: 'en-a2-l3-2-s2' },
      { id: 'en-a2-l3-2-v3', term: 'next month', translationVi: 'Tháng tới', partOfSpeech: 'phrase' },
      { id: 'en-a2-l3-2-v4', term: 'accept', translationVi: 'Nhận lời, chấp nhận', partOfSpeech: 'verb' },
      { id: 'en-a2-l3-2-v5', term: 'decline', translationVi: 'Từ chối', partOfSpeech: 'verb', exampleSentenceId: 'en-a2-l3-2-s3' },
      { id: 'en-a2-l3-2-v6', term: 'sounds great', translationVi: 'Nghe hay đấy', partOfSpeech: 'phrase' },
    ],
    sentences: [
      { id: 'en-a2-l3-2-s1', text: "I'm going to study abroad next year.", translationVi: 'Tôi định đi du học vào năm sau.' },
      { id: 'en-a2-l3-2-s2', text: 'Would you like to join us for dinner?', translationVi: 'Bạn có muốn ăn tối cùng chúng tôi không?' },
      { id: 'en-a2-l3-2-s3', text: "I'm sorry, I have to decline.", translationVi: 'Xin lỗi, tôi phải từ chối.' },
    ],
    exercises: [
      {
        id: 'en-a2-l3-2-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng đúng để nói về dự định đã quyết định.",
        question: 'I ___ (going to / go) travel next month.',
        options: ["am going to", 'go', 'will went', 'going'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-a2-l3-2-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu để mời ai đó.',
        sentenceTemplate: '___ you like to join us?',
        wordBank: ['Would', 'Will', 'Do'],
        correctAnswer: 'Would',
      },
      {
        id: 'en-a2-l3-2-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['abroad', "I'm", 'to study', 'going'],
        correctOrder: ["I'm", 'going', 'to study', 'abroad'],
      },
    ],
  },
];
