import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvidenceCard } from '../../../components/EvidenceCard';
import { Button } from '../../../components/Button';
import { Badge } from '../../../components/Badge';
import { useSyncStore } from '../../../lib/stores/syncStore';
import { useNetInfoSync } from '../../../lib/hooks/useNetInfoSync';
import { showToast } from '../../../components/AccessibleToast';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface SyncManagerProps {
  navigation: any;
}

export const SyncManager: React.FC<SyncManagerProps> = ({ navigation }) => {
  const { queue, isSyncing, loadQueue, syncAll, syncItem, removeFromQueue } = useSyncStore();
  const { isConnected, connectionType } = useNetInfoSync();
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  useEffect(() => {
    loadQueue();
  }, []);

  const handleSyncAll = async () => {
    if (!isConnected) {
      showToast('error', 'No Connection', 'Please check your internet connection');
      return;
    }

    await syncAll();
    showToast('success', 'Sync Complete', 'All pending items have been synced');
  };

  const handleRetry = async (evidenceId: string) => {
    if (!isConnected) {
      showToast('error', 'No Connection', 'Please check your internet connection');
      return;
    }

    try {
      await syncItem(evidenceId);
      showToast('success', 'Synced', 'Evidence uploaded successfully');
    } catch (error) {
      showToast('error', 'Failed', 'Could not sync evidence');
    }
  };

  const pendingCount = queue.filter(e => e.syncStatus === 'pending' || e.syncStatus === 'failed').length;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isSyncing} onRefresh={loadQueue} />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Sync Manager
          </Text>
          <View style={styles.connectionIndicator}>
            <Ionicons
              name={isConnected ? 'wifi' : 'wifi-outline'}
              size={20}
              color={isConnected ? themeColors.success : themeColors.error}
            />
            <Text style={[styles.connectionText, { color: themeColors.mutedForeground }]}>
              {isConnected ? `Connected (${connectionType})` : 'Offline'}
            </Text>
          </View>
        </View>

        <View style={[styles.statsCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: themeColors.ink }]}>
              {queue.length}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
              Total Items
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: themeColors.warn }]}>
              {pendingCount}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
              Pending
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: themeColors.success }]}>
              {queue.filter(e => e.syncStatus === 'synced').length}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.mutedForeground }]}>
              Synced
            </Text>
          </View>
        </View>

        {pendingCount > 0 && (
          <Button
            title={`Sync All (${pendingCount})`}
            onPress={handleSyncAll}
            loading={isSyncing}
            disabled={!isConnected}
            testID="sync-all"
            style={styles.syncButton}
          />
        )}

        <View style={styles.queueSection}>
          {queue.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="cloud-done-outline" size={64} color={themeColors.muted} />
              <Text style={[styles.emptyText, { color: themeColors.mutedForeground }]}>
                No items in queue
              </Text>
            </View>
          ) : (
            queue.map((evidence) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
                onOpen={() => navigation.navigate('ReviewEvidence', { evidenceId: evidence.id })}
                onRetry={() => handleRetry(evidence.id)}
              />
            ))
          )}
        </View>
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
    marginBottom: spacing.sm,
  },
  connectionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  connectionText: {
    ...typography.bodySmall,
  },
  statsCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.displayMedium,
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs / 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F4F4F5',
  },
  syncButton: {
    marginBottom: spacing.lg,
  },
  queueSection: {
    marginBottom: spacing.lg,
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
});

