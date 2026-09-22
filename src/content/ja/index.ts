import type { ContentPack } from '../types';
import { japaneseA1Course } from './course';
import { japaneseA1Units } from './units';
import { japaneseGreetingsLessons } from './lessons/greetings';
import { japaneseIntroductionsLessons } from './lessons/introductions';
import { japaneseFamilyLessons } from './lessons/family';
import { japaneseA1GrammarTopics } from './grammar';
import { japaneseA1ConversationScenarios } from './conversations';
import { japaneseA1PlacementTest } from './placementTest';

export const japaneseA1Pack: ContentPack = {
  course: japaneseA1Course,
  units: japaneseA1Units,
  lessons: [...japaneseGreetingsLessons, ...japaneseIntroductionsLessons, ...japaneseFamilyLessons],
  grammarTopics: japaneseA1GrammarTopics,
  conversationScenarios: japaneseA1ConversationScenarios,
  placementTest: japaneseA1PlacementTest,
};
