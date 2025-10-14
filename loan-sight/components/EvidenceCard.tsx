import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { Badge } from './Badge';
import { Evidence } from '../lib/types';
import { colors, spacing, typography, borderRadius } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface EvidenceCardProps {
  evidence: Evidence;
  onOpen?: () => void;
  onRetry?: () => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onOpen,
  onRetry,
}) => {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const getSyncStatusVariant = () => {
    switch (evidence.syncStatus) {
      case 'synced':
        return 'success';
      case 'syncing':
        return 'info';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'muted';
    }
  };

  const getAIValidationVariant = () => {
    switch (evidence.aiValidation) {
      case 'ok':
        return 'success';
      case 'flagged':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'muted';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card style={styles.card} testID="evidence-card">
      <TouchableOpacity onPress={onOpen} disabled={!onOpen} activeOpacity={0.7}>
        <View style={styles.container}>
          <Image
            source={{ uri: evidence.mediaUri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <View style={styles.badges}>
              <Badge
                label={evidence.syncStatus.toUpperCase()}
                variant={getSyncStatusVariant()}
              />
              {evidence.syncStatus === 'synced' && (
                <Badge
                  label={`AI: ${evidence.aiValidation.toUpperCase()}`}
                  variant={getAIValidationVariant()}
                />
              )}
            </View>

            <Text style={[styles.notes, { color: themeColors.ink }]} numberOfLines={2}>
              {evidence.notes || 'No notes'}
            </Text>

            <View style={styles.metadata}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={themeColors.muted} />
                <Text style={[styles.metaText, { color: themeColors.muted }]}>
                  {formatDate(evidence.timestamp)}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={14} color={themeColors.muted} />
                <Text style={[styles.metaText, { color: themeColors.muted }]}>
                  {evidence.location.lat.toFixed(4)}, {evidence.location.lng.toFixed(4)}
                </Text>
              </View>
              {evidence.amountSpent && (
                <View style={styles.metaItem}>
                  <Ionicons name="cash-outline" size={14} color={themeColors.muted} />
                  <Text style={[styles.metaText, { color: themeColors.muted }]}>
                    ₹{evidence.amountSpent.toLocaleString('en-IN')}
                  </Text>
                </View>
              )}
            </View>

            {evidence.syncStatus === 'failed' && onRetry && (
              <TouchableOpacity
                style={[styles.retryButton, { borderColor: themeColors.error }]}
                onPress={onRetry}
              >
                <Ionicons name="refresh" size={16} color={themeColors.error} />
                <Text style={[styles.retryText, { color: themeColors.error }]}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    backgroundColor: '#E5E7EB',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  notes: {
    ...typography.bodySmall,
  },
  metadata: {
    gap: spacing.xs / 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  metaText: {
    ...typography.caption,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    gap: spacing.xs / 2,
    marginTop: spacing.xs,
  },
  retryText: {
    ...typography.caption,
    fontWeight: '600',
  },
});

