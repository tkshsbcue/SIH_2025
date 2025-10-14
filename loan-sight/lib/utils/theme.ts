export const colors = {
  light: {
    bg: '#FFFFFF',
    surface: '#F7FAFF',
    primary: '#0066FF',
    accent: '#00A86B',
    warn: '#FFB020',
    error: '#EF4444',
    muted: '#6B7280',
    ink: '#0F172A',
    border: '#E5E7EB',
    success: '#10B981',
  },
  dark: {
    bg: '#0F172A',
    surface: '#1E293B',
    primary: '#3B82F6',
    accent: '#10B981',
    warn: '#FBBF24',
    error: '#F87171',
    muted: '#94A3B8',
    ink: '#F8FAFC',
    border: '#334155',
    success: '#34D399',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  displayLarge: {
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 40,
  },
  displayMedium: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

