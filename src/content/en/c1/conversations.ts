import type { ConversationScenario } from '../../types';

export const englishC1ConversationScenarios: ConversationScenario[] = [
  {
    id: 'en-c1-conv-formal-qa',
    languageCode: 'en',
    level: 'C1',
    title: 'A formal Q&A session',
    titleVi: 'Phiên hỏi đáp trang trọng',
    descriptionVi: 'Luyện hội thoại trang trọng sau một buổi thuyết trình, dùng đảo ngữ nhấn mạnh và danh từ hóa.',
    contextVi: 'An vừa trình bày xong một báo cáo và đang trả lời câu hỏi từ khán giả.',
    dialogue: [
      { id: 'en-c1-qa-turn-01', speaker: 'A', text: 'Could you elaborate on the impact of this policy?', translationVi: 'Bạn có thể nói rõ hơn về tác động của chính sách này không?' },
      { id: 'en-c1-qa-turn-02', speaker: 'B', text: 'Certainly. The implementation of this policy led to a significant increase in efficiency.', translationVi: 'Chắc chắn rồi. Việc triển khai chính sách này đã dẫn đến sự gia tăng đáng kể về hiệu suất.' },
      { id: 'en-c1-qa-turn-03', speaker: 'A', text: 'Were there any unexpected challenges?', translationVi: 'Có thách thức bất ngờ nào không?' },
      { id: 'en-c1-qa-turn-04', speaker: 'B', text: 'Yes. Never before had our team faced such tight deadlines.', translationVi: 'Có. Chưa bao giờ nhóm chúng tôi phải đối mặt với thời hạn gấp gáp đến vậy.' },
      { id: 'en-c1-qa-turn-05', speaker: 'A', text: 'How did the team manage to overcome that?', translationVi: 'Nhóm đã xoay xở vượt qua điều đó như thế nào?' },
      { id: 'en-c1-qa-turn-06', speaker: 'B', text: 'Not only did we reorganize our priorities, but we also brought in additional support.', translationVi: 'Chúng tôi không những sắp xếp lại thứ tự ưu tiên, mà còn tìm thêm sự hỗ trợ.' },
      { id: 'en-c1-qa-turn-07', speaker: 'A', text: "What's your assessment of the long-term outcome?", translationVi: 'Đánh giá của bạn về kết quả dài hạn là gì?' },
      { id: 'en-c1-qa-turn-08', speaker: 'B', text: 'Our assessment suggests the benefits will only grow over time.', translationVi: 'Đánh giá của chúng tôi cho thấy lợi ích sẽ chỉ tăng thêm theo thời gian.' },
    ],
    relatedVocabularyIds: ['en-c1-l1-2-v1', 'en-c1-l1-1-v1', 'en-c1-l1-1-v2', 'en-c1-l1-2-v6'],
    task: {
      type: 'choose-reply',
      promptVi: "Ai đó hỏi 'Could you elaborate on the impact of this policy?'. Chọn câu trả lời trang trọng, phù hợp phong cách C1.",
      options: [
        { id: 'o1', text: 'Certainly. The implementation of this policy led to a significant increase in efficiency.' },
        { id: 'o2', text: 'I dunno, it was fine I guess.' },
        { id: 'o3', text: 'It did stuff, good stuff mostly.' },
        { id: 'o4', text: 'Ask someone else, not sure.' },
      ],
      correctOptionId: 'o1',
      explanationVi: "Trong bối cảnh trang trọng, nên trả lời bằng câu văn học thuật, dùng danh từ hóa ('the implementation of...') thay vì văn nói suồng sã.",
    },
  },
];
