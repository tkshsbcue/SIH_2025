import AsyncStorage from '@react-native-async-storage/async-storage';
import { Evidence } from '../types';
import { mockEvidence } from './seedData';

const EVIDENCE_QUEUE_KEY = 'evidence_queue';
const EVIDENCE_STORE_KEY = 'evidence_store';

export const evidenceService = {
  async saveDraft(evidence: Partial<Evidence>): Promise<Evidence> {
    const newEvidence: Evidence = {
      id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      loanId: evidence.loanId || '',
      beneficiaryId: evidence.beneficiaryId || '',
      mediaUri: evidence.mediaUri || '',
      mediaType: evidence.mediaType || 'image',
      timestamp: evidence.timestamp || new Date().toISOString(),
      location: evidence.location || { lat: 0, lng: 0 },
      deviceId: evidence.deviceId || 'device-unknown',
      notes: evidence.notes || '',
      syncStatus: 'pending',
      aiValidation: 'pending',
      serverId: null,
      amountSpent: evidence.amountSpent,
    };

    const queue = await this.getQueue();
    queue.push(newEvidence);
    await AsyncStorage.setItem(EVIDENCE_QUEUE_KEY, JSON.stringify(queue));

    return newEvidence;
  },

  async syncEvidence(evidenceId: string): Promise<Evidence> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const queue = await this.getQueue();
    const evidenceIndex = queue.findIndex((e) => e.id === evidenceId);
    
    if (evidenceIndex === -1) {
      throw new Error('Evidence not found in queue');
    }

    const evidence = queue[evidenceIndex];
    const syncedEvidence: Evidence = {
      ...evidence,
      syncStatus: 'synced',
      aiValidation: Math.random() > 0.2 ? 'ok' : 'flagged',
      serverId: `srv_${evidenceId}`,
    };

    queue[evidenceIndex] = syncedEvidence;
    await AsyncStorage.setItem(EVIDENCE_QUEUE_KEY, JSON.stringify(queue));

    const store = await this.getAllEvidence();
    const existingIndex = store.findIndex((e) => e.id === evidenceId);
    if (existingIndex >= 0) {
      store[existingIndex] = syncedEvidence;
    } else {
      store.push(syncedEvidence);
    }
    await AsyncStorage.setItem(EVIDENCE_STORE_KEY, JSON.stringify(store));

    return syncedEvidence;
  },

  async listByLoan(loanId: string): Promise<Evidence[]> {
    const allEvidence = await this.getAllEvidence();
    return allEvidence.filter((e) => e.loanId === loanId);
  },

  async getById(id: string): Promise<Evidence | null> {
    const allEvidence = await this.getAllEvidence();
    return allEvidence.find((e) => e.id === id) || null;
  },

  async deleteDraft(id: string): Promise<void> {
    const queue = await this.getQueue();
    const filtered = queue.filter((e) => e.id !== id);
    await AsyncStorage.setItem(EVIDENCE_QUEUE_KEY, JSON.stringify(filtered));
  },

  async getQueue(): Promise<Evidence[]> {
    try {
      const queueStr = await AsyncStorage.getItem(EVIDENCE_QUEUE_KEY);
      return queueStr ? JSON.parse(queueStr) : [];
    } catch {
      return [];
    }
  },

  async getAllEvidence(): Promise<Evidence[]> {
    try {
      const storeStr = await AsyncStorage.getItem(EVIDENCE_STORE_KEY);
      const stored = storeStr ? JSON.parse(storeStr) : [];
      return [...mockEvidence, ...stored];
    } catch {
      return mockEvidence;
    }
  },

  async updateSyncStatus(
    evidenceId: string,
    status: Evidence['syncStatus']
  ): Promise<void> {
    const queue = await this.getQueue();
    const evidenceIndex = queue.findIndex((e) => e.id === evidenceId);
    if (evidenceIndex >= 0) {
      queue[evidenceIndex].syncStatus = status;
      await AsyncStorage.setItem(EVIDENCE_QUEUE_KEY, JSON.stringify(queue));
    }
  },
};

