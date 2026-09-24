import type { ContentPack } from '../../types';
import { englishB1Course } from './course';
import { englishB1Units } from './units';
import { englishB1ExperiencesLessons } from './lessons/experiences';
import { englishB1HypotheticalsLessons } from './lessons/hypotheticals';
import { englishB1DescribingLessons } from './lessons/describing';
import { englishB1GrammarTopics } from './grammar';
import { englishB1ConversationScenarios } from './conversations';

/** No writingItems — Latin script has no tracing need (see Part 7 of the Phase 9 spec). No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const englishB1Pack: ContentPack = {
  course: englishB1Course,
  units: englishB1Units,
  lessons: [...englishB1ExperiencesLessons, ...englishB1HypotheticalsLessons, ...englishB1DescribingLessons],
  grammarTopics: englishB1GrammarTopics,
  conversationScenarios: englishB1ConversationScenarios,
};
