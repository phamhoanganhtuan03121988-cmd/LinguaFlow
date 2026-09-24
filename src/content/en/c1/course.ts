import type { Course } from '../../types';

/**
 * Phase 10 Milestone 4 proof-of-architecture sample for General English C1 —
 * NOT a full C1 curriculum. One unit, two lessons, proving the 'general'
 * track cleanly supports C1/C2 levels beyond B2. Labeled honestly via
 * `isSample: true` so the UI never implies a complete C1 course.
 */
export const englishC1Course: Course = {
  id: 'en-c1',
  languageCode: 'en',
  level: 'C1',
  titleVi: 'Tiếng Anh C1 — Mẫu',
  descriptionVi:
    'Mẫu nội dung khởi động cho trình độ C1: đảo ngữ nhấn mạnh và danh từ hóa trong văn phong học thuật/trang trọng. Đây là nội dung luyện tập tham khảo, chưa phải khóa học C1 đầy đủ.',
  unitIds: ['en-c1-u1-formal-expression'],
  isSample: true,
};
