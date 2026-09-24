import type { Course } from '../../types';

export const japaneseB1Course: Course = {
  id: 'ja-b1',
  languageCode: 'ja',
  level: 'B1',
  titleVi: 'Tiếng Nhật B1 — Trung cấp',
  descriptionVi:
    'Lộ trình B1: kể kinh nghiệm bằng ~たことがあります, nêu ý kiến bằng ~と思います, đặt điều kiện bằng ~ば/~たら, diễn tả nghĩa vụ bằng ~なければなりません/~なくてもいいです, và phỏng đoán/tường thuật bằng ~ようです・みたいです và ~そうです.',
  unitIds: ['ja-b1-u1-experience-opinions', 'ja-b1-u2-conditions-obligations', 'ja-b1-u3-conjecture-hearsay'],
};
