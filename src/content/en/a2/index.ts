import type { ContentPack } from '../../types';
import { englishA2Course } from './course';
import { englishA2Units } from './units';
import { englishA2DailyLifeLessons } from './lessons/dailyLife';
import { englishA2TravelLessons } from './lessons/travel';
import { englishA2ExperiencesLessons } from './lessons/experiences';
import { englishA2GrammarTopics } from './grammar';
import { englishA2ConversationScenarios } from './conversations';

/** No writingItems — Latin script has no tracing need (see Part 7 of the Phase 9 spec). No placementTest — see src/content/ko/index.ts for the reasoning shared across A2 packs. */
export const englishA2Pack: ContentPack = {
  course: englishA2Course,
  units: englishA2Units,
  lessons: [...englishA2DailyLifeLessons, ...englishA2TravelLessons, ...englishA2ExperiencesLessons],
  grammarTopics: englishA2GrammarTopics,
  conversationScenarios: englishA2ConversationScenarios,
};
