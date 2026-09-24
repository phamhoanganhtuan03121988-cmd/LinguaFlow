import type { LanguageCode } from '@/src/data/languages';
import type { TrackLevelId } from './types';

export type TrackType = 'general' | 'exam';

/**
 * Whether a track's `levels` are official proficiency levels (general CEFR,
 * TOPIK, HSK, JLPT — each level is a real, named stage of the framework) or
 * learner-chosen target options (TOEIC/IELTS — "550" or "6.5" is a score/band
 * a learner is aiming for, not an official "level" ETS/IELTS defines). UI
 * copy must read differently for the two: "Trình độ" (level) vs "Mục tiêu"
 * (target) — see Part 1/2 of the Phase 10 audit.
 */
export type TrackLevelKind = 'level' | 'target';

/**
 * Static registry of every learning track LinguaFlow's UI knows how to offer,
 * independent of whether content exists yet for a given level — content
 * availability is checked separately via the loader (getCourseForLanguage /
 * getAvailableLevelsForTrack), never hard-coded here. `levels` lists the
 * FULL official level set for the track (see Part 20 of the Phase 10 spec)
 * so the Level Selector can show "đang phát triển" for levels with no
 * content yet, rather than silently hiding them.
 *
 * These level ids and descriptions reflect each exam's own official
 * terminology — not a claimed equivalence to CEFR. Any CEFR mapping shown
 * elsewhere in the app must be explicitly labeled as an external/reference
 * mapping, never asserted as identical.
 */
export interface LearningTrack {
  id: string;
  languageCode: LanguageCode;
  name: string;
  shortName: string;
  type: TrackType;
  /** Official level ids (or, when levelKind is 'target', target score/band options), in ascending order. */
  levels: TrackLevelId[];
  /** See TrackLevelKind. Defaults to 'level' when omitted — general/TOPIK/HSK/JLPT don't need to set it. */
  levelKind?: TrackLevelKind;
  /** Optional framework version tag (e.g. HSK's 2021 "3.0" revision) shown alongside the track name. Not a claim that every historical administration matches this version. */
  frameworkVersion?: string;
  descriptionVi: string;
}

