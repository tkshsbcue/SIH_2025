import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from './components/AccessibleToast';
import { RootNavigator } from './app/navigation';
import { useThemeStore } from './lib/stores/themeStore';
import { useAuthStore } from './lib/stores/authStore';
import { useSyncStore } from './lib/stores/syncStore';

export default function App() {
  const { theme, loadTheme } = useThemeStore();
  const { loadSession } = useAuthStore();
  const { loadQueue } = useSyncStore();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await loadTheme();
    await loadSession();
    await loadQueue();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
        <ToastProvider />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
