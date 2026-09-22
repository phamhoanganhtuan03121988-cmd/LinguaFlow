import type { PlacementTest } from '../types';

export const koreanA1PlacementTest: PlacementTest = {
  id: 'placement-ko-a1',
  languageCode: 'ko',
  titleVi: 'Kiểm tra xếp lớp — Tiếng Hàn A1',
  descriptionVi:
    'Trả lời 10 câu hỏi ngắn để LinguaFlow gợi ý điểm bắt đầu phù hợp trong khoá Tiếng Hàn A1 hiện có.',
  questions: [
    // Vocabulary (3)
    {
      id: 'pt-ko-a1-v1',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ko-a1-v1-ex',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của từ '가족'.",
        question: '가족',
        options: ['Bạn bè', 'Gia đình', 'Công việc', 'Trường học'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-ko-a1-v2',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ko-a1-v2-ex',
        type: 'multiple-choice',
        promptVi: "Chọn từ tiếng Hàn đúng nghĩa với 'Cảm ơn'.",
        question: 'Cảm ơn',
        options: ['죄송합니다', '안녕하세요', '감사합니다', '안녕히 가세요'],
        correctOptionIndex: 2,
      },
    },
    {
      id: 'pt-ko-a1-v3',
      skill: 'vocabulary',
      exercise: {
        id: 'pt-ko-a1-v3-ex',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu.',
        sentenceTemplate: '제 ___은 민수예요.',
        wordBank: ['이름', '가족', '직업'],
        correctAnswer: '이름',
      },
    },
    // Grammar (3)
    {
      id: 'pt-ko-a1-g1',
      skill: 'grammar',
      exercise: {
        id: 'pt-ko-a1-g1-ex',
        type: 'multiple-choice',
        promptVi: "'학생' kết thúc bằng phụ âm. Chọn đuôi câu đúng.",
        question: '학생 + ___',
        options: ['이에요', '예요', '있어요', '왔어요'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-ko-a1-g2',
      skill: 'grammar',
      exercise: {
        id: 'pt-ko-a1-g2-ex',
        type: 'fill-blank',
        promptVi: "'저' kết thúc bằng nguyên âm. Điền trợ từ chủ đề đúng.",
        sentenceTemplate: '저___ 베트남 사람이에요.',
        wordBank: ['는', '은', '가'],
        correctAnswer: '는',
      },
    },
    {
      id: 'pt-ko-a1-g3',
      skill: 'grammar',
      exercise: {
        id: 'pt-ko-a1-g3-ex',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Tôi đến từ Việt Nam."',
        words: ['왔어요', '저는', '베트남에서'],
        correctOrder: ['저는', '베트남에서', '왔어요'],
      },
    },
    // Reading (2)
    {
      id: 'pt-ko-a1-r1',
      skill: 'reading',
      exercise: {
        id: 'pt-ko-a1-r1-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: '란은 학생이에요. 그녀는 하노이에서 왔어요. 그녀는 오빠가 한 명 있어요.\n란의 직업은 무엇이에요?',
        options: ['선생님', '학생', '회사원', '의사'],
        correctOptionIndex: 1,
      },
    },
    {
      id: 'pt-ko-a1-r2',
      skill: 'reading',
      exercise: {
        id: 'pt-ko-a1-r2-ex',
        type: 'multiple-choice',
        promptVi: 'Đọc đoạn văn ngắn và chọn đáp án đúng.',
        question: '민은 언니가 두 명 있어요. 그는 부모님과 같이 살아요.\n민은 언니가 몇 명 있어요?',
        options: ['한 명', '두 명', '세 명', '없어요'],
        correctOptionIndex: 1,
      },
    },
    // Listening (2) — the placement screen speaks `question` aloud via SpeakButton before showing options.
    {
      id: 'pt-ko-a1-l1',
      skill: 'listening',
      exercise: {
        id: 'pt-ko-a1-l1-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: '안녕하세요. 저는 민수예요.',
        options: ['Xin chào. Tôi là Minsu.', 'Tôi có một gia đình.', 'Tạm biệt.', 'Bạn khỏe không?'],
        correctOptionIndex: 0,
      },
    },
    {
      id: 'pt-ko-a1-l2',
      skill: 'listening',
      exercise: {
        id: 'pt-ko-a1-l2-ex',
        type: 'multiple-choice',
        promptVi: 'Nghe và chọn nghĩa đúng.',
        question: '저는 스무 살이에요.',
        options: ['Tôi là sinh viên.', 'Tôi hai mươi tuổi.', 'Tôi đến từ Việt Nam.', 'Cảm ơn bạn.'],
        correctOptionIndex: 1,
      },
    },
  ],
};
