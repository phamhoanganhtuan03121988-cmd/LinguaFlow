import type { ContentPack } from '../../types';
import { chineseA2Course } from './course';
import { chineseA2Units } from './units';
import { chineseA2DailyLifeLessons } from './lessons/dailyLife';
import { chineseA2TravelLessons } from './lessons/travel';
import { chineseA2ExperiencesLessons } from './lessons/experiences';
import { chineseA2GrammarTopics } from './grammar';
import { chineseA2ConversationScenarios } from './conversations';
import { chineseA2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning (unchanged for A2). */
export const chineseA2Pack: ContentPack = {
  course: chineseA2Course,
  units: chineseA2Units,
  lessons: [...chineseA2DailyLifeLessons, ...chineseA2TravelLessons, ...chineseA2ExperiencesLessons],
  grammarTopics: chineseA2GrammarTopics,
  conversationScenarios: chineseA2ConversationScenarios,
  writingItems: chineseA2WritingItems,
};
