import type { ContentPack } from '../../types';
import { japaneseB1Course } from './course';
import { japaneseB1Units } from './units';
import { japaneseB1ExperienceLessons } from './lessons/experience';
import { japaneseB1ConditionsLessons } from './lessons/conditions';
import { japaneseB1ConjectureLessons } from './lessons/conjecture';
import { japaneseB1GrammarTopics } from './grammar';
import { japaneseB1ConversationScenarios } from './conversations';
import { japaneseB1WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const japaneseB1Pack: ContentPack = {
  course: japaneseB1Course,
  units: japaneseB1Units,
  lessons: [...japaneseB1ExperienceLessons, ...japaneseB1ConditionsLessons, ...japaneseB1ConjectureLessons],
  grammarTopics: japaneseB1GrammarTopics,
  conversationScenarios: japaneseB1ConversationScenarios,
  writingItems: japaneseB1WritingItems,
};
