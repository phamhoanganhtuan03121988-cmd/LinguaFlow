import type { ConversationScenario } from '../../types';

export const englishC2ConversationScenarios: ConversationScenario[] = [
  {
    id: 'en-c2-conv-academic-panel',
    languageCode: 'en',
    level: 'C2',
    title: 'An academic panel discussion',
    titleVi: 'Buổi thảo luận học thuật',
    descriptionVi: 'Luyện hội thoại học thuật, dùng câu chẻ để nhấn mạnh và ngôn ngữ rào đón để lập luận thận trọng.',
    contextVi: 'An và Minh đang tham gia một buổi thảo luận học thuật về kết quả một nghiên cứu.',
    dialogue: [
      { id: 'en-c2-panel-turn-01', speaker: 'A', text: "What's your take on the study's conclusions?", translationVi: 'Ý kiến của bạn về kết luận của nghiên cứu này là gì?' },
      { id: 'en-c2-panel-turn-02', speaker: 'B', text: 'It could be argued that the sample size was too small to be conclusive.', translationVi: 'Có thể lập luận rằng cỡ mẫu quá nhỏ để đưa ra kết luận chắc chắn.' },
      { id: 'en-c2-panel-turn-03', speaker: 'A', text: 'What was it that concerned you most?', translationVi: 'Điều gì khiến bạn lo ngại nhất?' },
      { id: 'en-c2-panel-turn-04', speaker: 'B', text: 'What concerned me most was the lack of a control group.', translationVi: 'Điều khiến tôi lo ngại nhất là việc thiếu nhóm đối chứng.' },
      { id: 'en-c2-panel-turn-05', speaker: 'A', text: 'Do you think the findings are still useful?', translationVi: 'Bạn có nghĩ những phát hiện này vẫn hữu ích không?' },
      { id: 'en-c2-panel-turn-06', speaker: 'B', text: 'There is reason to believe they offer a plausible starting point, even if inconclusive.', translationVi: 'Có lý do để tin rằng chúng đưa ra một điểm khởi đầu hợp lý, dù chưa có kết luận rõ ràng.' },
      { id: 'en-c2-panel-turn-07', speaker: 'A', text: 'So it was the methodology, not the topic, that raised concerns?', translationVi: 'Vậy là chính phương pháp nghiên cứu, chứ không phải chủ đề, mới là điều gây lo ngại?' },
      { id: 'en-c2-panel-turn-08', speaker: 'B', text: "Precisely. It would seem that a follow-up study with a larger sample is warranted.", translationVi: 'Chính xác. Có vẻ như một nghiên cứu tiếp theo với cỡ mẫu lớn hơn là cần thiết.' },
    ],
    relatedVocabularyIds: ['en-c2-l1-2-v1', 'en-c2-l1-2-v2', 'en-c2-l1-1-v2', 'en-c2-l1-2-v3'],
    task: {
      type: 'choose-reply',
      promptVi: "Ai đó hỏi 'What's your take on the study's conclusions?'. Chọn câu trả lời phù hợp với văn phong học thuật thận trọng.",
      options: [
        { id: 'o1', text: 'It could be argued that the sample size was too small to be conclusive.' },
        { id: 'o2', text: 'It was totally wrong, everyone knows that.' },
        { id: 'o3', text: 'I have no idea, never read it.' },
        { id: 'o4', text: 'Who cares about this study anyway.' },
      ],
      correctOptionId: 'o1',
      explanationVi: "Trong thảo luận học thuật, cần dùng ngôn ngữ rào đón ('It could be argued that...') để nêu ý kiến một cách thận trọng, tránh khẳng định tuyệt đối thiếu căn cứ.",
    },
  },
];
