import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

import { colors, fontFamily } from '@/src/theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  home: { active: 'home', inactive: 'home-outline' },
  learn: { active: 'book', inactive: 'book-outline' },
  review: { active: 'albums', inactive: 'albums-outline' },
  practice: { active: 'mic', inactive: 'mic-outline' },
  profile: { active: 'person-circle', inactive: 'person-circle-outline' },
};

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingTop: 6,
          // Web has no safe-area-inset-bottom to pad the bar out with (no
          // viewport-fit=cover), so the default 49px UIKit height minus our
          // paddingTop leaves less room than the icon (28px) + label actually
          // need, overflowing the box and getting clipped by body's overflow:
          // hidden. Native gets plenty of slack from the home-indicator inset.
          ...(Platform.OS === 'web' ? { height: 64 } : null),
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          return <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: t('tabs.home') }} />
      <Tabs.Screen name="learn" options={{ title: t('tabs.learn') }} />
      <Tabs.Screen name="review" options={{ title: t('tabs.review') }} />
      <Tabs.Screen name="practice" options={{ title: t('tabs.practice') }} />
      <Tabs.Screen name="profile" options={{ title: t('tabs.profile') }} />
    </Tabs>
  );
}
