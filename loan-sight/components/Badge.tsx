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

  const getBadgeColors = () => {
    switch (variant) {
      case 'success':
        return { bg: themeColors.success, fg: '#FFFFFF' };
      case 'warning':
        return { bg: themeColors.warn, fg: '#FFFFFF' };
      case 'error':
        return { bg: themeColors.error, fg: '#FFFFFF' };
      case 'info':
        return { bg: themeColors.primary, fg: themeColors.primaryForeground };
      case 'muted':
        return { bg: themeColors.muted, fg: themeColors.mutedForeground };
      default:
        return { bg: themeColors.primary, fg: themeColors.primaryForeground };
    }
  };

  const badgeColors = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        { 
          backgroundColor: badgeColors.bg,
          borderColor: theme === 'light' ? themeColors.border : 'transparent',
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: badgeColors.fg }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  text: {
    ...typography.caption,
    fontWeight: '500',
    fontSize: 11,
  },
});

