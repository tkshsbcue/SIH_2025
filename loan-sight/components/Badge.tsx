import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'muted';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'info', style }) => {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return themeColors.success;
      case 'warning':
        return themeColors.warn;
      case 'error':
        return themeColors.error;
      case 'info':
        return themeColors.primary;
      case 'muted':
        return themeColors.muted;
      default:
        return themeColors.primary;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

