import type { Course } from '../../types';

/**
 * Phase 10 Milestone 4 proof-of-architecture sample for General English C2 —
 * NOT a full C2 curriculum. One unit, two lessons, proving the 'general'
 * track cleanly supports the topmost CEFR level. Labeled honestly via
 * `isSample: true`. Only created after the C1 sample (en-c1) was in place
 * and validated, per the Phase 10 curriculum expansion priority order.
 */
export const englishC2Course: Course = {
  id: 'en-c2',
  languageCode: 'en',
  level: 'C2',
  titleVi: 'Tiếng Anh C2 — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho trình độ C2: câu chẻ nhấn mạnh và ngôn ngữ rào đón trong văn phong học thuật. Đây là nội dung luyện tập tham khảo, chưa phải khóa học C2 đầy đủ.',
  unitIds: ['en-c2-u1-rhetorical-structures'],
  isSample: true,
};
