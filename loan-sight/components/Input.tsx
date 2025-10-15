import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...rest
}) => {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[styles.label, { color: themeColors.ink }]}
          accessibilityLabel={label}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeColors.bg,
            borderColor: error ? themeColors.error : themeColors.input,
            color: themeColors.ink,
          },
          style,
        ]}
        placeholderTextColor={themeColors.mutedForeground}
        {...rest}
      />
      {error && <Text style={[styles.errorText, { color: themeColors.error }]}>{error}</Text>}
      {helperText && !error && (
        <Text style={[styles.helperText, { color: themeColors.mutedForeground }]}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    minHeight: 48,
  },
  errorText: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  helperText: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});

