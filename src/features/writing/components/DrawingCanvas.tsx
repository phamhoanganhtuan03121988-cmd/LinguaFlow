import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/src/theme';

interface Point {
  x: number;
  y: number;
}

type Stroke = Point[];

interface DrawingCanvasProps {
  /** The character shown as a faint trace guide. Hidden entirely in 'free' mode. */
  character: string;
  mode: 'trace' | 'free';
  size?: number;
  /** Fires the first time the user puts ink on the canvas after a clear. */
  onChangeHasDrawn?: (hasDrawn: boolean) => void;
  /** Bumped by the parent (e.g. an incrementing number) to force-clear the canvas — used by "Xóa"/"Viết lại" and when switching to a new item. */
  resetKey?: number | string;
}

const STROKE_WIDTH = 10;
const DOT_SIZE = STROKE_WIDTH;

/**
 * Draws ink strokes using plain RN Views (small rotated rectangles connecting
 * consecutive touch points), not SVG or a canvas element — this project has no
 * SVG/canvas dependency, and adding one wasn't necessary for tracing (see the
 * Phase 9 dependency note in the final report). Works identically for touch
 * (native), and mouse/pointer drag (react-native-web maps mouse events into
 * the same PanResponder callbacks) — no gesture-handler needed either.
 */
export function DrawingCanvas({ character, mode, size = 260, onChangeHasDrawn, resetKey }: DrawingCanvasProps) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [liveStroke, setLiveStroke] = useState<Stroke>([]);

  useEffect(() => {
    setStrokes([]);
    setLiveStroke([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          setLiveStroke([{ x: locationX, y: locationY }]);
        },
        onPanResponderMove: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          setLiveStroke((prev) => {
            const last = prev[prev.length - 1];
            if (last && Math.hypot(locationX - last.x, locationY - last.y) < 2) return prev;
            return [...prev, { x: locationX, y: locationY }];
          });
        },
        onPanResponderRelease: () => {
          setLiveStroke((prev) => {
            if (prev.length > 0) {
              setStrokes((strokesPrev) => [...strokesPrev, prev]);
              onChangeHasDrawn?.(true);
            }
            return [];
          });
        },
        onPanResponderTerminate: () => setLiveStroke([]),
      }),
    [onChangeHasDrawn],
  );

  const allStrokes = liveStroke.length > 0 ? [...strokes, liveStroke] : strokes;

  return (
    <View style={[styles.canvas, { width: size, height: size }]} {...panResponder.panHandlers}>
      {mode === 'trace' ? (
        <View style={styles.guideLayer} pointerEvents="none">
          <Text style={[styles.guideCharacter, { fontSize: size * 0.65 }]}>{character}</Text>
        </View>
      ) : null}

      <View style={styles.inkLayer} pointerEvents="none">
        {allStrokes.map((stroke, strokeIndex) => (
          <StrokePath key={strokeIndex} points={stroke} />
        ))}
      </View>
    </View>
  );
}

function StrokePath({ points }: { points: Point[] }) {
  return (
    <>
      {points.slice(1).map((point, index) => {
        const prev = points[index];
        const dx = point.x - prev.x;
        const dy = point.y - prev.y;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const midX = (prev.x + point.x) / 2;
        const midY = (prev.y + point.y) / 2;
        return (
          <View
            key={`seg-${index}`}
            style={[
              styles.segment,
              {
                left: midX - length / 2,
                top: midY - STROKE_WIDTH / 2,
                width: length,
                transform: [{ rotate: `${angle}rad` }],
              },
            ]}
          />
        );
      })}
      {points.map((point, index) => (
        <View key={`dot-${index}`} style={[styles.dot, { left: point.x - DOT_SIZE / 2, top: point.y - DOT_SIZE / 2 }]} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  canvas: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  guideLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideCharacter: {
    color: colors.textSecondary,
    opacity: 0.28,
    fontWeight: '600',
  },
  inkLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.primary,
  },
  segment: {
    position: 'absolute',
    height: STROKE_WIDTH,
    backgroundColor: colors.primary,
    borderRadius: STROKE_WIDTH / 2,
  },
});
