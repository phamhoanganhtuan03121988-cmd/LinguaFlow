import type { ContentPack } from '../../types';
import { englishB2Course } from './course';
import { englishB2Units } from './units';
import { englishB2RegretLessons } from './lessons/regret';
import { englishB2ReportingLessons } from './lessons/reporting';
import { englishB2DiscourseLessons } from './lessons/discourse';
import { englishB2GrammarTopics } from './grammar';
import { englishB2ConversationScenarios } from './conversations';

/** No writingItems — Latin script has no tracing need (see Part 7 of the Phase 9 spec). No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const englishB2Pack: ContentPack = {
  course: englishB2Course,
  units: englishB2Units,
  lessons: [...englishB2RegretLessons, ...englishB2ReportingLessons, ...englishB2DiscourseLessons],
  grammarTopics: englishB2GrammarTopics,
  conversationScenarios: englishB2ConversationScenarios,
};
