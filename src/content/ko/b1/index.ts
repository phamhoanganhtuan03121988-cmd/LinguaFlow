import type { ContentPack } from '../../types';
import { koreanB1Course } from './course';
import { koreanB1Units } from './units';
import { koreanB1OpinionsLessons } from './lessons/opinions';
import { koreanB1PlansLessons } from './lessons/plans';
import { koreanB1HonorificsLessons } from './lessons/honorifics';
import { koreanB1GrammarTopics } from './grammar';
import { koreanB1ConversationScenarios } from './conversations';
import { koreanB1WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const koreanB1Pack: ContentPack = {
  course: koreanB1Course,
  units: koreanB1Units,
  lessons: [...koreanB1OpinionsLessons, ...koreanB1PlansLessons, ...koreanB1HonorificsLessons],
  grammarTopics: koreanB1GrammarTopics,
  conversationScenarios: koreanB1ConversationScenarios,
  writingItems: koreanB1WritingItems,
};
