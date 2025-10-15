import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/Card';
import { Badge } from '../../../components/Badge';
import { NotificationItem } from '../../../lib/types';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface NotificationCenterProps {
  navigation: any;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Upload Reminder',
    body: 'Your monthly evidence upload is due in 3 days',
    read: false,
    deepLink: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif_2',
    title: 'Evidence Approved',
    body: 'Your evidence for loan #100 has been approved',
    read: true,
    deepLink: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ navigation }) => {
  const [notifications] = useState<NotificationItem[]>(mockNotifications);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.ink }]}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <Badge label={`${unreadCount} new`} variant="info" />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color={themeColors.muted} />
            <Text style={[styles.emptyText, { color: themeColors.mutedForeground }]}>
              No notifications yet
            </Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <Card
                style={[
                  styles.notificationCard,
                  !notification.read && { borderLeftWidth: 4, borderLeftColor: themeColors.primary }
                ]}
              >
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationIcon}>
                    <Ionicons
                      name={notification.read ? 'mail-open-outline' : 'mail-unread-outline'}
                      size={24}
                      color={notification.read ? themeColors.mutedForeground : themeColors.primary}
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationTitle, { color: themeColors.ink }]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationBody, { color: themeColors.mutedForeground }]}>
                      {notification.body}
                    </Text>
                    <Text style={[styles.notificationTime, { color: themeColors.mutedForeground }]}>
                      {formatDate(notification.createdAt)}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.displayMedium,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyText: {
    ...typography.body,
    marginTop: spacing.md,
  },
  notificationCard: {
    marginBottom: spacing.md,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  notificationIcon: {
    paddingTop: spacing.xs / 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...typography.body,
    fontWeight: '600',
  },
  notificationBody: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  notificationTime: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});

