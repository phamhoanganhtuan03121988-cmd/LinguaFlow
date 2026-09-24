import type { ContentPack } from '../../types';
import { englishC1Course } from './course';
import { englishC1Units } from './units';
import { englishC1Lessons } from './lessons';
import { englishC1GrammarTopics } from './grammar';
import { englishC1ConversationScenarios } from './conversations';

/**
 * Phase 10 Milestone 4 proof-of-architecture sample — deliberately small
 * (1 unit, 2 lessons, 1 grammar topic, 1 conversation), English only. Proves
 * the 'general' track's Course.level (TrackLevelId) and the Learning Hub's
 * getAvailableLevelsForTrack cleanly support C1 above B2, without claiming a
 * full C1 curriculum (isSample: true on the course triggers the honest
 * "Mẫu — đang phát triển" badge everywhere).
 */
export const englishC1Pack: ContentPack = {
  course: englishC1Course,
  units: englishC1Units,
  lessons: englishC1Lessons,
  grammarTopics: englishC1GrammarTopics,
  conversationScenarios: englishC1ConversationScenarios,
};
