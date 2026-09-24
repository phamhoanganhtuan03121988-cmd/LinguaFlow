import type { ContentPack } from '../../types';
import { chineseB2Course } from './course';
import { chineseB2Units } from './units';
import { chineseB2EmphasisOutcomesLessons } from './lessons/emphasis-outcomes';
import { chineseB2EmphasisConcessionLessons } from './lessons/emphasis-concession';
import { chineseB2DiscussionConclusionLessons } from './lessons/discussion-conclusion';
import { chineseB2GrammarTopics } from './grammar';
import { chineseB2ConversationScenarios } from './conversations';
import { chineseB2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const chineseB2Pack: ContentPack = {
  course: chineseB2Course,
  units: chineseB2Units,
  lessons: [...chineseB2EmphasisOutcomesLessons, ...chineseB2EmphasisConcessionLessons, ...chineseB2DiscussionConclusionLessons],
  grammarTopics: chineseB2GrammarTopics,
  conversationScenarios: chineseB2ConversationScenarios,
  writingItems: chineseB2WritingItems,
};
