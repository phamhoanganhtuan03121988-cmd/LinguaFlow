import { create } from 'zustand';

/**
 * A minimal, in-memory event channel other stores emit into when something
 * gamification-worthy happens. No listener/renderer exists yet on purpose —
 * Phase 3 only wires the emit side. A later phase can subscribe to
 * `lastEvent` (e.g. in a root-level component) to trigger confetti, badge
 * toasts, streak celebrations, etc. without touching the stores below.
 */
export type GamificationEventType = 'review-recorded' | 'session-completed' | 'lesson-completed' | 'xp-earned';

export interface GamificationEvent {
  type: GamificationEventType;
  timestamp: number;
  payload?: Record<string, unknown>;
}

interface GamificationEventState {
  lastEvent: GamificationEvent | null;
  emit: (type: GamificationEventType, payload?: Record<string, unknown>) => void;
}

export const useGamificationEvents = create<GamificationEventState>((set) => ({
  lastEvent: null,
  emit: (type, payload) => set({ lastEvent: { type, timestamp: Date.now(), payload } }),
}));
