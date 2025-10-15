import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  testID,
}) => {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingVertical: spacing.sm + 4,
      paddingHorizontal: spacing.md + 4,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44,
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: themeColors.primary };
      case 'secondary':
        return { ...baseStyle, backgroundColor: themeColors.secondary };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: themeColors.input,
        };
      case 'ghost':
        return { ...baseStyle, backgroundColor: 'transparent' };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...typography.body,
      fontWeight: '500',
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, color: themeColors.primaryForeground };
      case 'secondary':
        return { ...baseStyle, color: themeColors.secondaryForeground };
      case 'outline':
        return { ...baseStyle, color: themeColors.ink };
      case 'ghost':
        return { ...baseStyle, color: themeColors.ink };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? themeColors.primaryForeground : themeColors.ink} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

