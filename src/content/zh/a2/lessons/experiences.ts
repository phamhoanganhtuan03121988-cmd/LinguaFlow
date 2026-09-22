import type { Lesson } from '../../../types';

export const chineseA2ExperiencesLessons: Lesson[] = [
  {
    id: 'zh-a2-l3-1-past-experiences',
    unitId: 'zh-a2-u3-experiences',
    title: '过去的经验',
    titleVi: 'Trải nghiệm trong quá khứ',
    objectiveVi: "Kể lại trải nghiệm đã từng làm bằng trợ từ 过 (đã từng).",
    estimatedMinutes: 7,
    grammarNoteVi:
      "过 đặt sau động từ để nói về kinh nghiệm ĐÃ TỪNG làm (không quan trọng khi nào), khác 了 (nhấn vào việc vừa hoàn thành). Ví dụ: 我去过日本 (Tôi đã từng đi Nhật Bản).",
    vocabulary: [
      { id: 'zh-a2-l3-1-v1', term: '去年', translationVi: 'Năm ngoái', partOfSpeech: 'phrase', exampleSentenceId: 'zh-a2-l3-1-s1', usageNoteVi: 'Cách đọc: qùnián' },
      { id: 'zh-a2-l3-1-v2', term: '旅行', translationVi: 'Đi du lịch', partOfSpeech: 'verb', exampleSentenceId: 'zh-a2-l3-1-s2', usageNoteVi: 'Cách đọc: lǚxíng' },
      { id: 'zh-a2-l3-1-v3', term: '难忘', translationVi: 'Đáng nhớ, khó quên', partOfSpeech: 'adjective', usageNoteVi: 'Cách đọc: nánwàng' },
      { id: 'zh-a2-l3-1-v4', term: '以前', translationVi: 'Trước đây', partOfSpeech: 'phrase', exampleSentenceId: 'zh-a2-l3-1-s3', usageNoteVi: 'Cách đọc: yǐqián' },
      { id: 'zh-a2-l3-1-v5', term: '经验', translationVi: 'Trải nghiệm, kinh nghiệm', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: jīngyàn' },
    ],
    sentences: [
      { id: 'zh-a2-l3-1-s1', text: '去年我去日本旅行了。', translationVi: '(Qùnián wǒ qù Rìběn lǚxíng le.) Năm ngoái tôi đã đi du lịch Nhật Bản.' },
      { id: 'zh-a2-l3-1-s2', text: '我去过越南和泰国。', translationVi: '(Wǒ qùguo Yuènán hé Tàiguó.) Tôi đã từng đi Việt Nam và Thái Lan.' },
      { id: 'zh-a2-l3-1-s3', text: '那是三年以前的事。', translationVi: '(Nà shì sān nián yǐqián de shì.) Chuyện đó đã ba năm trước.' },
    ],
    exercises: [
      {
        id: 'zh-a2-l3-1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn từ đúng để nói về kinh nghiệm đã từng làm.",
        question: '我去___日本。',
        options: ['过', '了', '在', '要'],
        correctOptionIndex: 0,
      },
      {
        id: 'zh-a2-l3-1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '那是三年___的事。',
        wordBank: ['以前', '现在', '还是'],
        correctAnswer: '以前',
      },
      {
        id: 'zh-a2-l3-1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '难忘'.",
        question: '难忘',
        options: ['Đáng nhớ, khó quên', 'Buồn tẻ', 'Ngắn ngủi', 'Đắt đỏ'],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: 'zh-a2-l3-2-future-plans',
    unitId: 'zh-a2-u3-experiences',
    title: '未来计划和邀请',
    titleVi: 'Kế hoạch tương lai và lời mời',
    objectiveVi: "Nói về kế hoạch bằng '会' và mời ai đó, dùng lý do bằng 因为...所以...",
    estimatedMinutes: 7,
    grammarNoteVi:
      "会 trước động từ diễn tả khả năng/dự định trong tương lai. 因为...所以... nghĩa là 'vì...nên...', nối nguyên nhân-kết quả.",
    vocabulary: [
      { id: 'zh-a2-l3-2-v1', term: '下个月', translationVi: 'Tháng tới', partOfSpeech: 'phrase', exampleSentenceId: 'zh-a2-l3-2-s1', usageNoteVi: 'Cách đọc: xià gè yuè' },
      { id: 'zh-a2-l3-2-v2', term: '一起去吧', translationVi: 'Cùng đi nhé', partOfSpeech: 'phrase', exampleSentenceId: 'zh-a2-l3-2-s2', usageNoteVi: 'Cách đọc: yìqǐ qù ba' },
      { id: 'zh-a2-l3-2-v3', term: '好的，我去', translationVi: 'Được, tôi sẽ đi', partOfSpeech: 'phrase', usageNoteVi: 'Cách đọc: hǎo de, wǒ qù' },
      { id: 'zh-a2-l3-2-v4', term: '对不起，我不能去', translationVi: 'Xin lỗi, tôi không đi được', partOfSpeech: 'phrase', exampleSentenceId: 'zh-a2-l3-2-s3', usageNoteVi: 'Cách đọc: duìbuqǐ, wǒ bùnéng qù' },
      { id: 'zh-a2-l3-2-v5', term: '计划', translationVi: 'Kế hoạch', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: jìhuà' },
    ],
    sentences: [
      { id: 'zh-a2-l3-2-s1', text: '下个月我会去留学。', translationVi: '(Xià gè yuè wǒ huì qù liúxué.) Tháng tới tôi sẽ đi du học.' },
      { id: 'zh-a2-l3-2-s2', text: '周末一起去吧！', translationVi: '(Zhōumò yìqǐ qù ba!) Cuối tuần cùng đi nhé!' },
      { id: 'zh-a2-l3-2-s3', text: '因为要旅行，所以对不起，我不能去。', translationVi: '(Yīnwèi yào lǚxíng, suǒyǐ duìbuqǐ, wǒ bùnéng qù.) Vì phải đi du lịch nên xin lỗi, tôi không đi được.' },
    ],
    exercises: [
      {
        id: 'zh-a2-l3-2-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng tương lai đúng.",
        question: '下个月我___去留学。',
        options: ['会', '了', '过', '比'],
        correctOptionIndex: 0,
      },
      {
        id: 'zh-a2-l3-2-ex2',
        type: 'fill-blank',
        promptVi: "Điền cặp từ nối 'vì...nên...' còn thiếu.",
        sentenceTemplate: '___要旅行，所以不能去。',
        wordBank: ['因为', '虽然', '还是'],
        correctAnswer: '因为',
      },
      {
        id: 'zh-a2-l3-2-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Tháng tới tôi sẽ đi du học."',
        words: ['留学', '下个月', '我会去'],
        correctOrder: ['下个月', '我会去', '留学'],
      },
    ],
  },
];
