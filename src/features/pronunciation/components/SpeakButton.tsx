import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import type { LanguageCode } from '@/src/data/languages';
import {
  SPEECH_RATE_NORMAL,
  SPEECH_RATE_SLOW,
  speakContent,
  stop,
  useSpeechStatus,
} from '@/src/features/pronunciation/pronunciationService';
import { colors, radius, spacing, typography } from '@/src/theme';

interface SpeakButtonProps {
  id: string;
  text?: string;
  languageCode: LanguageCode;
  audioUrl?: string;
  size?: 'small' | 'medium';
  /** Shows a small "1x / 0.75x" toggle next to the button. Only enable on primary, focused playback controls. */
  showSpeedToggle?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_CONFIG = {
  small: { box: 32, icon: 16 },
  medium: { box: 44, icon: 22 },
} as const;

export function SpeakButton({ id, text, languageCode, audioUrl, size = 'medium', showSpeedToggle = false }: SpeakButtonProps) {
  const { t } = useTranslation();
  const status = useSpeechStatus(id);
  const scale = useSharedValue(1);
  const config = SIZE_CONFIG[size];
  const [isSlow, setIsSlow] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const previousStatusRef = useRef(status);

  useEffect(() => {
    if (previousStatusRef.current === 'speaking' && status === 'idle') {
      setHasPlayedOnce(true);
    }
    previousStatusRef.current = status;
  }, [status]);

  useEffect(() => {
    if (status === 'speaking') {
      scale.value = withRepeat(withSequence(withTiming(1.15, { duration: 350 }), withTiming(1, { duration: 350 })), -1, true);
    } else {
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [status, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // No usable text means there is nothing to speak — hide rather than show a dead button.
  if (!text || text.trim().length === 0) {
    return null;
  }

  const handlePress = () => {
    if (status === 'speaking') {
      stop();
      return;
    }
    speakContent(id, text, languageCode, audioUrl, isSlow ? SPEECH_RATE_SLOW : SPEECH_RATE_NORMAL);
  };

  const iconName =
    status === 'error'
      ? 'alert-circle-outline'
      : status === 'speaking'
        ? 'volume-high'
        : hasPlayedOnce
          ? 'volume-medium'
          : 'volume-medium-outline';
  const iconColor = status === 'error' ? colors.danger : status === 'speaking' ? colors.textInverse : colors.primary;
  const backgroundColor =
    status === 'error' ? colors.danger + '1A' : status === 'speaking' ? colors.primary : colors.primaryLight + '33';

  const accessibilityLabel =
    status === 'speaking'
      ? t('pronunciation.speakingLabel')
      : status === 'error'
        ? t('pronunciation.errorLabel')
        : t('pronunciation.speakLabel');

  return (
    <View style={styles.row}>
      <AnimatedPressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        hitSlop={8}
        style={[
          styles.button,
          { width: config.box, height: config.box, borderRadius: config.box / 2, backgroundColor },
          animatedStyle,
        ]}
      >
        <Ionicons name={iconName} size={config.icon} color={iconColor} />
      </AnimatedPressable>

      {showSpeedToggle ? (
        <Pressable
          onPress={() => setIsSlow((value) => !value)}
          accessibilityRole="button"
          accessibilityLabel={t('pronunciation.speedToggleLabel')}
          hitSlop={8}
          style={[styles.speedChip, isSlow && styles.speedChipActive]}
        >
          <Text style={[styles.speedChipText, isSlow && styles.speedChipTextActive]}>
            {isSlow ? t('pronunciation.speedSlow') : t('pronunciation.speedNormal')}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedChip: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  speedChipActive: {
    backgroundColor: colors.primaryLight + '33',
    borderColor: colors.primary,
  },
  speedChipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  speedChipTextActive: {
    color: colors.primaryDark,
  },
});
