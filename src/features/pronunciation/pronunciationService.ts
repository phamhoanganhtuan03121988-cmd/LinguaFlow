import * as Speech from 'expo-speech';
import { create } from 'zustand';

import type { LanguageCode } from '@/src/data/languages';
import { LANGUAGE_TO_SPEECH_LOCALE } from './languageVoiceMap';

export const SPEECH_RATE_NORMAL = 1.0;
export const SPEECH_RATE_SLOW = 0.75;

/**
 * Ephemeral (non-persisted) UI state: which utterance id is currently
 * speaking or last failed. Not learning progress, so it does not belong in
 * any of the persisted stores — it only exists to drive SpeakButton visuals.
 */
interface PronunciationState {
  speakingId: string | null;
  erroredId: string | null;
}

const usePronunciationStore = create<PronunciationState>(() => ({
  speakingId: null,
  erroredId: null,
}));

/** Speaks `text` using the device's on-device TTS voice for `languageCode`. Replaces any utterance already in progress. */
export function speak(id: string, text: string, languageCode: LanguageCode, rate: number = 1.0): void {
  try {
    Speech.stop();
  } catch {
    // Nothing was speaking — safe to ignore.
  }

  usePronunciationStore.setState({ speakingId: id, erroredId: null });

  try {
    Speech.speak(text, {
      language: LANGUAGE_TO_SPEECH_LOCALE[languageCode],
      rate,
      onDone: () => {
        if (usePronunciationStore.getState().speakingId === id) {
          usePronunciationStore.setState({ speakingId: null });
        }
      },
      onStopped: () => {
        if (usePronunciationStore.getState().speakingId === id) {
          usePronunciationStore.setState({ speakingId: null });
        }
      },
      onError: () => {
        usePronunciationStore.setState({ speakingId: null, erroredId: id });
      },
    });
  } catch {
    // Device has no usable TTS engine, or the call otherwise failed synchronously.
    usePronunciationStore.setState({ speakingId: null, erroredId: id });
  }
}

/**
 * Speaks a vocabulary/sentence entry, preferring a real recorded `audioUrl`
 * over TTS once one exists. No content has `audioUrl` populated yet
 * (reserved since Phase 2/3), so this always falls through to TTS today.
 * Wiring real audio file playback here later will need `expo-audio` as a
 * new dependency — intentionally not added now since nothing uses it yet.
 */
export function speakContent(
  id: string,
  text: string,
  languageCode: LanguageCode,
  audioUrl?: string,
  rate: number = 1.0,
): void {
  if (audioUrl) {
    // Future: play the recorded file via expo-audio instead of TTS.
  }
  speak(id, text, languageCode, rate);
}

export function stop(): void {
  try {
    Speech.stop();
  } catch {
    // Nothing was speaking — safe to ignore.
  }
  usePronunciationStore.setState({ speakingId: null });
}

export type SpeechStatus = 'idle' | 'speaking' | 'error';

export function useSpeechStatus(id: string): SpeechStatus {
  const speakingId = usePronunciationStore((state) => state.speakingId);
  const erroredId = usePronunciationStore((state) => state.erroredId);
  if (speakingId === id) return 'speaking';
  if (erroredId === id) return 'error';
  return 'idle';
}
