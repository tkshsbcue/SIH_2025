import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EvidenceCard } from '../../../components/EvidenceCard';
import { Badge } from '../../../components/Badge';
import { Card } from '../../../components/Card';
import { officerService } from '../../../lib/services/officerService';
import { Evidence, OfficerFilters } from '../../../lib/types';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface OfficerDashboardProps {
  navigation: any;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ navigation }) => {
  const [evidenceList, setEvidenceList] = useState<Evidence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<OfficerFilters>({});
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  useEffect(() => {
    loadEvidence();
  }, [filters]);

  const loadEvidence = async () => {
    setIsLoading(true);
    try {
      const evidence = await officerService.listEvidence(filters);
      setEvidenceList(evidence);
    } catch (error) {
      console.error('Failed to load evidence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCounts = () => {
    return {
      pending: evidenceList.filter(e => e.syncStatus === 'pending').length,
      flagged: evidenceList.filter(e => e.aiValidation === 'flagged').length,
      synced: evidenceList.filter(e => e.syncStatus === 'synced').length,
      total: evidenceList.length,
    };
  };

  const counts = getCounts();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.bg }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadEvidence} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: themeColors.mutedForeground }]}>
              Officer Portal
            </Text>
            <Text style={[styles.title, { color: themeColors.ink }]}>
              Review Dashboard
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color={themeColors.ink} />
          </TouchableOpacity>
        </View>

        <View style={styles.countsContainer}>
          <Card style={styles.countCard} elevation="sm">
            <Text style={[styles.countValue, { color: themeColors.ink }]}>
              {counts.total}
            </Text>
            <Text style={[styles.countLabel, { color: themeColors.mutedForeground }]}>
              Total
            </Text>
          </Card>
          <Card style={styles.countCard} elevation="sm">
            <Text style={[styles.countValue, { color: themeColors.warn }]}>
              {counts.pending}
            </Text>
            <Text style={[styles.countLabel, { color: themeColors.mutedForeground }]}>
              Pending
            </Text>
          </Card>
          <Card style={styles.countCard} elevation="sm">
            <Text style={[styles.countValue, { color: themeColors.error }]}>
              {counts.flagged}
            </Text>
            <Text style={[styles.countLabel, { color: themeColors.mutedForeground }]}>
              Flagged
            </Text>
          </Card>
          <Card style={styles.countCard} elevation="sm">
            <Text style={[styles.countValue, { color: themeColors.success }]}>
              {counts.synced}
            </Text>
            <Text style={[styles.countLabel, { color: themeColors.mutedForeground }]}>
              Synced
            </Text>
          </Card>
        </View>

        <View style={[styles.filterBar, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Ionicons name="filter" size={20} color={themeColors.primary} />
          <Text style={[styles.filterText, { color: themeColors.mutedForeground }]}>
            Filters
          </Text>
          <TouchableOpacity onPress={() => setFilters({})}>
            <Text style={[styles.clearText, { color: themeColors.primary }]}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.evidenceSection}>
          {evidenceList.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={64} color={themeColors.muted} />
              <Text style={[styles.emptyText, { color: themeColors.mutedForeground }]}>
                No evidence to review
              </Text>
            </View>
          ) : (
            evidenceList.map((evidence) => (
              <EvidenceCard
                key={evidence.id}
                evidence={evidence}
                onOpen={() => navigation.navigate('ReviewEvidence', { evidenceId: evidence.id })}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.bodySmall,
  },
  title: {
    ...typography.displayMedium,
    marginTop: spacing.xs / 2,
  },
  countsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  countCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  countValue: {
    ...typography.headline,
  },
  countLabel: {
    ...typography.caption,
    marginTop: spacing.xs / 2,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  filterText: {
    ...typography.bodySmall,
    flex: 1,
  },
  clearText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  evidenceSection: {
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

