// ShadCn-inspired color palette with zinc/slate base
export const colors = {
  light: {
    bg: '#FFFFFF',
    surface: '#FAFAFA',
    primary: '#18181B',      // zinc-900 - ShadCn uses dark primary
    primaryForeground: '#FAFAFA',
    secondary: '#F4F4F5',    // zinc-100
    secondaryForeground: '#18181B',
    accent: '#F4F4F5',       // zinc-100
    accentForeground: '#18181B',
    warn: '#F59E0B',         // amber-500
    error: '#EF4444',        // red-500
    success: '#22C55E',      // green-500
    muted: '#F4F4F5',        // zinc-100
    mutedForeground: '#71717A', // zinc-500
    ink: '#09090B',          // zinc-950
    border: '#E4E4E7',       // zinc-200
    input: '#E4E4E7',        // zinc-200
    ring: '#18181B',         // zinc-900 for focus rings
  },
  dark: {
    bg: '#09090B',           // zinc-950
    surface: '#18181B',      // zinc-900
    primary: '#FAFAFA',      // zinc-50
    primaryForeground: '#18181B',
    secondary: '#27272A',    // zinc-800
    secondaryForeground: '#FAFAFA',
    accent: '#27272A',       // zinc-800
    accentForeground: '#FAFAFA',
    warn: '#FBBF24',         // amber-400
    error: '#F87171',        // red-400
    success: '#4ADE80',      // green-400
    muted: '#27272A',        // zinc-800
    mutedForeground: '#A1A1AA', // zinc-400
    ink: '#FAFAFA',          // zinc-50
    border: '#27272A',       // zinc-800
    input: '#27272A',        // zinc-800
    ring: '#D4D4D8',         // zinc-300 for focus rings
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

// ShadCn uses more subtle, smaller border radius
export const borderRadius = {
  sm: 6,    // ShadCn default
  md: 8,
  lg: 10,
  xl: 12,
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

// ShadCn uses very subtle shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

