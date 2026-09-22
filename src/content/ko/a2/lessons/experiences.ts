import type { Lesson } from '../../../types';

export const koreanA2ExperiencesLessons: Lesson[] = [
  {
    id: 'ko-a2-l3-1-past-experiences',
    unitId: 'ko-a2-u3-experiences',
    title: '과거 경험',
    titleVi: 'Trải nghiệm trong quá khứ',
    objectiveVi: "Kể lại trải nghiệm đã qua và nối câu bằng '아/어서' (vì nên/rồi).",
    estimatedMinutes: 7,
    grammarNoteVi:
      "아/어서 nối hai vế câu theo quan hệ nguyên nhân-kết quả hoặc trình tự thời gian. Ví dụ: 시간이 없어서 못 갔어요 (Vì không có thời gian nên tôi đã không đi được).",
    vocabulary: [
      { id: 'ko-a2-l3-1-v1', term: '작년', translationVi: 'Năm ngoái', partOfSpeech: 'phrase', exampleSentenceId: 'ko-a2-l3-1-s1', usageNoteVi: 'Cách đọc: jangnyeon' },
      { id: 'ko-a2-l3-1-v2', term: '여행하다', translationVi: 'Đi du lịch', partOfSpeech: 'verb', exampleSentenceId: 'ko-a2-l3-1-s2', usageNoteVi: 'Cách đọc: yeohaenghada' },
      { id: 'ko-a2-l3-1-v3', term: '잊을 수 없다', translationVi: 'Không thể quên', partOfSpeech: 'phrase', usageNoteVi: 'Cách đọc: ijeul su eopda' },
      { id: 'ko-a2-l3-1-v4', term: '전에', translationVi: 'Trước đây', partOfSpeech: 'phrase', exampleSentenceId: 'ko-a2-l3-1-s3', usageNoteVi: 'Cách đọc: jeone' },
      { id: 'ko-a2-l3-1-v5', term: '경험', translationVi: 'Trải nghiệm', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: gyeongheom' },
    ],
    sentences: [
      { id: 'ko-a2-l3-1-s1', text: '작년에 저는 일본에 여행했어요.', translationVi: '(jangnyeone jeoneun ilbone yeohaenghaesseoyo.) Năm ngoái tôi đã đi du lịch Nhật Bản.' },
      { id: 'ko-a2-l3-1-s2', text: '시간이 없어서 못 갔어요.', translationVi: '(sigani eopseoseo mot gasseoyo.) Vì không có thời gian nên tôi đã không đi được.' },
      { id: 'ko-a2-l3-1-s3', text: '삼 년 전에 그 일이 있었어요.', translationVi: '(sam nyeon jeone geu iri isseosseoyo.) Chuyện đó đã xảy ra ba năm trước.' },
    ],
    exercises: [
      {
        id: 'ko-a2-l3-1-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng quá khứ đúng của '여행하다'.",
        question: '작년에 저는 일본에 ___. (여행하다)',
        options: ['여행해요', '여행했어요', '여행하고 있어요', '여행할 거예요'],
        correctOptionIndex: 1,
      },
      {
        id: 'ko-a2-l3-1-ex2',
        type: 'fill-blank',
        promptVi: "Điền từ nối nguyên nhân-kết quả còn thiếu.",
        sentenceTemplate: '시간이 없___ 못 갔어요.',
        wordBank: ['어서', '지만', '보다'],
        correctAnswer: '어서',
      },
      {
        id: 'ko-a2-l3-1-ex3',
        type: 'multiple-choice',
        promptVi: "Chọn nghĩa đúng của '잊을 수 없다'.",
        question: '잊을 수 없다',
        options: ['Không thể quên', 'Có thể nhớ', 'Muốn quên', 'Đã quên rồi'],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: 'ko-a2-l3-2-future-plans',
    unitId: 'ko-a2-u3-experiences',
    title: '미래 계획과 초대',
    titleVi: 'Kế hoạch tương lai và lời mời',
    objectiveVi: "Nói về kế hoạch bằng '-(으)ㄹ 거예요' và mời ai đó.",
    estimatedMinutes: 7,
    grammarNoteVi:
      "-(으)ㄹ 거예요 diễn tả dự định/kế hoạch tương lai. Gốc động từ kết thúc phụ âm thêm 을 거예요, kết thúc nguyên âm thêm ㄹ 거예요. Ví dụ: 가다→갈 거예요, 먹다→먹을 거예요.",
    vocabulary: [
      { id: 'ko-a2-l3-2-v1', term: '다음 달', translationVi: 'Tháng tới', partOfSpeech: 'phrase', exampleSentenceId: 'ko-a2-l3-2-s1', usageNoteVi: 'Cách đọc: daeum dal' },
      { id: 'ko-a2-l3-2-v2', term: '같이 가실래요?', translationVi: 'Bạn có muốn đi cùng không?', partOfSpeech: 'phrase', exampleSentenceId: 'ko-a2-l3-2-s2', usageNoteVi: 'Cách đọc: gachi gasillaeyo?' },
      { id: 'ko-a2-l3-2-v3', term: '좋아요, 갈게요', translationVi: 'Được, tôi sẽ đi', partOfSpeech: 'phrase', usageNoteVi: 'Cách đọc: joayo, galgeyo' },
      { id: 'ko-a2-l3-2-v4', term: '미안하지만 못 가요', translationVi: 'Xin lỗi nhưng tôi không đi được', partOfSpeech: 'phrase', exampleSentenceId: 'ko-a2-l3-2-s3', usageNoteVi: 'Cách đọc: mianhajiman mot gayo' },
      { id: 'ko-a2-l3-2-v5', term: '계획', translationVi: 'Kế hoạch', partOfSpeech: 'noun', usageNoteVi: 'Cách đọc: gyehoek' },
    ],
    sentences: [
      { id: 'ko-a2-l3-2-s1', text: '다음 달에 저는 유학 갈 거예요.', translationVi: '(daeum dare jeoneun yuhak gal geoyeyo.) Tháng tới tôi sẽ đi du học.' },
      { id: 'ko-a2-l3-2-s2', text: '저녁 같이 가실래요?', translationVi: '(jeonyeok gachi gasillaeyo?) Bạn có muốn đi ăn tối cùng không?' },
      { id: 'ko-a2-l3-2-s3', text: '미안하지만 저는 못 가요.', translationVi: '(mianhajiman jeoneun mot gayo.) Xin lỗi nhưng tôi không đi được.' },
    ],
    exercises: [
      {
        id: 'ko-a2-l3-2-ex1',
        type: 'multiple-choice',
        promptVi: "Chọn dạng tương lai đúng của '가다'.",
        question: '다음 달에 저는 유학 ___. (가다)',
        options: ['가요', '갔어요', '갈 거예요', '가고 있어요'],
        correctOptionIndex: 2,
      },
      {
        id: 'ko-a2-l3-2-ex2',
        type: 'fill-blank',
        promptVi: 'Điền từ còn thiếu để mời ai đó.',
        sentenceTemplate: '저녁 같이 ___?',
        wordBank: ['가실래요', '갔어요', '가서'],
        correctAnswer: '가실래요',
      },
      {
        id: 'ko-a2-l3-2-ex3',
        type: 'word-order',
        promptVi: 'Sắp xếp thành câu đúng: "Tháng tới tôi sẽ đi du học."',
        words: ['갈 거예요', '다음 달에', '저는', '유학'],
        correctOrder: ['다음 달에', '저는', '유학', '갈 거예요'],
      },
    ],
  },
];
