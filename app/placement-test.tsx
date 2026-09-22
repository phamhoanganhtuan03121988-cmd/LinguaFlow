import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Card, EmptyState, ProgressTopBar, ScreenContainer } from '@/src/components/ui';
import { getPlacementTestForLanguage } from '@/src/content/loader';
import { ExerciseRenderer } from '@/src/features/learn/components/ExerciseRenderer';
import { PlacementResultCard } from '@/src/features/placement/components/PlacementResultCard';
import { scorePlacementTest, type PlacementResult } from '@/src/features/placement/scoring';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import { useAppStore } from '@/src/store/useAppStore';
import { colors, spacing, typography } from '@/src/theme';

type Phase = 'intro' | 'question' | 'result';

export default function PlacementTestScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const activeLanguageCode = useAppStore((state) => state.activeLanguageCode);
  const setPlacementTestResult = useAppStore((state) => state.setPlacementTestResult);
  const applyPlacementRecommendation = useAppStore((state) => state.applyPlacementRecommendation);

  const test = getPlacementTestForLanguage(activeLanguageCode);

  // All hooks declared unconditionally, before any early return, per Rules of Hooks.
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (result && test) {
      // Explicit languageCode from the test itself (not the active language) — the
      // result always belongs to the language it was actually taken in.
      setPlacementTestResult(result, test.languageCode);
    }
  }, [result, test, setPlacementTestResult]);

  if (!test) {
    return (
      <EmptyState
        icon="school-outline"
        title={t('placement.noContentTitle')}
        body={t('placement.noContentBody')}
        ctaLabel={t('placement.backCta')}
        onCtaPress={() => router.back()}
      />
    );
  }

  const handleRestart = () => {
    setPhase('intro');
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setApplied(false);
  };

  const handleAnswered = (questionId: string, correct: boolean) => {
    const nextAnswers = { ...answers, [questionId]: correct };
    setAnswers(nextAnswers);

    if (currentIndex + 1 >= test.questions.length) {
      setResult(scorePlacementTest(test, nextAnswers));
      setPhase('result');
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  if (phase === 'intro') {
    return (
      <ScreenContainer maxWidth={480}>
        <Text style={styles.title}>{t('placement.introTitle')}</Text>
        <Card style={styles.introCard}>
          <Text style={styles.introDescription}>{test.descriptionVi}</Text>
          <Text style={styles.introBody}>{t('placement.introBody')}</Text>
        </Card>
        <View style={styles.footer}>
          <Button label={t('placement.startCta')} onPress={() => setPhase('question')} />
          <Button label={t('placement.skipCta')} variant="secondary" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  if (phase === 'result' && result) {
    return (
      <ScreenContainer maxWidth={480}>
        <Text style={styles.title}>{t('placement.resultTitle')}</Text>
        <View style={styles.resultCardSpacing}>
          <PlacementResultCard result={result} />
        </View>
        <View style={styles.footer}>
          {applied ? (
            <View style={styles.appliedBanner}>
              <Text style={styles.appliedText}>{t('placement.appliedBadge')}</Text>
            </View>
          ) : (
            <>
              <Button
                label={t('placement.applyCta')}
                onPress={() => {
                  applyPlacementRecommendation(test.languageCode);
                  setApplied(true);
                }}
              />
              <Button label={t('placement.keepCta')} variant="secondary" onPress={() => router.back()} />
            </>
          )}
          <Button label={t('placement.retakeCta')} variant="secondary" onPress={handleRestart} />
        </View>
      </ScreenContainer>
    );
  }

  const currentQuestion = test.questions[currentIndex];
  const listeningText =
    currentQuestion.skill === 'listening' && currentQuestion.exercise.type === 'multiple-choice'
      ? currentQuestion.exercise.question
      : undefined;

  return (
    <ScreenContainer maxWidth={480}>
      <ProgressTopBar currentStep={currentIndex} totalSteps={test.questions.length} onBack={() => router.back()} />

      {listeningText ? (
        <View style={styles.listeningPrompt}>
          <SpeakButton
            id={`placement-${currentQuestion.id}`}
            text={listeningText}
            languageCode={test.languageCode}
            size="medium"
          />
        </View>
      ) : null}

      <ExerciseRenderer
        key={currentQuestion.id}
        exercise={currentQuestion.exercise}
        onAnswered={(correct) => handleAnswered(currentQuestion.id, correct)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  introCard: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  introDescription: {
    ...typography.body,
    color: colors.textPrimary,
  },
  introBody: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  footer: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  resultCardSpacing: {
    marginBottom: spacing.lg,
  },
  appliedBanner: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  appliedText: {
    ...typography.bodyMedium,
    color: colors.success,
  },
  listeningPrompt: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});
