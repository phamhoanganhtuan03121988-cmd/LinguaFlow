import type { ContentPack } from '../types';
import { chineseA1Course } from './course';
import { chineseA1Units } from './units';
import { chineseGreetingsLessons } from './lessons/greetings';
import { chineseIntroductionsLessons } from './lessons/introductions';
import { chineseFamilyLessons } from './lessons/family';
import { chineseA1GrammarTopics } from './grammar';
import { chineseA1ConversationScenarios } from './conversations';
import { chineseA1PlacementTest } from './placementTest';

export const chineseA1Pack: ContentPack = {
  course: chineseA1Course,
  units: chineseA1Units,
  lessons: [...chineseGreetingsLessons, ...chineseIntroductionsLessons, ...chineseFamilyLessons],
  grammarTopics: chineseA1GrammarTopics,
  conversationScenarios: chineseA1ConversationScenarios,
  placementTest: chineseA1PlacementTest,
};
