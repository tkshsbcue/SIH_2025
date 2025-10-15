import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useAuthStore } from '../../lib/stores/authStore';
import { useSyncStore } from '../../lib/stores/syncStore';
import { colors, spacing, typography } from '../../lib/utils/theme';
import { APP_NAME } from '../../lib/utils/constants';

interface SettingsProps {
  navigation: any;
}

export const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { logout, session } = useAuthStore();
  const { wifiOnly, setWifiOnly } = useSyncStore();
  const themeColors = colors[theme];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'PhoneLogin' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Settings
          </Text>
        </View>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons
                name={theme === 'dark' ? 'moon' : 'sunny'}
                size={24}
                color={themeColors.primary}
              />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: themeColors.ink }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, { color: themeColors.mutedForeground }]}>
                  Switch between light and dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              testID="toggle-theme"
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
            Sync Settings
          </Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="wifi" size={24} color={themeColors.primary} />
              <View style={styles.settingText}>
                <Text style={[styles.settingLabel, { color: themeColors.ink }]}>
                  WiFi Only Sync
                </Text>
                <Text style={[styles.settingDescription, { color: themeColors.mutedForeground }]}>
                  Only sync when connected to WiFi
                </Text>
              </View>
            </View>
            <Switch
              value={wifiOnly}
              onValueChange={setWifiOnly}
            />
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
            Account
          </Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="person-circle-outline" size={24} color={themeColors.muted} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: themeColors.mutedForeground }]}>
                Role
              </Text>
              <Text style={[styles.infoValue, { color: themeColors.ink }]}>
                {session?.role === 'beneficiary' ? 'Beneficiary' : 'Officer'}
              </Text>
            </View>
          </View>

          {session?.phone && (
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={24} color={themeColors.muted} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: themeColors.mutedForeground }]}>
                  Phone
                </Text>
                <Text style={[styles.infoValue, { color: themeColors.ink }]}>
                  {session.phone}
                </Text>
              </View>
            </View>
          )}

          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
            About
          </Text>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: themeColors.mutedForeground }]}>
              App Name
            </Text>
            <Text style={[styles.aboutValue, { color: themeColors.ink }]}>
              {APP_NAME}
            </Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: themeColors.mutedForeground }]}>
              Version
            </Text>
            <Text style={[styles.aboutValue, { color: themeColors.ink }]}>
              1.0.0
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.displayMedium,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    ...typography.body,
  },
  settingDescription: {
    ...typography.caption,
    marginTop: spacing.xs / 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    ...typography.caption,
  },
  infoValue: {
    ...typography.body,
    marginTop: spacing.xs / 2,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  aboutLabel: {
    ...typography.body,
  },
  aboutValue: {
    ...typography.body,
    fontWeight: '600',
  },
});

