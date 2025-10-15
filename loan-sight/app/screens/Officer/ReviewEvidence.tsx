import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Badge } from '../../../components/Badge';
import { AIValidationBadge } from '../../../components/AIValidationBadge';
import { showToast } from '../../../components/AccessibleToast';
import { officerService } from '../../../lib/services/officerService';
import { useAuthStore } from '../../../lib/stores/authStore';
import { Evidence } from '../../../lib/types';
import { colors, spacing, typography, borderRadius } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface ReviewEvidenceProps {
  navigation: any;
  route: {
    params: {
      evidenceId: string;
    };
  };
}

export const ReviewEvidence: React.FC<ReviewEvidenceProps> = ({ navigation, route }) => {
  const { evidenceId } = route.params;
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decision, setDecision] = useState<'approved' | 'rejected' | 'flagged'>('approved');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { session } = useAuthStore();
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  useEffect(() => {
    loadEvidence();
  }, []);

  const loadEvidence = async () => {
    const data = await officerService.getEvidenceForReview(evidenceId);
    setEvidence(data);
  };

  const handleSubmitDecision = async () => {
    if (!evidence || !session?.officerId) return;

    setIsSubmitting(true);
    try {
      await officerService.submitDecision(
        evidence.id,
        session.officerId,
        decision,
        comment
      );

      showToast('success', 'Decision Submitted', `Evidence has been ${decision}`);
      setShowDecisionModal(false);
      navigation.goBack();
    } catch (error) {
      showToast('error', 'Error', 'Failed to submit decision');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user is an officer (has permission to approve/reject)
  const isOfficer = !!session?.officerId;

  if (!evidence) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
        <Text style={[styles.loadingText, { color: themeColors.mutedForeground }]}>
          Loading...
        </Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.imageCard}>
          <Image
            source={{ uri: evidence.mediaUri }}
            style={styles.image}
            resizeMode="contain"
          />
        </Card>

        <Card>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
              Evidence Details
            </Text>

            <View style={styles.detailRow}>
              <Ionicons name="document-text-outline" size={20} color={themeColors.muted} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: themeColors.mutedForeground }]}>
                  Evidence ID
                </Text>
                <Text style={[styles.detailValue, { color: themeColors.ink }]}>
                  {evidence.id}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color={themeColors.muted} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: themeColors.mutedForeground }]}>
                  Timestamp
                </Text>
                <Text style={[styles.detailValue, { color: themeColors.ink }]}>
                  {formatDate(evidence.timestamp)}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color={themeColors.muted} />
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: themeColors.mutedForeground }]}>
                  Location
                </Text>
                <Text style={[styles.detailValue, { color: themeColors.ink }]}>
                  {evidence.location.lat.toFixed(6)}, {evidence.location.lng.toFixed(6)}
                </Text>
              </View>
            </View>

            {evidence.amountSpent && (
              <View style={styles.detailRow}>
                <Ionicons name="cash-outline" size={20} color={themeColors.muted} />
                <View style={styles.detailContent}>
                  <Text style={[styles.detailLabel, { color: themeColors.mutedForeground }]}>
                    Amount Spent
                  </Text>
                  <Text style={[styles.detailValue, { color: themeColors.ink }]}>
                    ₹{evidence.amountSpent.toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>
            )}

            {evidence.notes && (
              <View style={styles.notesContainer}>
                <Text style={[styles.detailLabel, { color: themeColors.mutedForeground }]}>
                  Notes
                </Text>
                <Text style={[styles.notesText, { color: themeColors.ink }]}>
                  {evidence.notes}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.ink }]}>
              AI Validation
            </Text>
            <AIValidationBadge status={evidence.aiValidation} />
          </View>
        </Card>

        {/* Only show approve/reject buttons for officers */}
        {isOfficer ? (
          <View style={styles.actions}>
            <Button
              title="Approve"
              onPress={() => {
                setDecision('approved');
                setShowDecisionModal(true);
              }}
              variant="primary"
              style={styles.actionButton}
              testID="review-approve"
            />
            <Button
              title="Reject"
              onPress={() => {
                setDecision('rejected');
                setShowDecisionModal(true);
              }}
              variant="outline"
              style={styles.actionButton}
              testID="review-reject"
            />
          </View>
        ) : (
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="information-circle" size={24} color={themeColors.mutedForeground} />
              <Text style={[styles.infoText, { color: themeColors.mutedForeground }]}>
                You are viewing this evidence. Only loan officers can approve or reject evidence.
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>

      <Modal
        visible={showDecisionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDecisionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={[styles.modalContent, { backgroundColor: themeColors.bg }]}>
            <Text style={[styles.modalTitle, { color: themeColors.ink }]}>
              {decision === 'approved' ? 'Approve Evidence' : 'Reject Evidence'}
            </Text>

            <Input
              label="Comment"
              placeholder="Add your comments..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              style={styles.commentInput}
            />

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setShowDecisionModal(false)}
                variant="ghost"
                style={styles.modalButton}
              />
              <Button
                title="Submit"
                onPress={handleSubmitDecision}
                loading={isSubmitting}
                style={styles.modalButton}
              />
            </View>
          </Card>
        </View>
      </Modal>
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
  loadingText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  imageCard: {
    marginBottom: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#F4F4F5',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.headline,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
  },
  detailValue: {
    ...typography.body,
    marginTop: spacing.xs / 2,
  },
  notesContainer: {
    marginTop: spacing.sm,
  },
  notesText: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionButton: {
    flex: 1,
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
  },
  modalTitle: {
    ...typography.headline,
    marginBottom: spacing.md,
  },
  commentInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
  infoCard: {
    marginTop: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    flex: 1,
  },
});

