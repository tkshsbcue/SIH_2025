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
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { APP_NAME, APP_TAGLINE } from '../../../lib/utils/constants';

interface PhoneLoginProps {
  navigation: any;
}

export const PhoneLogin: React.FC<PhoneLoginProps> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      showToast('error', 'Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    setIsLoading(true);
    try {
      const result = await authService.sendOtp(formattedPhone);
      
      if (result.success) {
        showToast('success', 'OTP Sent', `OTP has been sent to ${formattedPhone}`);
        navigation.navigate('OtpVerify', { phone: formattedPhone, otpStub: result.otpStub });
      } else {
        showToast('error', 'Failed', 'Phone number not found. Use demo: +919876543210');
      }
    } catch (error) {
      showToast('error', 'Error', 'Failed to send OTP. Please try again.');
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
          <Text style={[styles.tagline, { color: themeColors.muted }]}>{APP_TAGLINE}</Text>
        </View>

        <Card style={styles.card}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Beneficiary Login
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.muted }]}>
            Enter your phone number to receive an OTP
          </Text>

          <Input
            label="Phone Number"
            placeholder="9876543210"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={13}
            testID="phone-input"
            accessibilityLabel="Phone number input"
          />

          <Button
            title="Send OTP"
            onPress={handleSendOtp}
            loading={isLoading}
            testID="phone-send-otp"
          />

          <View style={[styles.infoBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Ionicons name="information-circle" size={20} color={themeColors.primary} />
            <Text style={[styles.infoText, { color: themeColors.muted }]}>
              Demo: Use +919876543210 or any number from the list
            </Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title="I'm an Officer"
            onPress={() => navigation.navigate('OfficerLogin')}
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
  tagline: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.headline,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    marginBottom: spacing.lg,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  infoText: {
    ...typography.caption,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
});

