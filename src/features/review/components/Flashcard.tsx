import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { getCourseForLesson, getExampleSentenceForVocabulary } from '@/src/content/loader';
import { SpeakButton } from '@/src/features/pronunciation/components/SpeakButton';
import type { ReviewableWord } from '@/src/features/review/reviewPool';
import { colors, radius, spacing, typography } from '@/src/theme';

interface FlashcardProps {
  word: ReviewableWord;
  flipped: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Both faces stay permanently mounted, absolutely stacked inside `wrapper`
 * (which has an explicit width/height — see the fix in review-session.tsx
 * for why that matters). A single `flipProgress` value drives opacity/scale/
 * translateY on each face via plain useAnimatedStyle — the same primitive
 * already used safely elsewhere in this app (Button, SelectableCard,
 * ProgressBar). No rotateY, no perspective, no backfaceVisibility, and
 * nothing here ever touches width or height, so this cannot reproduce the
 * "thin strip" layout bug regardless of animation state.
 */
export function Flashcard({ word, flipped, onPress }: FlashcardProps) {
  const { t } = useTranslation();
  const flipProgress = useSharedValue(flipped ? 1 : 0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    flipProgress.value = withTiming(flipped ? 1 : 0, { duration: 260 });
  }, [flipped, flipProgress]);

  const pressableStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const frontStyle = useAnimatedStyle(() => ({
    opacity: 1 - flipProgress.value,
    transform: [{ scale: 1 - flipProgress.value * 0.05 }, { translateY: flipProgress.value * -6 }],
  }));

  const backStyle = useAnimatedStyle(() => ({
    opacity: flipProgress.value,
    transform: [{ scale: 0.95 + flipProgress.value * 0.05 }, { translateY: (1 - flipProgress.value) * 6 }],
  }));

  const { vocabulary, lesson } = word;
  const exampleSentence = getExampleSentenceForVocabulary(lesson, vocabulary);
  const languageCode = getCourseForLesson(lesson)?.languageCode ?? 'en';

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        pressScale.value = withTiming(0.98, { duration: 100 });
      }}
      onPressOut={() => {
        pressScale.value = withTiming(1, { duration: 100 });
      }}
      style={[styles.wrapper, pressableStyle]}
    >
      <Animated.View style={[styles.face, styles.frontFace, frontStyle]} pointerEvents={flipped ? 'none' : 'auto'}>
        <View style={styles.decorCircleFront} />
        <Ionicons name="chatbubble-outline" size={72} color={colors.primary} style={styles.decorIconFront} />

        {vocabulary.partOfSpeech ? (
          <View style={styles.posBadge}>
            <Text style={styles.posBadgeText}>{t(`review.partOfSpeech.${vocabulary.partOfSpeech}`)}</Text>
          </View>
        ) : null}
        <Text style={styles.term}>{vocabulary.term}</Text>
        <View style={styles.frontSpeakButton}>
          <SpeakButton
            id={`flashcard-front-${vocabulary.id}`}
            text={vocabulary.term}
            languageCode={languageCode}
            audioUrl={vocabulary.audioUrl}
            size="medium"
            showSpeedToggle
          />
        </View>
        <View style={styles.flipHint}>
          <Ionicons name="sync-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.flipHintText}>{t('review.flipHint')}</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.face, styles.backFace, backStyle]} pointerEvents={flipped ? 'auto' : 'none'}>
        <View style={styles.decorCircleBack} />
        <ScrollView contentContainerStyle={styles.backScrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.translation}>{vocabulary.translationVi}</Text>

          {exampleSentence ? (
            <View style={styles.block}>
              <View style={styles.blockHeaderRow}>
                <Text style={styles.blockLabel}>{t('review.exampleHeading')}</Text>
                <SpeakButton
                  id={`flashcard-back-${exampleSentence.id}`}
                  text={exampleSentence.text}
                  languageCode={languageCode}
                  audioUrl={exampleSentence.audioUrl}
                  size="small"
                />
              </View>
              <Text style={styles.exampleText}>{exampleSentence.text}</Text>
              <Text style={styles.exampleTranslation}>{exampleSentence.translationVi}</Text>
            </View>
          ) : null}

          {vocabulary.usageNoteVi ? (
            <View style={styles.block}>
              <Text style={styles.blockLabel}>{t('review.usageHeading')}</Text>
              <Text style={styles.usageText}>{vocabulary.usageNoteVi}</Text>
            </View>
          ) : null}
        </ScrollView>
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 340,
    height: 380,
    alignSelf: 'center',
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    ...Platform.select({
      web: { boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)' },
      default: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 4,
      },
    }),
  },
  frontFace: {
    backgroundColor: colors.accentBlueLight,
  },
  backFace: {
    backgroundColor: colors.accentYellowLight,
    justifyContent: 'flex-start',
  },
  decorCircleFront: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -70,
    right: -50,
    backgroundColor: colors.primary,
    opacity: 0.08,
  },
  decorIconFront: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    opacity: 0.08,
  },
  decorCircleBack: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: -60,
    left: -40,
    backgroundColor: colors.accentYellow,
    opacity: 0.2,
  },
  posBadge: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFFCC',
  },
  posBadgeText: {
    ...typography.caption,
    color: colors.primaryDark,
  },
  term: {
    ...typography.display,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  frontSpeakButton: {
    marginTop: spacing.md,
  },
  flipHint: {
    position: 'absolute',
    bottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  flipHintText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  backScrollContent: {
    width: '100%',
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  translation: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  block: {
    backgroundColor: '#FFFFFFB3',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  blockHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockLabel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  exampleText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  exampleTranslation: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  usageText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
});
