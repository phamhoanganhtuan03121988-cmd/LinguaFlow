import type { Lesson } from '../../types';

export const englishC2Lessons: Lesson[] = [
  {
    id: 'en-c2-l1-1-cleft-sentences',
    unitId: 'en-c2-u1-rhetorical-structures',
    title: 'Cleft sentences for emphasis',
    titleVi: 'Câu chẻ nhấn mạnh',
    objectiveVi: "Nhấn mạnh chính xác một thành phần trong câu bằng cấu trúc câu chẻ 'It...that' và 'What...is'.",
    estimatedMinutes: 8,
    grammarNoteVi:
      "Câu chẻ 'It' (It-cleft): 'It + be + thành phần cần nhấn mạnh + that/who + phần còn lại' — 'It was John who broke the vase.' Câu chẻ 'What' (Wh-cleft): 'What + mệnh đề + be + thành phần cần nhấn mạnh' — 'What surprised me was his reaction.' Cả hai đều tách riêng một thành phần để làm nổi bật nó hơn so với câu thông thường.",
    vocabulary: [
      { id: 'en-c2-l1-1-v1', term: 'it-cleft', translationVi: 'Câu chẻ dạng It', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-1-s1' },
      { id: 'en-c2-l1-1-v2', term: 'wh-cleft', translationVi: 'Câu chẻ dạng What', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-1-s2' },
      { id: 'en-c2-l1-1-v3', term: 'what strikes me most', translationVi: 'Điều khiến tôi ấn tượng nhất', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-1-s3' },
      { id: 'en-c2-l1-1-v4', term: 'to single out', translationVi: 'Tách riêng ra để nhấn mạnh', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-1-v5', term: 'startling', translationVi: 'Gây sửng sốt', partOfSpeech: 'adjective' },
      { id: 'en-c2-l1-1-v6', term: 'undeniably', translationVi: 'Không thể phủ nhận', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-1-v7', term: 'attribute (something) to', translationVi: 'Quy cho, cho là do', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-1-v8', term: 'the very reason', translationVi: 'Chính là lý do', partOfSpeech: 'phrase' },
    ],
    sentences: [
      { id: 'en-c2-l1-1-s1', text: 'It was John who broke the vase, not his sister.', translationVi: 'Chính John là người đã làm vỡ chiếc bình, không phải em gái anh ấy.' },
      { id: 'en-c2-l1-1-s2', text: 'What surprised me most was how calmly she reacted.', translationVi: 'Điều khiến tôi ngạc nhiên nhất là cách cô ấy phản ứng bình tĩnh đến vậy.' },
      { id: 'en-c2-l1-1-s3', text: 'What strikes me most about the proposal is its simplicity.', translationVi: 'Điều khiến tôi ấn tượng nhất về đề xuất này là sự đơn giản của nó.' },
    ],
    exercises: [
      {
        id: 'en-c2-l1-1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn câu chẻ đúng nhấn mạnh 'John'.",
        question: 'Choose the correct cleft sentence emphasizing "John".',
        options: ['It was John who broke the vase.', 'John was it who broke the vase.', 'It broke John the vase who.', 'Was it John the vase broke.'],
        correctOptionIndex: 0,
      },
      {
        id: 'en-c2-l1-1-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu cho câu chẻ dạng What.',
        sentenceTemplate: '___ surprised me most was how calmly she reacted.',
        wordBank: ['What', 'It', 'That'],
        correctAnswer: 'What',
      },
      {
        id: 'en-c2-l1-1-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['is its simplicity', 'what strikes me most about the proposal'],
        correctOrder: ['what strikes me most about the proposal', 'is its simplicity'],
      },
    ],
  },
  {
    id: 'en-c2-l1-2-academic-hedging',
    unitId: 'en-c2-u1-rhetorical-structures',
    title: 'Academic hedging language',
    titleVi: 'Ngôn ngữ rào đón học thuật',
    objectiveVi: 'Diễn đạt lập luận một cách thận trọng, khách quan bằng ngôn ngữ rào đón (hedging) trong văn phong học thuật.',
    estimatedMinutes: 8,
    grammarNoteVi:
      "Ngôn ngữ rào đón (hedging) làm giảm mức độ khẳng định tuyệt đối của một lập luận, thể hiện sự thận trọng học thuật: 'It could be argued that...', 'There is reason to believe that...', 'It would seem that...'. Đặc trưng của văn phong C2 khi tránh khẳng định quá chắc chắn thiếu bằng chứng.",
    vocabulary: [
      { id: 'en-c2-l1-2-v1', term: 'it could be argued that', translationVi: 'Có thể lập luận rằng', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-2-s1' },
      { id: 'en-c2-l1-2-v2', term: 'there is reason to believe that', translationVi: 'Có lý do để tin rằng', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-2-s2' },
      { id: 'en-c2-l1-2-v3', term: 'it would seem that', translationVi: 'Có vẻ như là', partOfSpeech: 'phrase', exampleSentenceId: 'en-c2-l1-2-s3' },
      { id: 'en-c2-l1-2-v4', term: 'arguably', translationVi: 'Có thể nói là (một cách thận trọng)', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-2-v5', term: 'to some extent', translationVi: 'Ở một mức độ nào đó', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-2-v6', term: 'tend to suggest', translationVi: 'Có xu hướng cho thấy', partOfSpeech: 'phrase' },
      { id: 'en-c2-l1-2-v7', term: 'inconclusive', translationVi: 'Chưa có kết luận rõ ràng', partOfSpeech: 'adjective' },
      { id: 'en-c2-l1-2-v8', term: 'a plausible explanation', translationVi: 'Một cách giải thích hợp lý', partOfSpeech: 'phrase' },
    ],
    sentences: [
      { id: 'en-c2-l1-2-s1', text: 'It could be argued that the policy has had mixed results.', translationVi: 'Có thể lập luận rằng chính sách này đã mang lại kết quả trái chiều.' },
      { id: 'en-c2-l1-2-s2', text: 'There is reason to believe that the data was incomplete.', translationVi: 'Có lý do để tin rằng dữ liệu chưa đầy đủ.' },
      { id: 'en-c2-l1-2-s3', text: 'It would seem that further research is needed before any firm conclusions can be drawn.', translationVi: 'Có vẻ như cần thêm nghiên cứu trước khi có thể đưa ra bất kỳ kết luận chắc chắn nào.' },
    ],
    exercises: [
      {
        id: 'en-c2-l1-2-ex1',
        type: 'multiple-choice',
        promptVi: 'Chọn cách diễn đạt thận trọng, học thuật phù hợp nhất.',
        question: 'Choose the most appropriately hedged academic statement.',
        options: [
          'It could be argued that the policy has had mixed results.',
          'The policy is obviously a total failure.',
          'Everyone agrees the policy was perfect.',
          'The policy definitely worked for everyone.',
        ],
        correctOptionIndex: 0,
      },
      {
        id: 'en-c2-l1-2-ex2',
        type: 'fill-blank',
        promptVi: 'Điền cụm từ rào đón còn thiếu.',
        sentenceTemplate: '___ that the data was incomplete.',
        wordBank: ['There is reason to believe', 'It is a fact', 'Everybody knows'],
        correctAnswer: 'There is reason to believe',
      },
      {
        id: 'en-c2-l1-2-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng.',
        words: ['further research is needed', 'it would seem that', 'before any firm conclusions can be drawn'],
        correctOrder: ['it would seem that', 'further research is needed', 'before any firm conclusions can be drawn'],
      },
    ],
  },
];
