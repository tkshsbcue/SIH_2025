import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CaptureWidget, CaptureMetadata } from '../../../components/CaptureWidget';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { showToast } from '../../../components/AccessibleToast';
import { evidenceService } from '../../../lib/services/evidenceService';
import { useSyncStore } from '../../../lib/stores/syncStore';
import { useAuthStore } from '../../../lib/stores/authStore';
import { colors, spacing, typography, borderRadius } from '../../../lib/utils/theme';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { UPLOAD_HELP_TITLE, UPLOAD_HELP_BULLETS } from '../../../lib/utils/constants';

interface RecordEvidenceProps {
  navigation: any;
  route: {
    params?: {
      loanId?: string;
    };
  };
}

export const RecordEvidence: React.FC<RecordEvidenceProps> = ({ navigation, route }) => {
  const loanId = route.params?.loanId || '';
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<CaptureMetadata | null>(null);
  const [notes, setNotes] = useState('');
  const [amountSpent, setAmountSpent] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { session } = useAuthStore();
  const { addToQueue, syncItem } = useSyncStore();
  const { theme } = useThemeStore();
  const themeColors = colors[theme];

  const handleCapture = (uri: string, meta: CaptureMetadata) => {
    setMediaUri(uri);
    setMetadata(meta);
  };

  const handleSaveDraft = async () => {
    if (!mediaUri || !metadata) {
      showToast('error', 'No Media', 'Please capture or select an image first');
      return;
    }

    setIsSaving(true);
    try {
      const evidence = await evidenceService.saveDraft({
        loanId,
        beneficiaryId: session?.beneficiaryId || '',
        mediaUri,
        mediaType: 'image',
        timestamp: metadata.timestamp,
        location: metadata.location,
        deviceId: metadata.deviceId,
        notes,
        amountSpent: amountSpent ? parseFloat(amountSpent) : undefined,
      });

      addToQueue(evidence);
      showToast('success', 'Saved', 'Evidence saved as draft');
      navigation.goBack();
    } catch (error) {
      showToast('error', 'Error', 'Failed to save evidence');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndSync = async () => {
    if (!mediaUri || !metadata) {
      showToast('error', 'No Media', 'Please capture or select an image first');
      return;
    }

    setIsSaving(true);
    try {
      const evidence = await evidenceService.saveDraft({
        loanId,
        beneficiaryId: session?.beneficiaryId || '',
        mediaUri,
        mediaType: 'image',
        timestamp: metadata.timestamp,
        location: metadata.location,
        deviceId: metadata.deviceId,
        notes,
        amountSpent: amountSpent ? parseFloat(amountSpent) : undefined,
      });

      addToQueue(evidence);
      await syncItem(evidence.id);
      showToast('success', 'Uploaded', 'Evidence uploaded successfully');
      navigation.goBack();
    } catch (error) {
      showToast('error', 'Error', 'Failed to upload evidence');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.ink }]}>
            Record Evidence
          </Text>
          <TouchableOpacity onPress={() => setShowHelp(true)}>
            <Ionicons name="help-circle-outline" size={24} color={themeColors.primary} />
          </TouchableOpacity>
        </View>

        <CaptureWidget onCapture={handleCapture} mode="photo" />

        <Card>
          <Input
            label="Amount Spent (₹)"
            placeholder="Enter amount"
            value={amountSpent}
            onChangeText={setAmountSpent}
            keyboardType="numeric"
          />

          <Input
            label="Notes (Optional)"
            placeholder="Describe the purchase..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.notesInput}
          />

          {metadata && (
            <View style={[styles.metadataBox, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <View style={styles.metadataItem}>
                <Ionicons name="location" size={16} color={themeColors.muted} />
                <Text style={[styles.metadataText, { color: themeColors.muted }]}>
                  {metadata.location.lat.toFixed(4)}, {metadata.location.lng.toFixed(4)}
                </Text>
              </View>
              <View style={styles.metadataItem}>
                <Ionicons name="time" size={16} color={themeColors.muted} />
                <Text style={[styles.metadataText, { color: themeColors.muted }]}>
                  {new Date(metadata.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        </Card>

        <View style={styles.actions}>
          <Button
            title="Save Draft"
            onPress={handleSaveDraft}
            variant="outline"
            loading={isSaving}
            style={styles.actionButton}
            testID="save-draft"
          />
          <Button
            title="Save & Sync"
            onPress={handleSaveAndSync}
            variant="primary"
            loading={isSaving}
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
        <View style={styles.modalOverlay}>
          <Card style={[styles.modalContent, { backgroundColor: themeColors.bg }]}>
            <Text style={[styles.modalTitle, { color: themeColors.ink }]}>
              {UPLOAD_HELP_TITLE}
            </Text>
            {UPLOAD_HELP_BULLETS.map((bullet, index) => (
              <View key={index} style={styles.bulletItem}>
                <Ionicons name="checkmark-circle" size={20} color={themeColors.success} />
                <Text style={[styles.bulletText, { color: themeColors.ink }]}>
                  {bullet}
                </Text>
              </View>
            ))}
            <Button title="Got it!" onPress={() => setShowHelp(false)} />
          </Card>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.displayMedium,
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  metadataBox: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metadataText: {
    ...typography.caption,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
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
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bulletText: {
    ...typography.body,
    flex: 1,
  },
});

