import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { showToast } from '../../../components/AccessibleToast';
import { authService } from '../../../lib/services/authService';
import { useAuthStore } from '../../../lib/stores/authStore';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { OTP_EXPIRY_SECONDS, OTP_LENGTH } from '../../../lib/utils/constants';

interface OtpVerifyProps {
  navigation: any;
  route: {
    params: {
      phone: string;
      otpStub?: string;
    };
  };
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({ navigation, route }) => {
  const { phone, otpStub } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(OTP_EXPIRY_SECONDS);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];
  const { setSession } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== OTP_LENGTH) {
      showToast('error', 'Invalid OTP', `Please enter the ${OTP_LENGTH}-digit OTP`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.verifyOtp(phone, otp);
      
      if (result.success && result.userSession) {
        setSession(result.userSession);
        showToast('success', 'Login Successful', 'Welcome to LoanSight!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        showToast('error', 'Invalid OTP', 'Please check and try again');
      }
    } catch (error) {
      showToast('error', 'Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setTimer(OTP_EXPIRY_SECONDS);
    const result = await authService.sendOtp(phone);
    if (result.success) {
      showToast('success', 'OTP Sent', 'A new OTP has been sent to your phone');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="mail-open" size={64} color={themeColors.primary} />
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Verify OTP
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.muted }]}>
            Enter the 6-digit code sent to{'\n'}
            {phone}
          </Text>
        </View>

        <Card style={styles.card}>
          <Input
            label={`OTP (${OTP_LENGTH} digits)`}
            placeholder="123456"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            testID="otp-input"
            accessibilityLabel="OTP input"
          />

          <Button
            title="Verify OTP"
            onPress={handleVerifyOtp}
            loading={isLoading}
            testID="phone-verify-otp"
          />

          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <Text style={[styles.timerText, { color: themeColors.muted }]}>
                Resend OTP in {timer}s
              </Text>
            ) : (
              <Button
                title="Resend OTP"
                onPress={handleResendOtp}
                variant="ghost"
              />
            )}
          </View>

          {otpStub && (
            <View style={[styles.demoBox, { backgroundColor: themeColors.warn + '20', borderColor: themeColors.warn }]}>
              <Ionicons name="flask" size={20} color={themeColors.warn} />
              <Text style={[styles.demoText, { color: themeColors.ink }]}>
                Demo OTP: {otpStub}
              </Text>
            </View>
          )}
        </Card>

        <View style={styles.footer}>
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            variant="ghost"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    ...typography.displayMedium,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing.lg,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  timerText: {
    ...typography.bodySmall,
  },
  demoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  demoText: {
    ...typography.body,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
});

