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
import { LoanCard } from '../../../components/LoanCard';
import { EvidenceCard } from '../../../components/EvidenceCard';
import { Button } from '../../../components/Button';
import { loanService } from '../../../lib/services/loanService';
import { evidenceService } from '../../../lib/services/evidenceService';
import { useAuthStore } from '../../../lib/stores/authStore';
import { Loan, Evidence } from '../../../lib/types';
import { colors, spacing, typography } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface BeneficiaryHomeProps {
  navigation: any;
}

export const BeneficiaryHome: React.FC<BeneficiaryHomeProps> = ({ navigation }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [recentEvidence, setRecentEvidence] = useState<Evidence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuthStore();
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!session?.beneficiaryId) return;

    setIsLoading(true);
    try {
      const userLoans = await loanService.listLoansForBeneficiary(session.beneficiaryId);
      setLoans(userLoans);

      if (userLoans.length > 0) {
        const evidence = await evidenceService.listByLoan(userLoans[0].id);
        setRecentEvidence(evidence.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickUpload = (loanId: string) => {
    navigation.navigate('RecordEvidence', { loanId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.bg }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: themeColors.mutedForeground }]}>
              Welcome back!
            </Text>
            <Text style={[styles.title, { color: themeColors.ink }]}>
              Your Loans
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color={themeColors.ink} />
          </TouchableOpacity>
        </View>

        {loans.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={themeColors.mutedForeground} />
            <Text style={[styles.emptyText, { color: themeColors.mutedForeground }]}>
              No active loans found
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              {loans.map((loan) => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  onQuickUpload={() => handleQuickUpload(loan.id)}
                  onViewDetails={() => navigation.navigate('LoanDetails', { loanId: loan.id })}
                />
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
                  Recent Evidence
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SyncManager')}>
                  <Text style={[styles.viewAllText, { color: themeColors.primary }]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {recentEvidence.length === 0 ? (
                <View style={[styles.infoBox, { backgroundColor: themeColors.muted, borderColor: themeColors.border }]}>
                  <Ionicons name="information-circle" size={20} color={themeColors.mutedForeground} />
                  <Text style={[styles.infoText, { color: themeColors.mutedForeground }]}>
                    No evidence uploaded yet. Tap "Quick Upload" to get started.
                  </Text>
                </View>
              ) : (
                recentEvidence.map((evidence) => (
                  <EvidenceCard
                    key={evidence.id}
                    evidence={evidence}
                    onOpen={() => navigation.navigate('ReviewEvidence', { evidenceId: evidence.id })}
                  />
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: themeColors.primary }]}
        onPress={() => navigation.navigate('RecordEvidence', { loanId: loans[0]?.id })}
        testID="quick-upload"
      >
        <Ionicons name="camera" size={24} color={themeColors.primaryForeground} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: 100,
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.headline,
  },
  viewAllText: {
    ...typography.body,
    fontWeight: '600',
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoText: {
    ...typography.bodySmall,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

