import type { LanguageCode } from '@/src/data/languages';

export type ListeningItemType = 'choose-word' | 'choose-meaning' | 'choose-sentence-meaning';

/**
 * Generated at runtime from completed-lesson vocabulary/sentences — never
 * authored content, so this lives outside src/content and doesn't touch its
 * schema. All three item "types" share one shape; `type` only selects which
 * prompt text and which source pool (words vs. sentences) it came from.
 */
export interface ListeningItem {
  id: string;
  type: ListeningItemType;
  audioText: string;
  languageCode: LanguageCode;
  options: string[];
  correctAnswer: string;
}
