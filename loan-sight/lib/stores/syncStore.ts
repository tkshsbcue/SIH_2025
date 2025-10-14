import { create } from 'zustand';
import { Evidence } from '../types';
import { evidenceService } from '../services/evidenceService';

interface SyncState {
  queue: Evidence[];
  isSyncing: boolean;
  wifiOnly: boolean;
  
  loadQueue: () => Promise<void>;
  addToQueue: (evidence: Evidence) => void;
  syncItem: (evidenceId: string) => Promise<void>;
  syncAll: () => Promise<void>;
  removeFromQueue: (evidenceId: string) => Promise<void>;
  setWifiOnly: (wifiOnly: boolean) => void;
}

export const useSyncStore = create<SyncState>((set, get) => ({
  queue: [],
  isSyncing: false,
  wifiOnly: false,

  loadQueue: async () => {
    const queue = await evidenceService.getQueue();
    set({ queue });
  },

  addToQueue: (evidence) => {
    set((state) => ({ queue: [...state.queue, evidence] }));
  },

  syncItem: async (evidenceId: string) => {
    try {
      await evidenceService.updateSyncStatus(evidenceId, 'syncing');
      await get().loadQueue();
      
      const synced = await evidenceService.syncEvidence(evidenceId);
      
      set((state) => ({
        queue: state.queue.map((e) => (e.id === evidenceId ? synced : e)),
      }));
    } catch (error) {
      await evidenceService.updateSyncStatus(evidenceId, 'failed');
      await get().loadQueue();
    }
  },

  syncAll: async () => {
    const { queue } = get();
    set({ isSyncing: true });

    for (const evidence of queue) {
      if (evidence.syncStatus === 'pending' || evidence.syncStatus === 'failed') {
        await get().syncItem(evidence.id);
      }
    }

    set({ isSyncing: false });
    await get().loadQueue();
  },

  removeFromQueue: async (evidenceId: string) => {
    await evidenceService.deleteDraft(evidenceId);
    set((state) => ({ queue: state.queue.filter((e) => e.id !== evidenceId) }));
  },

  setWifiOnly: (wifiOnly) => set({ wifiOnly }),
}));

