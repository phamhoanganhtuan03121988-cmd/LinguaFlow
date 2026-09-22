import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getWritingItemsForLanguage, getWritingItemsForLesson } from '@/src/content/loader';
import type { WritingItem } from '@/src/content/types';
import { DrawingCanvas } from '@/src/features/writing/components/DrawingCanvas';
import { useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, spacing, typography } from '@/src/theme';

type WritingMode = 'trace' | 'free';

export default function WritingSessionScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();

  // Captured once at session build time, same principle as review-session.tsx /
  // listening-session.tsx: the whole session stays targeted at the language it
  // was actually built for.
  const [sessionLanguageCode] = useState(() => useAppStore.getState().activeLanguageCode);
  const { completedLessonIds } = useProgressStore((state) => selectLanguageProgress(state, sessionLanguageCode));
  const markWritingItemComplete = useProgressStore((state) => state.markWritingItemComplete);
  const isWritingItemComplete = useProgressStore((state) => state.isWritingItemComplete);

  const [items] = useState<WritingItem[]>(() => {
    if (lessonId) return getWritingItemsForLesson(lessonId);
    // Practice tab entry: only characters from lessons already completed — same
    // "never the whole course, only what's been learned" rule as the review/listening pools.
    return getWritingItemsForLanguage(sessionLanguageCode).filter((item) => completedLessonIds[item.lessonId]);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<WritingMode>('trace');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [roundDone, setRoundDone] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const currentItem = items[currentIndex];
  const isFinished = items.length > 0 && currentIndex >= items.length;

  const handleClear = () => {
    setResetCounter((n) => n + 1);
    setHasDrawn(false);
  };

  const handleSwitchMode = (nextMode: WritingMode) => {
    setMode(nextMode);
    handleClear();
  };

  const handleComplete = () => {
    if (!currentItem) return;
    markWritingItemComplete(currentItem.id, sessionLanguageCode ?? undefined);
    setRoundDone(true);
  };

  const handleNext = () => {
    setCurrentIndex((index) => index + 1);
    setMode('trace');
    setRoundDone(false);
    handleClear();
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="create-outline"
        title={t('writing.noItemsTitle')}
        body={t('writing.noItemsBody')}
        ctaLabel={t('writing.backCta')}
        onCtaPress={() => router.back()}
      />
    );
  }

  if (isFinished) {
    return (
      <ScreenContainer maxWidth={420} scroll={false} contentStyle={styles.centered}>
        <Card style={styles.resultCard}>
          <Text style={styles.resultTitle}>{t('writing.sessionCompleteTitle')}</Text>
          <Text style={styles.resultBody}>{t('writing.sessionCompleteBody', { count: items.length })}</Text>
          <Button label={t('writing.backCta')} onPress={() => router.back()} />
        </Card>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={currentIndex} totalSteps={items.length} onBack={() => router.back()} />

      <Text style={styles.title}>{t('writing.title')}</Text>
      {currentItem.exampleWord ? (
        <Text style={styles.subtitle}>
          {currentItem.exampleWord}
          {currentItem.exampleWordTranslationVi ? ` — ${currentItem.exampleWordTranslationVi}` : ''}
        </Text>
      ) : null}

      <View style={styles.modeRow}>
        <View style={styles.modeButton}>
          <Button
            label={t('writing.traceMode')}
            variant={mode === 'trace' ? 'primary' : 'secondary'}
            onPress={() => handleSwitchMode('trace')}
          />
        </View>
        <View style={styles.modeButton}>
          <Button
            label={t('writing.freeMode')}
            variant={mode === 'free' ? 'primary' : 'secondary'}
            onPress={() => handleSwitchMode('free')}
          />
        </View>
      </View>

      <View style={styles.canvasWrapper}>
        <DrawingCanvas
          character={currentItem.character}
          mode={mode}
          resetKey={`${currentIndex}-${resetCounter}`}
          onChangeHasDrawn={setHasDrawn}
        />
      </View>

      {roundDone ? (
        <View style={styles.doneBanner}>
          <Text style={styles.doneText}>{t('writing.doneLabel')}</Text>
        </View>
      ) : null}

      <View style={styles.actionsRow}>
        <View style={styles.actionButton}>
          <Button label={t('writing.clearCta')} variant="secondary" onPress={handleClear} />
        </View>
        {roundDone ? (
          <View style={styles.actionButton}>
            <Button label={t('writing.tryAgainCta')} variant="secondary" onPress={handleClear} />
          </View>
        ) : (
          <View style={styles.actionButton}>
            <Button label={t('writing.completeCta')} onPress={handleComplete} disabled={!hasDrawn} />
          </View>
        )}
      </View>

      {roundDone ? (
        <View style={styles.nextSpacing}>
          <Button label={t('writing.nextCta')} onPress={handleNext} />
        </View>
      ) : null}

      {isWritingItemComplete(currentItem.id, sessionLanguageCode ?? undefined) && !roundDone ? (
        <Text style={styles.alreadyDoneNote}>{t('writing.alreadyPracticedNote')}</Text>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modeButton: {
    flex: 1,
  },
  canvasWrapper: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  doneBanner: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  doneText: {
    ...typography.bodyMedium,
    color: colors.success,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  nextSpacing: {
    marginTop: spacing.md,
  },
  alreadyDoneNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCard: {
    gap: spacing.md,
    alignItems: 'center',
  },
  resultTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  resultBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
