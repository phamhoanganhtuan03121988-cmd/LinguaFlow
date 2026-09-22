import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyState, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage } from '@/src/content/loader';
import { Flashcard } from '@/src/features/review/components/Flashcard';
import { RatingButtonRow } from '@/src/features/review/components/RatingButtonRow';
import { SessionSummary } from '@/src/features/review/components/SessionSummary';
import {
  buildReviewSession,
  getReviewableWordsForCourse,
  partitionWordsByStatus,
  type ReviewableWord,
} from '@/src/features/review/reviewPool';
import type { SrsRating } from '@/src/features/review/srs';
import { useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { XP_REWARDS, selectLanguageReview, useReviewStore } from '@/src/store/useReviewStore';
import { colors, spacing, typography } from '@/src/theme';

/** How many cards later a "Chưa nhớ" word reappears within the same session. */
const REQUEUE_OFFSET = 3;

export default function ReviewSessionScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  // Captured once at session build time so the whole session (including every
  // recordReview/completeSession call below) stays targeted at the language it
  // was actually built for, even if activeLanguageCode were to change mid-session.
  const [sessionLanguageCode] = useState(() => useAppStore.getState().activeLanguageCode);
  const { completedLessonIds } = useProgressStore((state) => selectLanguageProgress(state, sessionLanguageCode));
  const { wordStates } = useReviewStore((state) => selectLanguageReview(state, sessionLanguageCode));
  const recordReview = useReviewStore((state) => state.recordReview);
  const completeSession = useReviewStore((state) => state.completeSession);

  const [initialSession] = useState<ReviewableWord[]>(() => {
    const course = getCourseForLanguage(sessionLanguageCode);
    if (!course) return [];
    const words = getReviewableWordsForCourse(course, completedLessonIds);
    const { due, newWords } = partitionWordsByStatus(words, wordStates);
    return buildReviewSession(due, newWords);
  });

  const [queue, setQueue] = useState<ReviewableWord[]>(initialSession);
  const [flipped, setFlipped] = useState(false);
  const [sessionXp, setSessionXp] = useState(0);
  const [hasFiredCompletion, setHasFiredCompletion] = useState(false);

  const currentWord = queue[0];
  const isFinished = initialSession.length > 0 && queue.length === 0;

  const remainingCount = useMemo(() => new Set(queue.map((word) => word.vocabulary.id)).size, [queue]);
  const currentStep = initialSession.length - remainingCount;

  useEffect(() => {
    setFlipped(false);
  }, [currentWord?.vocabulary.id]);

  useEffect(() => {
    if (isFinished && !hasFiredCompletion) {
      completeSession(initialSession.length, sessionLanguageCode ?? undefined);
      setHasFiredCompletion(true);
    }
  }, [isFinished, hasFiredCompletion, initialSession.length, completeSession, sessionLanguageCode]);

  const handleRate = (rating: SrsRating) => {
    if (!currentWord) return;
    recordReview(currentWord.vocabulary.id, rating, sessionLanguageCode ?? undefined);
    setSessionXp((xp) => xp + XP_REWARDS[rating]);

    setQueue((previous) => {
      const [, ...rest] = previous;
      if (rating === 'again') {
        const insertAt = Math.min(REQUEUE_OFFSET, rest.length);
        const next = [...rest];
        next.splice(insertAt, 0, currentWord);
        return next;
      }
      return rest;
    });
  };

  if (initialSession.length === 0) {
    return (
      <EmptyState
        icon="checkmark-done-circle-outline"
        title={t('review.emptySessionTitle')}
        body={t('review.emptySessionBody')}
        ctaLabel={t('review.backCta')}
        onCtaPress={() => router.back()}
      />
    );
  }

  if (isFinished) {
    return (
      <ScreenContainer maxWidth={420} scroll={false} contentStyle={styles.centered}>
        <SessionSummary reviewedCount={initialSession.length} xpGained={sessionXp} onFinish={() => router.back()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer maxWidth={420} scroll={false}>
      <ProgressTopBar currentStep={currentStep} totalSteps={initialSession.length} onBack={() => router.back()} />

      <View style={styles.cardArea}>
        <View key={currentWord.vocabulary.id} style={styles.cardWrapper}>
          <Flashcard word={currentWord} flipped={flipped} onPress={() => setFlipped((value) => !value)} />
        </View>
      </View>

      <View style={styles.footer}>
        {flipped ? (
          <RatingButtonRow onRate={handleRate} />
        ) : (
          <Text style={styles.hint}>{t('review.rateHint')}</Text>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Must have a definite width: Flashcard's own wrapper is `width: '100%'`,
  // which cannot resolve correctly against an auto-sized parent (the bug
  // that collapsed the card into a thin strip on iOS). This View stretches
  // to cardArea's full width so that 100% below has something real to
  // resolve against; alignItems centers Flashcard within it since Flashcard
  // itself is narrower (maxWidth 340) than this wrapper.
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    paddingBottom: spacing.md,
    minHeight: 72,
    justifyContent: 'center',
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
