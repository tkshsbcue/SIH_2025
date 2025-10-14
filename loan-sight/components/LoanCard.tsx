import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { Badge } from './Badge';
import { Loan } from '../lib/types';
import { colors, spacing, typography } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface LoanCardProps {
  loan: Loan;
  onQuickUpload?: () => void;
  onViewDetails?: () => void;
}

export const LoanCard: React.FC<LoanCardProps> = ({
  loan,
  onQuickUpload,
  onViewDetails,
}) => {
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusVariant = () => {
    switch (loan.status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'defaulted':
        return 'error';
      default:
        return 'muted';
    }
  };

  return (
    <Card style={styles.card} testID="loan-card">
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Loan #{loan.id.slice(-4).toUpperCase()}
          </Text>
          <Badge label={loan.status.toUpperCase()} variant={getStatusVariant()} />
        </View>
        {onViewDetails && (
          <TouchableOpacity onPress={onViewDetails}>
            <Ionicons name="chevron-forward" size={24} color={themeColors.muted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: themeColors.primary }]}>
          {formatCurrency(loan.amount)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={16} color={themeColors.muted} />
          <Text style={[styles.infoText, { color: themeColors.muted }]}>
            Next upload in {loan.expectedUploadsEveryDays} days
          </Text>
        </View>
      </View>

      {onQuickUpload && (
        <TouchableOpacity
          style={[styles.uploadButton, { backgroundColor: themeColors.primary }]}
          onPress={onQuickUpload}
          testID="quick-upload"
        >
          <Ionicons name="camera" size={20} color="#FFFFFF" />
          <Text style={styles.uploadButtonText}>Quick Upload</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
  },
  amountContainer: {
    marginVertical: spacing.md,
  },
  amount: {
    ...typography.displayMedium,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: 8,
    gap: spacing.xs,
  },
  uploadButtonText: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

