import type { GrammarTopic } from '../../types';

export const englishC2GrammarTopics: GrammarTopic[] = [
  {
    id: 'en-c2-gr-cleft-sentences',
    languageCode: 'en',
    level: 'C2',
    title: 'Cleft sentences',
    titleVi: 'Câu chẻ',
    explanationVi:
      "Câu chẻ tách một thành phần ra khỏi câu thông thường để nhấn mạnh nó. It-cleft: 'It + be + thành phần nhấn mạnh + that/who + phần còn lại.' Wh-cleft: 'What + mệnh đề + be + thành phần nhấn mạnh.'",
    structure: "It + be + X + that/who + ... (It-cleft) | What + S + V + be + X (Wh-cleft)",
    keyPoints: [
      "'It was the manager who approved the budget.' (nhấn mạnh 'the manager')",
      "'What we need is more time.' (nhấn mạnh 'more time')",
      'Cả hai cấu trúc đều trang trọng hơn và tạo hiệu ứng nhấn mạnh rõ rệt hơn câu thông thường',
    ],
    examples: [
      { id: 'en-c2-gr-cleft-s1', text: 'It was the manager who approved the budget.', translationVi: 'Chính người quản lý là người đã phê duyệt ngân sách.' },
      { id: 'en-c2-gr-cleft-s2', text: 'What we need is more time.', translationVi: 'Điều chúng ta cần là thêm thời gian.' },
      { id: 'en-c2-gr-cleft-s3', text: "It wasn't until midnight that they finished the report.", translationVi: 'Mãi đến nửa đêm họ mới hoàn thành báo cáo.' },
    ],
    commonMistakesVi:
      "Người học hay dùng sai thì của động từ 'be' trong câu chẻ, hoặc quên giữ nguyên cấu trúc mệnh đề sau 'what', ví dụ nói sai 'What we need more time' thay vì 'What we need is more time'.",
    exercises: [
      {
        id: 'en-c2-gr-cleft-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn câu chẻ đúng.',
        question: 'Choose the correct cleft sentence.',
        options: ['What we need is more time.', 'What we need more time.', 'Is what we need more time.', 'More time is what need we.'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-c2-gr-cleft-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '___ was the manager who approved the budget.',
        wordBank: ['It', 'What', 'That'],
        correctAnswer: 'It',
      },
      {
        id: 'en-c2-gr-cleft-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['that they finished the report', "it wasn't until midnight"],
        correctOrder: ["it wasn't until midnight", 'that they finished the report'],
      },
    ],
  },
];
