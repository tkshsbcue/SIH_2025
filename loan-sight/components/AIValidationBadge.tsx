import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './Badge';
import { Card } from './Card';
import { Button } from './Button';
import { Evidence } from '../lib/types';
import { colors, spacing, typography, borderRadius } from '../lib/utils/theme';
import { useThemeStore } from '../lib/stores/themeStore';

interface AIValidationBadgeProps {
  status: Evidence['aiValidation'];
  reasons?: string[];
}

export const AIValidationBadge: React.FC<AIValidationBadgeProps> = ({
  status,
  reasons = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const getVariant = () => {
    switch (status) {
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

  const getDefaultReasons = () => {
    switch (status) {
      case 'ok':
        return [
          'Receipt clearly visible',
          'Amount matches reported value',
          'Location data verified',
          'Timestamp is valid',
        ];
      case 'flagged':
        return [
          'Image quality is below threshold',
          'Receipt date is outside loan period',
          'Vendor information not clearly visible',
        ];
      case 'pending':
        return ['AI validation in progress...'];
      default:
        return [];
    }
  };

  const displayReasons = reasons.length > 0 ? reasons : getDefaultReasons();

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={styles.container}>
          <Badge label={`AI: ${status.toUpperCase()}`} variant={getVariant()} />
          <Ionicons name="information-circle-outline" size={18} color={themeColors.primary} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={[styles.modalContent, { backgroundColor: themeColors.bg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: themeColors.ink }]}>
                AI Validation Details
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} color={themeColors.ink} />
              </TouchableOpacity>
            </View>

            <View style={styles.statusContainer}>
              <Badge label={status.toUpperCase()} variant={getVariant()} />
            </View>

            <ScrollView style={styles.reasonsContainer}>
              <Text style={[styles.reasonsTitle, { color: themeColors.ink }]}>
                {status === 'ok' ? 'Checks Passed:' : status === 'flagged' ? 'Issues Found:' : 'Status:'}
              </Text>
              {displayReasons.map((reason, index) => (
                <View key={index} style={styles.reasonItem}>
                  <Ionicons
                    name={status === 'ok' ? 'checkmark-circle' : status === 'flagged' ? 'alert-circle' : 'time'}
                    size={20}
                    color={status === 'ok' ? themeColors.success : status === 'flagged' ? themeColors.error : themeColors.warn}
                  />
                  <Text style={[styles.reasonText, { color: themeColors.ink }]}>
                    {reason}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <Button title="Close" onPress={() => setShowModal(false)} variant="primary" />
          </Card>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.headline,
  },
  statusContainer: {
    marginBottom: spacing.md,
  },
  reasonsContainer: {
    marginBottom: spacing.md,
  },
  reasonsTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  reasonText: {
    ...typography.body,
    flex: 1,
  },
});

