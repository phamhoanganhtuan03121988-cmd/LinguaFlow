import type { ContentPack } from '../../types';
import { englishC2Course } from './course';
import { englishC2Units } from './units';
import { englishC2Lessons } from './lessons';
import { englishC2GrammarTopics } from './grammar';
import { englishC2ConversationScenarios } from './conversations';

/**
 * Phase 10 Milestone 4 proof-of-architecture sample — deliberately small
 * (1 unit, 2 lessons, 1 grammar topic, 1 conversation), English only, created
 * only after the C1 sample (en-c1) was stable. Proves the 'general' track's
 * Course.level (TrackLevelId) and the Learning Hub cleanly support the
 * topmost CEFR level. isSample: true triggers the honest
 * "Mẫu — đang phát triển" badge everywhere — never a claim of a full C2 course.
 */
export const englishC2Pack: ContentPack = {
  course: englishC2Course,
  units: englishC2Units,
  lessons: englishC2Lessons,
  grammarTopics: englishC2GrammarTopics,
  conversationScenarios: englishC2ConversationScenarios,
};
