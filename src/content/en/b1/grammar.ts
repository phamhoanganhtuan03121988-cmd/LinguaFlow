import type { GrammarTopic } from '../../types';

export const englishB1GrammarTopics: GrammarTopic[] = [
  {
    id: 'en-b1-gr-present-perfect',
    languageCode: 'en',
    level: 'B1',
    title: 'Present Perfect (simple vs continuous)',
    titleVi: 'Hiện tại hoàn thành (đơn và tiếp diễn)',
    explanationVi:
      "Present Perfect Simple (have/has + V3) nhấn mạnh KẾT QUẢ của một hành động, dùng cho trải nghiệm không gắn mốc thời gian cụ thể. Present Perfect Continuous (have/has been + V-ing) nhấn mạnh KHOẢNG THỜI GIAN của một hành động, thường vẫn tiếp tục đến hiện tại.",
    structure: 'S + have/has + V3 (kết quả) — S + have/has + been + V-ing (khoảng thời gian, tính liên tục)',
    keyPoints: [
      "'I have read three books this month.' — nhấn mạnh SỐ LƯỢNG kết quả",
      "'I have been reading all afternoon.' — nhấn mạnh HÀNH ĐỘNG diễn ra liên tục",
      "Dùng Past Simple, không dùng Present Perfect, khi có mốc thời gian cụ thể đã kết thúc (yesterday, in 2020)",
    ],
    examples: [
      { id: 'en-b1-gr-pp-s1', text: 'I have finished my homework.', translationVi: 'Tôi đã làm xong bài tập về nhà.' },
      { id: 'en-b1-gr-pp-s2', text: 'I have been doing my homework for two hours.', translationVi: 'Tôi đã làm bài tập được hai tiếng rồi.' },
      { id: 'en-b1-gr-pp-s3', text: 'She has worked here since 2019.', translationVi: 'Cô ấy đã làm việc ở đây từ năm 2019.' },
    ],
    commonMistakesVi:
      "Người học hay dùng Present Perfect với mốc thời gian cụ thể đã kết thúc, ví dụ nói 'I have visited Paris last year' thay vì 'I visited Paris last year'.",
    exercises: [
      {
        id: 'en-b1-gr-pp-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng — nhấn mạnh kết quả, không có mốc thời gian cụ thể.',
        question: 'I ___ (finish) my report. You can check it now.',
        options: ['finished', 'have finished', 'am finishing', 'finish'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-b1-gr-pp-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng — hành động diễn ra liên tục, vẫn đang tiếp diễn.',
        sentenceTemplate: 'I ___ (wait) for the bus for twenty minutes.',
        wordBank: ['have been waiting', 'have waited', 'waited'],
        correctAnswer: 'have been waiting',
        explanationVi: "Nhấn mạnh khoảng thời gian liên tục (20 phút) → Present Perfect Continuous.",
      },
      {
        id: 'en-b1-gr-pp-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['2019', 'here', 'since', 'worked', 'has', 'she'],
        correctOrder: ['she', 'has', 'worked', 'here', 'since', '2019'],
      },
    ],
  },
  {
    id: 'en-b1-gr-conditionals',
    languageCode: 'en',
    level: 'B1',
    title: 'First and Second Conditionals',
    titleVi: 'Câu điều kiện loại 1 và loại 2',
    explanationVi:
      "Câu điều kiện loại 1 diễn tả điều kiện có thật, có khả năng xảy ra trong tương lai: If + hiện tại đơn, will + V. Câu điều kiện loại 2 diễn tả điều kiện giả định, không có thật ở hiện tại: If + quá khứ đơn, would + V.",
    structure: 'Loại 1: If + S + V(s/es), S + will + V | Loại 2: If + S + V-ed, S + would + V',
    keyPoints: [
      "Loại 1: 'If it rains, I will stay home.' (có khả năng xảy ra thật)",
      "Loại 2: 'If I had more money, I would buy a house.' (giả định, khó xảy ra hoặc không có thật)",
      "Loại 2 luôn dùng 'were' thay vì 'was' với mọi ngôi: 'If I were you...'",
    ],
    examples: [
      { id: 'en-b1-gr-cond-s1', text: 'If I have time, I will call you tonight.', translationVi: 'Nếu tôi có thời gian, tôi sẽ gọi cho bạn tối nay.' },
      { id: 'en-b1-gr-cond-s2', text: 'If I had a car, I would drive to work.', translationVi: 'Nếu tôi có xe hơi, tôi sẽ lái xe đi làm.' },
      { id: 'en-b1-gr-cond-s3', text: "If she studied harder, she would pass the exam.", translationVi: 'Nếu cô ấy học chăm hơn, cô ấy sẽ đậu kỳ thi.' },
    ],
    commonMistakesVi:
      "Người học hay dùng 'will' trong mệnh đề if, ví dụ nói 'If it will rain' thay vì 'If it rains' — mệnh đề if không bao giờ dùng 'will'.",
    exercises: [
      {
        id: 'en-b1-gr-cond-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng cho mệnh đề if của câu điều kiện loại 1.',
        question: 'If it ___ (rain) tomorrow, we will stay indoors.',
        options: ['rains', 'will rain', 'rained', 'would rain'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-b1-gr-cond-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng cho tình huống giả định không có thật.',
        sentenceTemplate: 'If I ___ (have) more time, I would learn to paint.',
        wordBank: ['had', 'have', 'will have'],
        correctAnswer: 'had',
      },
      {
        id: 'en-b1-gr-cond-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['would', 'a house', 'I', 'buy', 'if I had more money'],
        correctOrder: ['if I had more money', 'I', 'would', 'buy', 'a house'],
      },
    ],
  },
  {
    id: 'en-b1-gr-modals-deduction-advice',
    languageCode: 'en',
    level: 'B1',
    title: 'Modals of deduction and advice',
    titleVi: 'Động từ khuyết thiếu chỉ suy đoán và lời khuyên',
    explanationVi:
      "Suy đoán về hiện tại: must be (chắc chắn đúng), might/could be (có thể), can't be (chắc chắn sai). Lời khuyên/nhận xét về quá khứ: should have + V3 (đáng lẽ nên làm nhưng không làm), shouldn't have + V3 (đáng lẽ không nên làm nhưng đã làm).",
    structure: 'must/might/could/can\'t + V nguyên mẫu (suy đoán hiện tại) | should(n\'t) have + V3 (nhận xét quá khứ)',
    keyPoints: [
      "'He must be tired.' = chắc chắn anh ấy mệt (có bằng chứng mạnh)",
      "'She might be at home.' = có thể cô ấy đang ở nhà (không chắc)",
      "'You should have told me.' = đáng lẽ bạn nên nói với tôi (nhưng bạn đã không nói)",
    ],
    examples: [
      { id: 'en-b1-gr-modal-s1', text: "He hasn't eaten all day — he must be hungry.", translationVi: 'Anh ấy chưa ăn gì cả ngày — chắc hẳn anh ấy đang đói.' },
      { id: 'en-b1-gr-modal-s2', text: "She might be stuck in traffic.", translationVi: 'Có thể cô ấy đang bị kẹt xe.' },
      { id: 'en-b1-gr-modal-s3', text: "You should have booked the tickets earlier.", translationVi: 'Đáng lẽ bạn nên đặt vé sớm hơn.' },
    ],
    commonMistakesVi:
      "Người học hay chia sai động từ sau 'should have', ví dụ nói 'should have go' thay vì 'should have gone' (phải dùng V3/past participle).",
    exercises: [
      {
        id: 'en-b1-gr-modal-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn động từ khuyết thiếu đúng cho sự suy đoán chắc chắn.',
        question: 'The lights are off and no one is answering. They ___ be out.',
        options: ['must', "can't", 'should', 'would'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-b1-gr-modal-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng cho lời khuyên về việc đã xảy ra.',
        sentenceTemplate: 'You ___ (should / book) the tickets earlier — now they are sold out.',
        wordBank: ['should have booked', 'should book', 'booked'],
        correctAnswer: 'should have booked',
      },
      {
        id: 'en-b1-gr-modal-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['be', 'hungry', 'must', 'he'],
        correctOrder: ['he', 'must', 'be', 'hungry'],
      },
    ],
  },
  {
    id: 'en-b1-gr-relative-clauses',
    languageCode: 'en',
    level: 'B1',
    title: 'Relative clauses',
    titleVi: 'Mệnh đề quan hệ',
    explanationVi:
      "Mệnh đề quan hệ xác định (defining) bổ nghĩa cần thiết cho danh từ, không có dấu phẩy, dùng who/that/which/where/whose. Mệnh đề quan hệ không xác định (non-defining) thêm thông tin phụ, có dấu phẩy bao quanh, không dùng 'that'.",
    structure: 'Xác định: N + who/that/which/where/whose + mệnh đề (không phẩy) | Không xác định: N, who/which/where/whose + mệnh đề, (có phẩy)',
    keyPoints: [
      "Xác định: 'The book that I borrowed is great.' (cần thiết để biết sách nào)",
      "Không xác định: 'My brother, who lives in Hanoi, is a teacher.' (thông tin thêm, có thể bỏ)",
      "'That' KHÔNG được dùng trong mệnh đề không xác định",
    ],
    examples: [
      { id: 'en-b1-gr-rel-s1', text: 'The man who called earlier left a message.', translationVi: 'Người đàn ông đã gọi trước đó để lại tin nhắn.' },
      { id: 'en-b1-gr-rel-s2', text: 'My sister, who lives in Da Nang, is visiting next week.', translationVi: 'Chị gái tôi, người sống ở Đà Nẵng, sẽ đến thăm vào tuần sau.' },
      { id: 'en-b1-gr-rel-s3', text: "This is the restaurant where we had our first date.", translationVi: 'Đây là nhà hàng nơi chúng tôi có buổi hẹn đầu tiên.' },
    ],
    commonMistakesVi:
      "Người học hay thêm dấu phẩy vào mệnh đề xác định hoặc dùng 'that' trong mệnh đề không xác định, ví dụ sai: 'My sister, that lives in Hanoi, ...'.",
    exercises: [
      {
        id: 'en-b1-gr-rel-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn đại từ quan hệ đúng.',
        question: 'The house ___ we bought last year needs repairs.',
        options: ['who', 'which', 'where', 'whose'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-b1-gr-rel-ex2',
        type: 'fill-blank',
        promptVi: 'Điền đại từ quan hệ đúng cho mệnh đề không xác định.',
        sentenceTemplate: 'My brother, ___ works in Tokyo, is coming home for the holidays.',
        wordBank: ['who', 'that', 'which'],
        correctAnswer: 'who',
        explanationVi: "Mệnh đề không xác định (có dấu phẩy) không dùng 'that'.",
      },
      {
        id: 'en-b1-gr-rel-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['a message', 'left', 'who', 'the man', 'called earlier'],
        correctOrder: ['the man', 'who', 'called earlier', 'left', 'a message'],
      },
    ],
  },
  {
    id: 'en-b1-gr-passive-reported-speech',
    languageCode: 'en',
    level: 'B1',
    title: 'Passive voice and reported speech',
    titleVi: 'Câu bị động và lời nói gián tiếp',
    explanationVi:
      "Câu bị động (be + V3) nhấn mạnh hành động/kết quả hơn là người thực hiện: 'The email was sent yesterday.' Lời nói gián tiếp thuật lại lời nói, thường lùi thì một bậc và đổi đại từ/từ chỉ thời gian cho phù hợp ngữ cảnh: 'I am busy' → 'He said he was busy.'",
    structure: 'Bị động: S + be + V3 (+ by + tác nhân) | Gián tiếp: S + said/told + (that) + mệnh đề (lùi thì)',
    keyPoints: [
      "'The bridge was built in 1990.' — không cần nêu ai xây",
      "'She said (that) she was tired.' — lùi 'is' thành 'was'",
      "'He told me that he would call back.' — 'tell' cần tân ngữ chỉ người nghe (me)",
    ],
    examples: [
      { id: 'en-b1-gr-passrep-s1', text: 'The report was written by the marketing team.', translationVi: 'Bản báo cáo được viết bởi đội ngũ marketing.' },
      { id: 'en-b1-gr-passrep-s2', text: 'He said that he had already left.', translationVi: 'Anh ấy nói rằng anh ấy đã rời đi rồi.' },
      { id: 'en-b1-gr-passrep-s3', text: 'She told me that she would be late.', translationVi: 'Cô ấy nói với tôi rằng cô ấy sẽ đến trễ.' },
    ],
    commonMistakesVi:
      "Người học hay quên lùi thì khi tường thuật, hoặc dùng 'said me' thay vì 'told me' — 'say' không đi trực tiếp với tân ngữ chỉ người nghe.",
    exercises: [
      {
        id: 'en-b1-gr-passrep-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng bị động đúng.',
        question: 'This song ___ (write) by a famous composer.',
        options: ['wrote', 'was written', 'writes', 'is writing'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-b1-gr-passrep-ex2',
        type: 'fill-blank',
        promptVi: 'Điền động từ tường thuật đúng (đi kèm tân ngữ chỉ người nghe).',
        sentenceTemplate: 'He ___ me that he would be late.',
        wordBank: ['told', 'said', 'talked'],
        correctAnswer: 'told',
      },
      {
        id: 'en-b1-gr-passrep-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['team', 'the', 'was', 'by', 'written', 'report', 'marketing', 'the'],
        correctOrder: ['the', 'report', 'was', 'written', 'by', 'the', 'marketing', 'team'],
      },
    ],
  },
];
