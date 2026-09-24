import type { Lesson } from '../../types';

export const englishC1Lessons: Lesson[] = [
  {
    id: 'en-c1-l1-1-inversion',
    unitId: 'en-c1-u1-formal-expression',
    title: 'Inversion for emphasis',
    titleVi: 'Đảo ngữ nhấn mạnh',
    objectiveVi: 'Nhấn mạnh ý bằng cách đảo trợ động từ lên trước chủ ngữ sau các trạng từ phủ định/giới hạn.',
    estimatedMinutes: 8,
    grammarNoteVi:
      "Khi câu bắt đầu bằng trạng từ phủ định/giới hạn (Not only, Never, Rarely, Only after...), phần còn lại của mệnh đề đảo trợ động từ lên trước chủ ngữ, giống cấu trúc câu hỏi: 'Not only did she finish early, but she also...' Cách diễn đạt này trang trọng và nhấn mạnh hơn cấu trúc câu thông thường, đặc trưng của văn phong C1.",
    vocabulary: [
      { id: 'en-c1-l1-1-v1', term: 'not only...but also', translationVi: 'Không những...mà còn... (đảo ngữ)', partOfSpeech: 'phrase', exampleSentenceId: 'en-c1-l1-1-s1' },
      { id: 'en-c1-l1-1-v2', term: 'never before', translationVi: 'Chưa bao giờ (nhấn mạnh)', partOfSpeech: 'phrase', exampleSentenceId: 'en-c1-l1-1-s2' },
      { id: 'en-c1-l1-1-v3', term: 'rarely', translationVi: 'Hiếm khi', partOfSpeech: 'phrase' },
      { id: 'en-c1-l1-1-v4', term: 'seldom', translationVi: 'Hiếm khi (trang trọng hơn rarely)', partOfSpeech: 'phrase' },
      { id: 'en-c1-l1-1-v5', term: 'only after', translationVi: 'Chỉ sau khi', partOfSpeech: 'phrase', exampleSentenceId: 'en-c1-l1-1-s3' },
      { id: 'en-c1-l1-1-v6', term: 'under no circumstances', translationVi: 'Dù trong bất kỳ hoàn cảnh nào cũng không', partOfSpeech: 'phrase' },
      { id: 'en-c1-l1-1-v7', term: 'dedication', translationVi: 'Sự tận tâm, cống hiến', partOfSpeech: 'noun', exampleSentenceId: 'en-c1-l1-1-s2' },
      { id: 'en-c1-l1-1-v8', term: 'exceed expectations', translationVi: 'Vượt quá kỳ vọng', partOfSpeech: 'phrase', exampleSentenceId: 'en-c1-l1-1-s1' },
    ],
    sentences: [
      { id: 'en-c1-l1-1-s1', text: 'Not only did she finish the project early, but she also exceeded expectations.', translationVi: 'Cô ấy không những hoàn thành dự án sớm, mà còn vượt quá kỳ vọng.' },
      { id: 'en-c1-l1-1-s2', text: 'Never before have I seen such dedication to a cause.', translationVi: 'Chưa bao giờ tôi thấy sự tận tâm như vậy đối với một mục tiêu.' },
      { id: 'en-c1-l1-1-s3', text: 'Only after the meeting did he realize his mistake.', translationVi: 'Chỉ sau cuộc họp anh ấy mới nhận ra sai lầm của mình.' },
    ],
    exercises: [
      {
        id: 'en-c1-l1-1-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn cách mở đầu đảo ngữ đúng.',
        question: '___ did she finish the project early, but she also exceeded expectations.',
        options: ['Not only', 'She not only', 'Not only she', 'Only not'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-c1-l1-1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền trợ động từ đúng cho đảo ngữ.',
        sentenceTemplate: 'Never before ___ I seen such dedication.',
        wordBank: ['have', 'has', 'did'],
        correctAnswer: 'have',
      },
      {
        id: 'en-c1-l1-1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['did he realize', 'only after the meeting', 'his mistake'],
        correctOrder: ['only after the meeting', 'did he realize', 'his mistake'],
      },
    ],
  },
  {
    id: 'en-c1-l1-2-nominalization',
    unitId: 'en-c1-u1-formal-expression',
    title: 'Nominalization in academic writing',
    titleVi: 'Danh từ hóa trong văn phong học thuật',
    objectiveVi: 'Viết câu trang trọng, súc tích hơn bằng cách chuyển động từ/tính từ thành danh từ trừu tượng.',
    estimatedMinutes: 8,
    grammarNoteVi:
      "Danh từ hóa (nominalization) chuyển động từ/tính từ thành danh từ trừu tượng để câu văn học thuật/trang trọng hơn: implement→implementation, aware→awareness, assess→assessment. So sánh: 'They implemented the policy, which improved efficiency.' (thông thường) vs 'The implementation of the policy improved efficiency.' (học thuật, súc tích hơn).",
    vocabulary: [
      { id: 'en-c1-l1-2-v1', term: 'implementation', translationVi: 'Sự triển khai, thực thi', partOfSpeech: 'noun', exampleSentenceId: 'en-c1-l1-2-s1' },
      { id: 'en-c1-l1-2-v2', term: 'significant', translationVi: 'Đáng kể', partOfSpeech: 'adjective', exampleSentenceId: 'en-c1-l1-2-s1' },
      { id: 'en-c1-l1-2-v3', term: 'awareness', translationVi: 'Nhận thức, sự nhận biết', partOfSpeech: 'noun', exampleSentenceId: 'en-c1-l1-2-s2' },
      { id: 'en-c1-l1-2-v4', term: 'decision-making', translationVi: 'Việc ra quyết định', partOfSpeech: 'noun' },
      { id: 'en-c1-l1-2-v5', term: 'efficiency', translationVi: 'Hiệu suất', partOfSpeech: 'noun', exampleSentenceId: 'en-c1-l1-2-s1' },
      { id: 'en-c1-l1-2-v6', term: 'assessment', translationVi: 'Sự đánh giá', partOfSpeech: 'noun', exampleSentenceId: 'en-c1-l1-2-s3' },
      { id: 'en-c1-l1-2-v7', term: 'contribute to', translationVi: 'Góp phần vào', partOfSpeech: 'phrase', exampleSentenceId: 'en-c1-l1-2-s2' },
      { id: 'en-c1-l1-2-v8', term: 'underlying', translationVi: 'Tiềm ẩn, nền tảng', partOfSpeech: 'adjective' },
    ],
    sentences: [
      { id: 'en-c1-l1-2-s1', text: 'The implementation of the new policy led to a significant increase in efficiency.', translationVi: 'Việc triển khai chính sách mới đã dẫn đến sự gia tăng đáng kể về hiệu suất.' },
      { id: 'en-c1-l1-2-s2', text: 'Growing awareness of climate change has contributed to policy reform.', translationVi: 'Nhận thức ngày càng tăng về biến đổi khí hậu đã góp phần vào cải cách chính sách.' },
      { id: 'en-c1-l1-2-s3', text: 'A thorough assessment of the risks is essential before proceeding.', translationVi: 'Một đánh giá kỹ lưỡng về rủi ro là cần thiết trước khi tiến hành.' },
    ],
    exercises: [
      {
        id: 'en-c1-l1-2-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng danh từ hóa đúng của 'implement'.",
        question: 'The ___ of the new policy led to increased efficiency.',
        options: ['implement', 'implementation', 'implementing', 'implemented'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-c1-l1-2-ex2',
        type: 'fill-blank',
        promptVi: "Điền dạng danh từ hóa đúng của 'aware'.",
        sentenceTemplate: 'Growing ___ of climate change has contributed to policy reform.',
        wordBank: ['awareness', 'aware', 'awarely'],
        correctAnswer: 'awareness',
      },
      {
        id: 'en-c1-l1-2-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['is essential', 'a thorough assessment of the risks', 'before proceeding'],
        correctOrder: ['a thorough assessment of the risks', 'is essential', 'before proceeding'],
      },
    ],
  },
];
