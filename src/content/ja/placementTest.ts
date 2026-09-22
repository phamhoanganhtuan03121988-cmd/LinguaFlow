import type { PlacementTest } from '../types';

export const japaneseA1PlacementTest: PlacementTest = {
  id: 'placement-ja-a1',
  languageCode: 'ja',
  titleVi: 'Kiểm tra xếp lớp — Tiếng Nhật A1',
  descriptionVi:
    'Trả lời 10 câu hỏi ngắn để LinguaFlow gợi ý điểm bắt đầu phù hợp trong khoá Tiếng Nhật A1 hiện có.',
  questions: [
    // Vocabulary (3)
    {
      id: 'pt-ja-a1-v1',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ja-a1-v1-ex',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của từ '家族'.",
        question: '家族',
        options: ['Bạn bè', 'Gia đình', 'Công việc', 'Trường học'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-ja-a1-v2',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ja-a1-v2-ex',
        type: 'multiple-choice',
        promptVi: "Chọn từ tiếng Nhật đúng nghĩa với 'Cảm ơn'.",
        question: 'Cảm ơn',
        options: ['すみません', 'こんにちは', 'ありがとうございます', 'さようなら'],
        correctOptionIndex: 2,
      },
    },
    {
      id: 'pt-ja-a1-v3',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ja-a1-v3-ex',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '私の___は明秀です。',
        wordBank: ['名前', '家族', '仕事'],
        correctAnswer: '名前',
      },
    },
    // Grammar (3)
    {
      id: 'pt-ja-a1-g1',
      skill: 'grammar',
      exercise: {
        id: 'pt-ja-a1-g1-ex',
        type: 'multiple-choice',
        promptVi: 'Chọn từ đúng để hoàn thành câu.',
        question: '私は学生___。',
        options: ['です', 'は', 'の', 'か'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-ja-a1-g2',
      skill: 'grammar',
      exercise: {
        id: 'pt-ja-a1-g2-ex',
        type: 'fill-blank',
        promptVi: 'Điền trợ từ chủ đề còn thiếu.',
        sentenceTemplate: '私___学生です。',
        wordBank: ['は', 'を', 'に'],
        correctAnswer: 'は',
      },
    },
    {
      id: 'pt-ja-a1-g3',
      skill: 'grammar',
      exercise: {
        id: 'pt-ja-a1-g3-ex',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Đây là gia đình của tôi."',
        words: ['私の', 'これは', '家族です'],
        correctOrder: ['これは', '私の', '家族です'],
      },
    },
    // Reading (2)
    {
      id: 'pt-ja-a1-r1',
      skill: 'reading',
      exercise: {
        id: 'pt-ja-a1-r1-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: 'ランさんは学生です。彼女はハノイから来ました。彼女は兄が一人います。\nランさんの仕事は何ですか？',
        options: ['先生', '学生', 'エンジニア', '医者'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-ja-a1-r2',
      skill: 'reading',
      exercise: {
        id: 'pt-ja-a1-r2-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: 'ミンさんは姉が二人います。彼は両親と一緒に住んでいます。\nミンさんは姉が何人いますか？',
        options: ['一人', '二人', '三人', 'いません'],
        correctOptionIndex: 1,
      },
    },
    // Listening (2) — the placement screen speaks `question` aloud via SpeakButton before showing options.
    {
      id: 'pt-ja-a1-l1',
      skill: 'listening',
      exercise: {
        id: 'pt-ja-a1-l1-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: 'こんにちは。私はミンスです。',
        options: ['Xin chào. Tôi là Minsu.', 'Tôi có một gia đình.', 'Tạm biệt.', 'Bạn khỏe không?'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-ja-a1-l2',
      skill: 'listening',
      exercise: {
        id: 'pt-ja-a1-l2-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: '私は二十歳です。',
        options: ['Tôi là sinh viên.', 'Tôi hai mươi tuổi.', 'Tôi đến từ Việt Nam.', 'Cảm ơn bạn.'],
        correctOptionIndex: 1,
      },
    },
  ],
};
