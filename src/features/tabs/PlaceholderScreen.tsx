import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { EmptyState } from '@/src/components/ui';

interface PlaceholderScreenProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  titleKey: string;
  bodyKey: string;
}

export function PlaceholderScreen({ icon, titleKey, bodyKey }: PlaceholderScreenProps) {
  const { t } = useTranslation();
  return <EmptyState icon={icon} title={t(titleKey)} body={t(bodyKey)} />;
}
