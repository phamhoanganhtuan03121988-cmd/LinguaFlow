import type { ContentPack } from '../types';
import { koreanA1Course } from './course';
import { koreanA1Units } from './units';
import { koreanGreetingsLessons } from './lessons/greetings';
import { koreanIntroductionsLessons } from './lessons/introductions';
import { koreanFamilyLessons } from './lessons/family';
import { koreanA1GrammarTopics } from './grammar';
import { koreanA1ConversationScenarios } from './conversations';
import { koreanA1PlacementTest } from './placementTest';

export const koreanA1Pack: ContentPack = {
  course: koreanA1Course,
  units: koreanA1Units,
  lessons: [...koreanGreetingsLessons, ...koreanIntroductionsLessons, ...koreanFamilyLessons],
  grammarTopics: koreanA1GrammarTopics,
  conversationScenarios: koreanA1ConversationScenarios,
  placementTest: koreanA1PlacementTest,
};
