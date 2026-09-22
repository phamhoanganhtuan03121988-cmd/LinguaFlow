import type { ContentPack } from '../../types';
import { japaneseA2Course } from './course';
import { japaneseA2Units } from './units';
import { japaneseA2DailyLifeLessons } from './lessons/dailyLife';
import { japaneseA2TravelLessons } from './lessons/travel';
import { japaneseA2ExperiencesLessons } from './lessons/experiences';
import { japaneseA2GrammarTopics } from './grammar';
import { japaneseA2ConversationScenarios } from './conversations';
import { japaneseA2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning (unchanged for A2). */
export const japaneseA2Pack: ContentPack = {
  course: japaneseA2Course,
  units: japaneseA2Units,
  lessons: [...japaneseA2DailyLifeLessons, ...japaneseA2TravelLessons, ...japaneseA2ExperiencesLessons],
  grammarTopics: japaneseA2GrammarTopics,
  conversationScenarios: japaneseA2ConversationScenarios,
  writingItems: japaneseA2WritingItems,
};
