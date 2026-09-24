import type { ContentPack } from '../../types';
import { chineseB1Course } from './course';
import { chineseB1Units } from './units';
import { chineseB1StructuresLessons } from './lessons/structures';
import { chineseB1ConnectorsLessons } from './lessons/connectors';
import { chineseB1OpinionsLessons } from './lessons/opinions';
import { chineseB1GrammarTopics } from './grammar';
import { chineseB1ConversationScenarios } from './conversations';
import { chineseB1WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const chineseB1Pack: ContentPack = {
  course: chineseB1Course,
  units: chineseB1Units,
  lessons: [...chineseB1StructuresLessons, ...chineseB1ConnectorsLessons, ...chineseB1OpinionsLessons],
  grammarTopics: chineseB1GrammarTopics,
  conversationScenarios: chineseB1ConversationScenarios,
  writingItems: chineseB1WritingItems,
};
