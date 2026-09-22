import type { PlacementTest } from '../types';

export const chineseA1PlacementTest: PlacementTest = {
  id: 'placement-zh-a1',
  languageCode: 'zh',
  titleVi: 'Kiểm tra xếp lớp — Tiếng Trung A1',
  descriptionVi:
    'Trả lời 10 câu hỏi ngắn để LinguaFlow gợi ý điểm bắt đầu phù hợp trong khoá Tiếng Trung A1 hiện có.',
  questions: [
    // Vocabulary (3)
    {
      id: 'pt-zh-a1-v1',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-zh-a1-v1-ex',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của từ '家'.",
        question: '家',
        options: ['Bạn bè', 'Gia đình / nhà', 'Công việc', 'Trường học'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-zh-a1-v2',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-zh-a1-v2-ex',
        type: 'multiple-choice',
        promptVi: "Chọn từ tiếng Trung đúng nghĩa với 'Cảm ơn'.",
        question: 'Cảm ơn',
        options: ['对不起', '你好', '谢谢', '再见'],
        correctOptionIndex: 2,
      },
    },
    {
      id: 'pt-zh-a1-v3',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-zh-a1-v3-ex',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '我___什么名字？',
        wordBank: ['叫', '是', '有'],
        correctAnswer: '叫',
      },
    },
    // Grammar (3)
    {
      id: 'pt-zh-a1-g1',
      skill: 'grammar',
      exercise: {
        id: 'pt-zh-a1-g1-ex',
        type: 'multiple-choice',
        promptVi: 'Chọn từ đúng.',
        question: '我___学生。',
        options: ['是', '不是', '吗', '的'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-zh-a1-g2',
      skill: 'grammar',
      exercise: {
        id: 'pt-zh-a1-g2-ex',
        type: 'fill-blank',
        promptVi: 'Điền trợ từ nghi vấn còn thiếu.',
        sentenceTemplate: '你是学生___？',
        wordBank: ['吗', '的', '是'],
        correctAnswer: '吗',
      },
    },
    {
      id: 'pt-zh-a1-g3',
      skill: 'grammar',
      exercise: {
        id: 'pt-zh-a1-g3-ex',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Đây là nhà của tôi."',
        words: ['我的', '这是', '家'],
        correctOrder: ['这是', '我的', '家'],
      },
    },
    // Reading (2)
    {
      id: 'pt-zh-a1-r1',
      skill: 'reading',
      exercise: {
        id: 'pt-zh-a1-r1-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: '兰是学生。她从河内来。她有一个哥哥。\n兰是做什么工作的？',
        options: ['老师', '学生', '工程师', '医生'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-zh-a1-r2',
      skill: 'reading',
      exercise: {
        id: 'pt-zh-a1-r2-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: '明有两个姐姐。他和父母一起住。\n明有几个姐姐？',
        options: ['一个', '两个', '三个', '没有'],
        correctOptionIndex: 1,
      },
    },
    // Listening (2) — the placement screen speaks `question` aloud via SpeakButton before showing options.
    {
      id: 'pt-zh-a1-l1',
      skill: 'listening',
      exercise: {
        id: 'pt-zh-a1-l1-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: '你好。我叫明秀。',
        options: ['Xin chào. Tôi tên là Minsu.', 'Tôi có một gia đình.', 'Tạm biệt.', 'Bạn khỏe không?'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-zh-a1-l2',
      skill: 'listening',
      exercise: {
        id: 'pt-zh-a1-l2-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: '我二十岁。',
        options: ['Tôi là sinh viên.', 'Tôi hai mươi tuổi.', 'Tôi đến từ Việt Nam.', 'Cảm ơn bạn.'],
        correctOptionIndex: 1,
      },
    },
  ],
};
