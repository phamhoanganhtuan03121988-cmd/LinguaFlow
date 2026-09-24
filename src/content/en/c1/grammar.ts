import type { GrammarTopic } from '../../types';

export const englishC1GrammarTopics: GrammarTopic[] = [
  {
    id: 'en-c1-gr-inversion',
    languageCode: 'en',
    level: 'C1',
    title: 'Inversion for emphasis',
    titleVi: 'Đảo ngữ nhấn mạnh',
    explanationVi:
      "Khi câu bắt đầu bằng trạng từ phủ định/giới hạn (Not only, Never, Rarely, Seldom, Only after/when/by...), phần còn lại của mệnh đề đảo trợ động từ lên trước chủ ngữ, giống cấu trúc câu hỏi. Cách diễn đạt này trang trọng và nhấn mạnh hơn cấu trúc câu thông thường.",
    structure: 'Trạng từ phủ định/giới hạn + trợ động từ + chủ ngữ + động từ chính',
    keyPoints: [
      "'Not only did he apologize, but he also offered compensation.'",
      "'Rarely does a book capture such attention.'",
      "'Under no circumstances should you share this information.'",
    ],
    examples: [
      { id: 'en-c1-gr-inv-s1', text: 'Not only did he apologize, but he also offered compensation.', translationVi: 'Anh ấy không những xin lỗi, mà còn đề nghị bồi thường.' },
      { id: 'en-c1-gr-inv-s2', text: 'Rarely does a book capture such attention.', translationVi: 'Hiếm khi một cuốn sách thu hút được sự chú ý như vậy.' },
      { id: 'en-c1-gr-inv-s3', text: 'Under no circumstances should you share this information.', translationVi: 'Trong bất kỳ hoàn cảnh nào bạn cũng không được chia sẻ thông tin này.' },
    ],
    commonMistakesVi:
      "Người học hay quên đảo trợ động từ, chỉ đảo trạng từ lên đầu câu mà giữ nguyên trật tự chủ ngữ-động từ, ví dụ nói sai 'Rarely a book captures...' thay vì 'Rarely does a book capture...'.",
    exercises: [
      {
        id: 'en-c1-gr-inv-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn câu đảo ngữ đúng.',
        question: 'Choose the correct sentence.',
        options: ['Rarely does a book capture such attention.', 'Rarely a book captures such attention.', 'A book rarely does capture such attention.', 'Does rarely a book capture such attention.'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-c1-gr-inv-ex2',
        type: 'fill-blank',
        promptVi: 'Điền trợ động từ đúng.',
        sentenceTemplate: 'Under no circumstances ___ you share this information.',
        wordBank: ['should', 'do', 'are'],
        correctAnswer: 'should',
      },
      {
        id: 'en-c1-gr-inv-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['he also offered compensation', 'not only did he apologize', 'but'],
        correctOrder: ['not only did he apologize', 'but', 'he also offered compensation'],
      },
    ],
  },
];
