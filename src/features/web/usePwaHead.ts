import { useEffect } from 'react';
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
