import type { ContentPack } from '../../types';
import { japaneseB2Course } from './course';
import { japaneseB2Units } from './units';
import { japaneseB2ContrastLessons } from './lessons/contrast';
import { japaneseB2ConjecturePurposeLessons } from './lessons/conjecture-purpose';
import { japaneseB2CompletionLessons } from './lessons/completion';
import { japaneseB2GrammarTopics } from './grammar';
import { japaneseB2ConversationScenarios } from './conversations';
import { japaneseB2WritingItems } from './writing';

/** No placementTest — see src/content/ko/index.ts for the reasoning shared across level packs. */
export const japaneseB2Pack: ContentPack = {
  course: japaneseB2Course,
  units: japaneseB2Units,
  lessons: [...japaneseB2ContrastLessons, ...japaneseB2ConjecturePurposeLessons, ...japaneseB2CompletionLessons],
  grammarTopics: japaneseB2GrammarTopics,
  conversationScenarios: japaneseB2ConversationScenarios,
  writingItems: japaneseB2WritingItems,
};
