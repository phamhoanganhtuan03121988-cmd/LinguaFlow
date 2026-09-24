import type { GrammarTopic } from '../../types';

export const englishB2GrammarTopics: GrammarTopic[] = [
  {
    id: 'en-b2-gr-third-mixed-conditionals',
    languageCode: 'en',
    level: 'B2',
    title: 'Third and mixed conditionals',
    titleVi: 'Câu điều kiện loại 3 và câu điều kiện hỗn hợp',
    explanationVi:
      "Câu điều kiện loại 3 diễn tả điều không có thật trong quá khứ và kết quả giả định (thường mang sắc thái hối tiếc): If + had + V3, would have + V3. Câu điều kiện hỗn hợp kết hợp hai mốc thời gian khác nhau giữa mệnh đề if và mệnh đề kết quả.",
    structure: 'Loại 3: If + had + V3, would have + V3 | Hỗn hợp: If + had + V3, would + V (nguyên mẫu) — hoặc If + V-ed, would have + V3',
    keyPoints: [
      "Loại 3: 'If I had left earlier, I would have caught the train.' (quá khứ → quá khứ)",
      "Hỗn hợp (quá khứ→hiện tại): 'If I hadn't quit my job, I would have more money now.'",
      "Hỗn hợp (hiện tại→quá khứ): 'If I weren't afraid of heights, I would have gone skydiving.'",
    ],
    examples: [
      { id: 'en-b2-gr-cond3-s1', text: 'If I had known, I would have told you.', translationVi: 'Nếu tôi đã biết thì tôi đã nói cho bạn rồi.' },
      { id: 'en-b2-gr-cond3-s2', text: "If she hadn't lost her passport, she would be on vacation now.", translationVi: 'Nếu cô ấy đã không làm mất hộ chiếu thì bây giờ cô ấy đã đang đi nghỉ mát.' },
      { id: 'en-b2-gr-cond3-s3', text: "If I weren't so tired, I would have finished the project last night.", translationVi: 'Nếu tôi không mệt như vậy thì tối qua tôi đã hoàn thành dự án rồi.' },
    ],
    commonMistakesVi:
      "Người học hay dùng 'would have' ở cả hai mệnh đề của câu điều kiện hỗn hợp thay vì phân biệt đúng thời điểm của từng mệnh đề.",
    exercises: [
      {
        id: 'en-b2-gr-cond3-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng cho câu điều kiện loại 3.',
        question: 'If I ___ (know), I would have told you.',
        options: ['know', 'knew', 'had known', 'have known'],
        correctOptionIndex: 2,
      },
      {
        id: 'en-b2-gr-cond3-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng cho kết quả ở hiện tại (câu điều kiện hỗn hợp).',
        sentenceTemplate: "If she hadn't lost her passport, she ___ (be) on vacation now.",
        wordBank: ['would be', 'would have been', 'is'],
        correctAnswer: 'would be',
      },
      {
        id: 'en-b2-gr-cond3-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['I would have told you', 'if I had known'],
        correctOrder: ['if I had known', 'I would have told you'],
      },
    ],
  },
  {
    id: 'en-b2-gr-advanced-passive-reporting',
    languageCode: 'en',
    level: 'B2',
    title: 'Advanced passive and reporting structures',
    titleVi: 'Câu bị động và cấu trúc tường thuật nâng cao',
    explanationVi:
      "Dùng 'It is said/believed/thought/reported that + mệnh đề' hoặc 'S + is said/believed/thought + to + V' để tường thuật thông tin khách quan mà không cần nêu rõ nguồn tin.",
    structure: 'It + be + V3(reporting verb) + that + mệnh đề | S + be + V3(reporting verb) + to + V (hoặc to have + V3)',
    keyPoints: [
      "'It is believed that he left the country.' = 'He is believed to have left the country.'",
      "'is thought to be' dùng cho trạng thái hiện tại, 'is thought to have been' dùng cho quá khứ",
      'Thường dùng trong báo chí, văn viết trang trọng khi nguồn tin không chắc chắn hoặc không muốn nêu rõ',
    ],
    examples: [
      { id: 'en-b2-gr-passrep-s1', text: 'It is reported that the CEO will step down next month.', translationVi: 'Có báo cáo rằng CEO sẽ từ chức vào tháng tới.' },
      { id: 'en-b2-gr-passrep-s2', text: 'The building is thought to have collapsed due to poor construction.', translationVi: 'Tòa nhà được cho là đã sụp đổ do xây dựng kém chất lượng.' },
      { id: 'en-b2-gr-passrep-s3', text: 'She is said to be one of the best surgeons in the country.', translationVi: 'Cô ấy được cho là một trong những bác sĩ phẫu thuật giỏi nhất nước.' },
    ],
    commonMistakesVi:
      "Người học hay quên thêm 'have' khi tường thuật về một sự việc đã xảy ra trong quá khứ, nói sai 'is thought to collapse' thay vì 'is thought to have collapsed'.",
    exercises: [
      {
        id: 'en-b2-gr-passrep-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng để tường thuật về một sự việc đã xảy ra.',
        question: 'The building ___ (think) to have collapsed due to poor construction.',
        options: ['thinks', 'is thought', 'thought', 'is thinking'],
        correctOptionIndex: 1,
      },
      {
        id: 'en-b2-gr-passrep-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng.',
        sentenceTemplate: 'She is said ___ one of the best surgeons in the country.',
        wordBank: ['to be', 'to have', 'being'],
        correctAnswer: 'to be',
      },
      {
        id: 'en-b2-gr-passrep-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['will step down next month', 'it is reported that', 'the CEO'],
        correctOrder: ['it is reported that', 'the CEO', 'will step down next month'],
      },
    ],
  },
  {
    id: 'en-b2-gr-participle-clauses',
    languageCode: 'en',
    level: 'B2',
    title: 'Participle clauses',
    titleVi: 'Mệnh đề phân từ',
    explanationVi:
      "Mệnh đề phân từ rút gọn mệnh đề quan hệ hoặc trạng ngữ để câu văn súc tích, trang trọng hơn. V-ing cho ý nghĩa chủ động/đang diễn ra, V-ed/V3 cho ý nghĩa bị động, Having + V3 cho hành động xảy ra trước.",
    structure: 'V-ing (chủ động) / V-ed hoặc V3 (bị động) / Having + V3 (hoàn thành, chủ động)',
    keyPoints: [
      "'The woman talking to the manager is my colleague.' (= who is talking)",
      "'Not knowing what to do, she called her mother.' (= Because she didn't know)",
      "'Built in the 1800s, the bridge is now a historic landmark.' (= which was built)",
    ],
    examples: [
      { id: 'en-b2-gr-participle-s1', text: 'The woman talking to the manager is my colleague.', translationVi: 'Người phụ nữ đang nói chuyện với quản lý là đồng nghiệp của tôi.' },
      { id: 'en-b2-gr-participle-s2', text: 'Not knowing what to do, she called her mother.', translationVi: 'Không biết phải làm gì, cô ấy đã gọi cho mẹ mình.' },
      { id: 'en-b2-gr-participle-s3', text: 'Built in the 1800s, the bridge is now a historic landmark.', translationVi: 'Được xây vào những năm 1800, cây cầu giờ đây là một di tích lịch sử.' },
    ],
    commonMistakesVi:
      "Người học hay dùng V-ing cho ý nghĩa bị động, ví dụ nói sai 'The bridge building in the 1800s...' thay vì 'The bridge built in the 1800s...'.",
    exercises: [
      {
        id: 'en-b2-gr-participle-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng phân từ đúng (chủ động, đang diễn ra).',
        question: 'The woman ___ (talk) to the manager is my colleague.',
        options: ['talking', 'talked', 'talks', 'having talked'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-b2-gr-participle-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng phân từ đúng (bị động).',
        sentenceTemplate: '___ (build) in the 1800s, the bridge is now a historic landmark.',
        wordBank: ['Built', 'Building', 'Builds'],
        correctAnswer: 'Built',
      },
      {
        id: 'en-b2-gr-participle-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['she called her mother', 'not knowing what to do'],
        correctOrder: ['not knowing what to do', 'she called her mother'],
      },
    ],
  },
  {
    id: 'en-b2-gr-advanced-relative-clauses',
    languageCode: 'en',
    level: 'B2',
    title: 'Advanced relative clauses',
    titleVi: 'Mệnh đề quan hệ nâng cao',
    explanationVi:
      "Mệnh đề quan hệ nâng cao kết hợp định lượng (some/many/most/none) + of + whom/which, hoặc giới từ + which/whom, phổ biến trong văn viết trang trọng và học thuật.",
    structure: '(some/many/most/none) + of + whom/which + mệnh đề | giới từ + which/whom + mệnh đề',
    keyPoints: [
      "'whom' dùng cho người, 'which' dùng cho vật, sau định lượng hoặc giới từ",
      "'The report, the conclusions of which are alarming, was published today.'",
      "Không dùng 'that' sau giới từ hoặc định lượng — chỉ dùng which/whom",
    ],
    examples: [
      { id: 'en-b2-gr-advrel-s1', text: 'The report, the conclusions of which are alarming, was published today.', translationVi: 'Bản báo cáo, mà kết luận của nó rất đáng báo động, đã được công bố hôm nay.' },
      { id: 'en-b2-gr-advrel-s2', text: 'I have two sisters, both of whom live in Hanoi.', translationVi: 'Tôi có hai chị gái, cả hai đều sống ở Hà Nội.' },
      { id: 'en-b2-gr-advrel-s3', text: 'The hotel at which we stayed was fully booked the next week.', translationVi: 'Khách sạn mà chúng tôi đã ở đã kín phòng vào tuần sau đó.' },
    ],
    commonMistakesVi:
      "Người học hay dùng 'that' thay vì 'which/whom' sau giới từ hoặc định lượng, ví dụ nói sai 'both of that' thay vì 'both of whom'.",
    exercises: [
      {
        id: 'en-b2-gr-advrel-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn từ đúng.',
        question: 'I have two sisters, both ___ live in Hanoi.',
        options: ['of whom', 'of which', 'of them', 'of whose'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-b2-gr-advrel-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ đúng.',
        sentenceTemplate: 'The hotel at ___ we stayed was fully booked the next week.',
        wordBank: ['which', 'whom', 'that'],
        correctAnswer: 'which',
      },
      {
        id: 'en-b2-gr-advrel-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['live in Hanoi', 'both of whom', 'I have two sisters'],
        correctOrder: ['I have two sisters', 'both of whom', 'live in Hanoi'],
      },
    ],
  },
  {
    id: 'en-b2-gr-modal-nuance',
    languageCode: 'en',
    level: 'B2',
    title: 'Modal nuance and complex verb patterns',
    titleVi: 'Sắc thái động từ khuyết thiếu và mẫu động từ phức tạp',
    explanationVi:
      "'may well' diễn tả khả năng khá cao. 'needn't have + V3' diễn tả việc đã không cần làm nhưng vẫn đã làm (khác 'shouldn't have' — lời khuyên/chê trách việc sai). Một số động từ đổi nghĩa tùy theo V theo sau là to-infinitive hay gerund.",
    structure: "may well + V | needn't have + V3 | remember/forget/stop + to V (chưa xảy ra) hoặc + V-ing (đã xảy ra/đang làm)",
    keyPoints: [
      "'You needn't have worried.' (đã không cần lo lắng, nhưng đã lo)",
      "'I'll never forget meeting her for the first time.' (nhớ MÃI về một kỷ niệm)",
      "'Don't forget to submit the form.' (đừng quên để LÀM — việc chưa xảy ra)",
    ],
    examples: [
      { id: 'en-b2-gr-modalnuance-s1', text: 'The delay may well cause serious problems.', translationVi: 'Sự chậm trễ rất có thể sẽ gây ra vấn đề nghiêm trọng.' },
      { id: 'en-b2-gr-modalnuance-s2', text: "You needn't have worried about the exam.", translationVi: 'Bạn đã không cần lo lắng về kỳ thi đó đâu.' },
      { id: 'en-b2-gr-modalnuance-s3', text: "I'll never forget meeting her for the first time.", translationVi: 'Tôi sẽ không bao giờ quên lần đầu tiên gặp cô ấy.' },
    ],
    commonMistakesVi:
      "Người học hay nhầm 'needn't have' (không cần thiết nhưng đã làm) với 'shouldn't have' (một việc sai đã làm, đáng bị chê trách) dù ý nghĩa khác nhau.",
    exercises: [
      {
        id: 'en-b2-gr-modalnuance-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn dạng đúng: khả năng khá cao.',
        question: 'The delay ___ cause serious problems.',
        options: ['may well', 'needn\'t have', 'used to', 'ought'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-b2-gr-modalnuance-ex2',
        type: 'fill-blank',
        promptVi: 'Điền dạng đúng (nhớ về một kỷ niệm đã xảy ra).',
        sentenceTemplate: "I'll never forget ___ her for the first time.",
        wordBank: ['meeting', 'to meet', 'meet'],
        correctAnswer: 'meeting',
      },
      {
        id: 'en-b2-gr-modalnuance-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['about the exam', "you needn't have", 'worried'],
        correctOrder: ["you needn't have", 'worried', 'about the exam'],
      },
    ],
  },
];
