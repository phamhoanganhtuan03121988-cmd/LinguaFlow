import type { ContentPack } from '../../types';
import { koreanA2Course } from './course';
import { koreanA2Units } from './units';
import { koreanA2DailyLifeLessons } from './lessons/dailyLife';
import { koreanA2TravelLessons } from './lessons/travel';
import { koreanA2ExperiencesLessons } from './lessons/experiences';
import { koreanA2GrammarTopics } from './grammar';
import { koreanA2ConversationScenarios } from './conversations';
import { koreanA2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning (unchanged for A2). */
export const koreanA2Pack: ContentPack = {
  course: koreanA2Course,
  units: koreanA2Units,
  lessons: [...koreanA2DailyLifeLessons, ...koreanA2TravelLessons, ...koreanA2ExperiencesLessons],
  grammarTopics: koreanA2GrammarTopics,
  conversationScenarios: koreanA2ConversationScenarios,
  writingItems: koreanA2WritingItems,
};
