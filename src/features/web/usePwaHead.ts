import { useEffect, useLayoutEffect } from 'react';
import { Platform } from 'react-native';

import { colors } from '@/src/theme';

/**
 * Injects PWA <head> tags (manifest link, theme-color) on web only, via
 * document.head at runtime — not via a custom index.html template. Expo's
 * web export manages index.html/script injection itself in "single" output
 * mode, and that mechanism isn't documented for safe overriding, so this
 * avoids touching it at all. No-op on native.
 */
export function usePwaHead(): void {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    const themeColorMeta = document.createElement('meta');
    themeColorMeta.name = 'theme-color';
    themeColorMeta.content = colors.primary;
    document.head.appendChild(themeColorMeta);

    const appleCapableMeta = document.createElement('meta');
    appleCapableMeta.name = 'apple-mobile-web-app-capable';
    appleCapableMeta.content = 'yes';
    document.head.appendChild(appleCapableMeta);

    return () => {
      manifestLink.remove();
      themeColorMeta.remove();
      appleCapableMeta.remove();
    };
  }, []);
}

/**
 * Mobile Safari sizes `html, body { height: 100% }` (set by Expo's generated
 * index.html) against the "large" viewport, as if its collapsible toolbar were
 * already hidden. When the toolbar is visible, the real visible area is smaller
 * by its height, and since that stylesheet also sets `body { overflow: hidden }`,
 * the difference gets clipped instead of scrolled — cutting off whatever sits at
 * the very bottom of the page, e.g. the bottom tab bar's labels. `dvh` tracks the
 * actually-visible viewport instead of the large one. Browsers that don't support
 * it treat the declaration as invalid and ignore it, falling back to the 100%
 * already set by index.html — so this is safe with no feature-detection needed.
 */
export function useWebViewportHeightFix(): void {
  useLayoutEffect(() => {
    if (Platform.OS !== 'web') return;

    const style = document.createElement('style');
    style.textContent = 'html, body { height: 100dvh !important; }';
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);
}
