import type { PlacementTest } from '../types';

export const englishA1PlacementTest: PlacementTest = {
  id: 'placement-en-a1',
  languageCode: 'en',
  titleVi: 'Kiểm tra xếp lớp — Tiếng Anh A1',
  descriptionVi:
    'Trả lời 10 câu hỏi ngắn để LinguaFlow gợi ý điểm bắt đầu phù hợp trong khoá Tiếng Anh A1 hiện có.',
  questions: [
    // Vocabulary (3)
    {
      id: 'pt-en-a1-v1',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-en-a1-v1-ex',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của từ 'family'.",
        question: 'family',
        options: ['Bạn bè', 'Gia đình', 'Công việc', 'Trường học'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-en-a1-v2',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-en-a1-v2-ex',
        type: 'multiple-choice',
        promptVi: "Chọn từ tiếng Anh đúng nghĩa với 'Cảm ơn'.",
        question: 'Cảm ơn',
        options: ['Sorry', 'Please', 'Thank you', 'Goodbye'],
        correctOptionIndex: 2,
      },
    },
    {
      id: 'pt-en-a1-v3',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-en-a1-v3-ex',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: 'My ___ is Lan.',
        wordBank: ['name', 'family', 'job'],
        correctAnswer: 'name',
      },
    },
    // Grammar (3)
    {
      id: 'pt-en-a1-g1',
      skill: 'grammar',
      exercise: {
        id: 'pt-en-a1-g1-ex',
        type: 'multiple-choice',
        promptVi: 'Chọn từ đúng.',
        question: 'She ___ a teacher.',
        options: ['am', 'is', 'are', 'be'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-en-a1-g2',
      skill: 'grammar',
      exercise: {
        id: 'pt-en-a1-g2-ex',
        type: 'fill-blank',
        promptVi: 'Điền đại từ đúng.',
        sentenceTemplate: 'Minh and Lan are students. ___ are friends.',
        wordBank: ['They', 'He', 'She'],
        correctAnswer: 'They',
      },
    },
    {
      id: 'pt-en-a1-g3',
      skill: 'grammar',
      exercise: {
        id: 'pt-en-a1-g3-ex',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['from', "I'm", 'Vietnam'],
        correctOrder: ["I'm", 'from', 'Vietnam'],
      },
    },
    // Reading (2)
    {
      id: 'pt-en-a1-r1',
      skill: 'reading',
      exercise: {
        id: 'pt-en-a1-r1-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: "Lan is a student. She is from Hanoi. She has one brother.\nWhat is Lan's job?",
        options: ['Teacher', 'Student', 'Engineer', 'Doctor'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-en-a1-r2',
      skill: 'reading',
      exercise: {
        id: 'pt-en-a1-r2-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: 'Minh has two sisters. He lives with his parents.\nHow many sisters does Minh have?',
        options: ['One', 'Two', 'Three', 'None'],
        correctOptionIndex: 1,
      },
    },
    // Listening (2) — the placement screen speaks `question` aloud via SpeakButton before showing options.
    {
      id: 'pt-en-a1-l1',
      skill: 'listening',
      exercise: {
        id: 'pt-en-a1-l1-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn đáp án đúng.',
        question: 'Good morning',
        options: ['Good morning', 'Good night', 'Goodbye', 'Thank you'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-en-a1-l2',
      skill: 'listening',
      exercise: {
        id: 'pt-en-a1-l2-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn đáp án đúng.',
        question: 'How are you?',
        options: ['How are you?', "What's your name?", 'Where are you from?', 'See you later'],
        correctOptionIndex: 0,
      },
    },
  ],
};