const GENERAL_LEVELS: TrackLevelId[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'general',
    languageCode: 'en',
    name: 'General English',
    shortName: 'General',
    type: 'general',
    levels: GENERAL_LEVELS,
    descriptionVi: 'Lộ trình tiếng Anh tổng quát theo khung tham chiếu CEFR (A1–C2).',
  },
  {
    id: 'toeic',
    languageCode: 'en',
    name: 'TOEIC',
    shortName: 'TOEIC',
    type: 'exam',
    levelKind: 'target',
    levels: ['foundation', '450', '550', '650', '750', '850', '900'],
    descriptionVi:
      'Chuẩn bị cho TOEIC Listening & Reading — bài thi trắc nghiệm 200 câu gồm phần Nghe và Đọc, mỗi phần 5–495 điểm, tổng điểm 10–990 (theo ETS). Các mốc 450/550/650... là MỤC TIÊU điểm số bạn tự chọn, không phải "cấp độ chính thức" do ETS quy định. Đây là nội dung luyện tập tham khảo, không phải mô phỏng đề thi chính thức.',
  },
  {
    id: 'ielts',
    languageCode: 'en',
    name: 'IELTS',
    shortName: 'IELTS',
    type: 'exam',
    levelKind: 'target',
    levels: ['foundation', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
    descriptionVi:
      'Chuẩn bị cho IELTS — thang điểm band score 0–9 (bước 0.5), đánh giá 4 kỹ năng Nghe, Đọc, Viết, Nói. Các mốc band 4.0/4.5/5.0... là MỤC TIÊU bạn tự chọn, không phải "cấp độ chính thức" do IELTS quy định. Đây là nội dung luyện tập tham khảo, không phải mô phỏng đề thi chính thức.',
  },
  {
    id: 'general',
    languageCode: 'ko',
    name: 'Tiếng Hàn tổng quát',
    shortName: 'General',
    type: 'general',
    levels: GENERAL_LEVELS,
    descriptionVi: 'Lộ trình tiếng Hàn tổng quát theo khung tham chiếu CEFR (A1–C2).',
  },
  {
    id: 'topik',
    languageCode: 'ko',
    name: 'TOPIK',
    shortName: 'TOPIK',
    type: 'exam',
    levels: ['1', '2', '3', '4', '5', '6'],
    descriptionVi:
      'Chuẩn bị cho TOPIK (Test of Proficiency in Korean) — 6 cấp độ, trong đó TOPIK I gồm cấp 1–2 và TOPIK II gồm cấp 3–6. Đây là nội dung luyện tập tham khảo, không phải mô phỏng đề thi chính thức.',
  },
  {
    id: 'general',
    languageCode: 'zh',
    name: 'Tiếng Trung tổng quát',
    shortName: 'General',
    type: 'general',
    levels: GENERAL_LEVELS,
    descriptionVi: 'Lộ trình tiếng Trung tổng quát theo khung tham chiếu CEFR (A1–C2).',
  },
  {
    id: 'hsk',
    languageCode: 'zh',
    name: 'HSK',
    shortName: 'HSK',
    type: 'exam',
    levels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    frameworkVersion: 'HSK 3.0',
    descriptionVi:
      'Chuẩn bị cho HSK — khung HSK 3.0 (ban hành 2021) hiện có 9 cấp độ (HSK 1–9), tách biệt với thang CEFR. Một số đơn vị tổ chức thi vẫn đang dùng khung HSK cũ (2009, 6 cấp) song song; nội dung này theo khung 3.0 và không khẳng định tương đương với mọi kỳ thi HSK đã/đang tổ chức. Đây là nội dung luyện tập tham khảo, không phải mô phỏng đề thi chính thức.',
  },
  {
    id: 'general',
    languageCode: 'ja',
    name: 'Tiếng Nhật tổng quát',
    shortName: 'General',
    type: 'general',
    levels: GENERAL_LEVELS,
    descriptionVi: 'Lộ trình tiếng Nhật tổng quát theo khung tham chiếu CEFR (A1–C2).',
  },
  {
    id: 'jlpt',
    languageCode: 'ja',
    name: 'JLPT',
    shortName: 'JLPT',
    type: 'exam',
    levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
    descriptionVi:
      'Chuẩn bị cho JLPT (Japanese-Language Proficiency Test) — 5 cấp độ N5 đến N1, N5 dễ nhất và N1 khó nhất. Đây là nội dung luyện tập tham khảo, không phải mô phỏng đề thi chính thức.',
  },
];

export function getTracksForLanguage(code: LanguageCode | null | undefined): LearningTrack[] {
  if (!code) return [];
  return LEARNING_TRACKS.filter((track) => track.languageCode === code);
}

export function getTrack(code: LanguageCode | null | undefined, trackId: string): LearningTrack | undefined {
  if (!code) return undefined;
  return LEARNING_TRACKS.find((track) => track.languageCode === code && track.id === trackId);
}

/**
 * Human-readable label for a level id within a track — mostly the id itself.
 * Deliberately does NOT prefix "Band"/"Level" for target-score tracks
 * (TOEIC/IELTS): combined with the track's own name/shortName at call sites
 * (e.g. "TOEIC 650", "IELTS 6.5"), never "IELTS Band 6.5" — see Part 1/2 of
 * the Phase 10 audit ("Mục tiêu TOEIC 650" / "Mục tiêu IELTS 6.5").
 *
 * levelId stays a plain `string` (not TrackLevelId) because every caller
 * resolves it from useAppStore/loader values (activeLevelId, trackGoal.
 * targetLevelId, getAvailableLevelsForTrack's return) which are themselves
 * plain strings by design — see Part 5 of the Phase 10 audit, which scopes
 * the TrackLevelId type to Course/GrammarTopic/ConversationScenario.level
 * only, not the store/loader layer.
 */
export function formatLevelLabel(track: LearningTrack, levelId: string): string {
  if (levelId === 'foundation') return 'Foundation';
  return levelId;
}
