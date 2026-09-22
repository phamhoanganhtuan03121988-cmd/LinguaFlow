import { useEffect } from 'react';
import { Platform } from 'react-native';

/**
 * TEMPORARY diagnostic overlay (web only) for the bottom-tab-bar crop
 * investigation. Renders a small fixed readout in the corner of the screen
 * with the exact measurements needed to tell where the label is being cut:
 * page/visual viewport height vs. the tab bar's own box height and bottom
 * edge. Delete this file and its call site once the fix is confirmed on a
 * real device.
 */
export function useTabBarDebugOverlay(): void {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const box = document.createElement('div');
    box.style.position = 'fixed';
    box.style.top = '4px';
    box.style.left = '4px';
    box.style.zIndex = '99999';
    box.style.padding = '6px 8px';
    box.style.background = 'rgba(0,0,0,0.75)';
    box.style.color = '#0f0';
    box.style.fontSize = '10px';
    box.style.fontFamily = 'monospace';
    box.style.whiteSpace = 'pre';
    box.style.pointerEvents = 'none';
    document.body.appendChild(box);

    const update = () => {
      const tabBar = document.querySelector('[role="tablist"]');
      const rect = tabBar?.getBoundingClientRect();
      const lines = [
        `innerHeight: ${window.innerHeight}`,
        `visualViewport.height: ${window.visualViewport?.height ?? 'n/a'}`,
        `documentElement.clientHeight: ${document.documentElement.clientHeight}`,
        `body.clientHeight: ${document.body.clientHeight}`,
        `tabBar.height: ${rect ? rect.height.toFixed(1) : 'n/a'}`,
        `tabBar.bottom: ${rect ? rect.bottom.toFixed(1) : 'n/a'}`,
        `innerHeight - tabBar.bottom: ${rect ? (window.innerHeight - rect.bottom).toFixed(1) : 'n/a'}`,
      ];
      box.textContent = lines.join('\n');
    };

    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    const interval = setInterval(update, 500);

    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
      clearInterval(interval);
      box.remove();
    };
  }, []);
}
