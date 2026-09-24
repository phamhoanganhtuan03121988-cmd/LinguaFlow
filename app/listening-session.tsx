import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getCourseForLanguage } from '@/src/content/loader';
import { ListeningQuestion } from '@/src/features/listening/components/ListeningQuestion';
import { buildListeningItems } from '@/src/features/listening/listeningPool';
import type { ListeningItem } from '@/src/features/listening/types';
import { stop } from '@/src/features/pronunciation/pronunciationService';
import { selectLanguageProfile, useAppStore } from '@/src/store/useAppStore';
import { selectLanguageProgress, useProgressStore } from '@/src/store/useProgressStore';
import { colors, radius, spacing, typography } from '@/src/theme';

export default function ListeningSessionScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  // Captured once at session build time so completeListeningSession() below
  // stays targeted at the language (and course level) this session was built for.
  const [sessionLanguageCode] = useState(() => useAppStore.getState().activeLanguageCode);
  const [sessionTrackId] = useState(
    () => selectLanguageProfile(useAppStore.getState(), sessionLanguageCode).activeTrackId,
  );
  const [sessionLevelId] = useState(
    () => selectLanguageProfile(useAppStore.getState(), sessionLanguageCode).activeLevelId,
  );
  const { completedLessonIds } = useProgressStore((state) => selectLanguageProgress(state, sessionLanguageCode));

  const [items] = useState<ListeningItem[]>(() => {
    const course = getCourseForLanguage(sessionLanguageCode, sessionTrackId, sessionLevelId);
    if (!course) return [];
    return buildListeningItems(course, completedLessonIds);
  });

  const completeListeningSession = useProgressStore((state) => state.completeListeningSession);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = items[currentIndex];

  const handleBack = () => {
    stop();
    router.back();
  };

  const handleAnswered = (correct: boolean) => {
    if (correct) setCorrectCount((count) => count + 1);

    if (currentIndex + 1 >= items.length) {
      stop();
      completeListeningSession(sessionLanguageCode ?? undefined);
      setIsFinished(true);
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="headset-outline"
        title={t('listening.noLessonsTitle')}
        body={t('listening.noLessonsBody')}
        ctaLabel={t('listening.noLessonsCta')}
        onCtaPress={() => router.back()}
      />
    );
  }

  if (isFinished) {
    return (
      <ScreenContainer maxWidth={420} scroll={false} contentStyle={styles.centered}>
        <Card style={styles.resultCard}>
          <View style={styles.resultIconBadge}>
            <Ionicons name="checkmark-circle" size={32} color={colors.success} />
          </View>
          <Text style={styles.resultTitle}>{t('listening.resultTitle')}</Text>
          <Text style={styles.resultBody}>
            {t('listening.resultBody', { correct: correctCount, total: items.length })}
          </Text>
          <View style={styles.resultCta}>
            <Button label={t('listening.backCta')} onPress={() => router.back()} />
          </View>
        </Card>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={currentIndex} totalSteps={items.length} onBack={handleBack} />
      <ListeningQuestion key={currentItem.id} item={currentItem} onAnswered={handleAnswered} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
  },
  resultCard: {
    alignItems: 'center',
  },
  resultIconBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.success + '1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  resultTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  resultBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  resultCta: {
    marginTop: spacing.lg,
    alignSelf: 'stretch',
  },
});
