import type { ContentPack } from '../types';
import { koreanA1Course } from './course';
import { koreanA1Units } from './units';
import { koreanGreetingsLessons } from './lessons/greetings';
import { koreanIntroductionsLessons } from './lessons/introductions';
import { koreanFamilyLessons } from './lessons/family';
import { koreanA1GrammarTopics } from './grammar';
import { koreanA1ConversationScenarios } from './conversations';

/**
 * No placementTest yet — deliberately not built for Phase 8C (see the Part 11
 * constraint: never fall back to English's placement test for another
 * language). Until a Korean-specific question set exists, the placement
 * screen shows its existing "coming soon" empty state for this language.
 */
export const koreanA1Pack: ContentPack = {
  course: koreanA1Course,
  units: koreanA1Units,
  lessons: [...koreanGreetingsLessons, ...koreanIntroductionsLessons, ...koreanFamilyLessons],
  grammarTopics: koreanA1GrammarTopics,
  conversationScenarios: koreanA1ConversationScenarios,
};
