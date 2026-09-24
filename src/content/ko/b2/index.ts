import type { ContentPack } from '../../types';
import { koreanB2Course } from './course';
import { koreanB2Units } from './units';
import { koreanB2CauseEffectLessons } from './lessons/cause-effect';
import { koreanB2ArgumentationLessons } from './lessons/argumentation';
import { koreanB2FormalLessons } from './lessons/formal';
import { koreanB2GrammarTopics } from './grammar';
import { koreanB2ConversationScenarios } from './conversations';
import { koreanB2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const koreanB2Pack: ContentPack = {
  course: koreanB2Course,
  units: koreanB2Units,
  lessons: [...koreanB2CauseEffectLessons, ...koreanB2ArgumentationLessons, ...koreanB2FormalLessons],
  grammarTopics: koreanB2GrammarTopics,
  conversationScenarios: koreanB2ConversationScenarios,
  writingItems: koreanB2WritingItems,
};
