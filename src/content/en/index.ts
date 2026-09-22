import type { ContentPack } from '../types';
import { englishA1Course } from './course';
import { englishA1Units } from './units';
import { greetingsLessons } from './lessons/greetings';
import { introductionsLessons } from './lessons/introductions';
import { familyLessons } from './lessons/family';
import { englishA1GrammarTopics } from './grammar';
import { englishA1ConversationScenarios } from './conversations';
import { englishA1PlacementTest } from './placementTest';

export const englishA1Pack: ContentPack = {
  course: englishA1Course,
  units: englishA1Units,
  lessons: [...greetingsLessons, ...introductionsLessons, ...familyLessons],
  grammarTopics: englishA1GrammarTopics,
  conversationScenarios: englishA1ConversationScenarios,
  placementTest: englishA1PlacementTest,
};
