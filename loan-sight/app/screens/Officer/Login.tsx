import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { showToast } from '../../../components/AccessibleToast';
import { authService } from '../../../lib/services/authService';
import { useAuthStore } from '../../../lib/stores/authStore';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { APP_NAME } from '../../../lib/utils/constants';

interface OfficerLoginProps {
  navigation: any;
}

export const OfficerLogin: React.FC<OfficerLoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];
  const { setSession } = useAuthStore();

  const handleLogin = async () => {
    if (!username || !password) {
      showToast('error', 'Invalid Input', 'Please enter username and password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.officerLogin(username, password);
      
      if (result.success && result.userSession) {
        setSession(result.userSession);
        showToast('success', 'Login Successful', 'Welcome to Officer Portal');
        navigation.reset({
          index: 0,
          routes: [{ name: 'OfficerMain' }],
        });
      } else {
        showToast('error', 'Invalid Credentials', 'Please check your username and password');
      }
    } catch (error) {
      showToast('error', 'Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.bg }]} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="shield-checkmark" size={64} color={themeColors.primary} />
          <Text style={[styles.appName, { color: themeColors.ink }]}>{APP_NAME}</Text>
          <Text style={[styles.subtitle, { color: themeColors.mutedForeground }]}>
            Officer Portal
          </Text>
        </View>

        <Card style={styles.card}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Officer Login
          </Text>

          <Input
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            testID="officer-username"
          />

          <Input
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            testID="officer-password"
          />

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            testID="officer-login-button"
          />

          <View style={[styles.demoBox, { backgroundColor: themeColors.warn + '20', borderColor: themeColors.warn }]}>
            <Ionicons name="flask" size={20} color={themeColors.warn} />
            <View style={styles.demoContent}>
              <Text style={[styles.demoText, { color: themeColors.ink }]}>
                Demo Credentials:
              </Text>
              <Text style={[styles.demoDetail, { color: themeColors.mutedForeground }]}>
                Username: priyasharma
              </Text>
              <Text style={[styles.demoDetail, { color: themeColors.mutedForeground }]}>
                Password: officer123
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Back to Home"
            onPress={() => navigation.goBack()}
            variant="ghost"
          />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    ...typography.displayLarge,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.title,
    marginTop: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.headline,
    marginBottom: spacing.lg,
  },
  demoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  demoContent: {
    flex: 1,
  },
  demoText: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  demoDetail: {
    ...typography.bodySmall,
  },
  footer: {
    alignItems: 'center',
  },
});

