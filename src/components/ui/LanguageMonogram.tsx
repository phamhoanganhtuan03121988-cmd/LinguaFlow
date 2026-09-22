import { StyleSheet, Text, View } from 'react-native';

import type { LanguageOption } from '@/src/data/languages';
import { colors } from '@/src/theme';

interface LanguageMonogramProps {
  language: LanguageOption;
  size?: number;
}

export function LanguageMonogram({ language, size = 48 }: LanguageMonogramProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: language.accentColorLight,
        },
      ]}
    >
      <Text style={[styles.glyph, { fontSize: size * 0.4, color: language.accentColor }]}>{language.monogram}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
