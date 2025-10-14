import AsyncStorage from '@react-native-async-storage/async-storage';
import { Evidence, OfficerFilters, Decision } from '../types';
import { evidenceService } from './evidenceService';

const DECISIONS_KEY = 'officer_decisions';

export const officerService = {
  async listEvidence(
    filters?: OfficerFilters,
    pagination?: { page: number; limit: number }
  ): Promise<Evidence[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    let allEvidence = await evidenceService.getAllEvidence();

    if (filters?.status && filters.status !== 'all') {
      allEvidence = allEvidence.filter((e) => e.syncStatus === filters.status);
    }

    if (filters?.aiValidation && filters.aiValidation !== 'all') {
      allEvidence = allEvidence.filter((e) => e.aiValidation === filters.aiValidation);
    }

    if (filters?.dateFrom) {
      allEvidence = allEvidence.filter(
        (e) => new Date(e.timestamp) >= new Date(filters.dateFrom!)
      );
    }

    if (filters?.dateTo) {
      allEvidence = allEvidence.filter(
        (e) => new Date(e.timestamp) <= new Date(filters.dateTo!)
      );
    }

    allEvidence.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (pagination) {
      const start = (pagination.page - 1) * pagination.limit;
      return allEvidence.slice(start, start + pagination.limit);
    }

    return allEvidence;
  },

  async getEvidenceForReview(id: string): Promise<Evidence | null> {
    return evidenceService.getById(id);
  },

  async submitDecision(
    evidenceId: string,
    officerId: string,
    decision: 'approved' | 'rejected' | 'flagged',
    comment: string
  ): Promise<Evidence> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const evidence = await evidenceService.getById(evidenceId);
    if (!evidence) {
      throw new Error('Evidence not found');
    }

    const decisionRecord: Decision = {
      evidenceId,
      officerId,
      decision,
      comment,
      timestamp: new Date().toISOString(),
    };

    const decisions = await this.getDecisions();
    decisions.push(decisionRecord);
    await AsyncStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));

    if (decision === 'flagged') {
      evidence.aiValidation = 'flagged';
    }

    return evidence;
  },

  async getDecisions(): Promise<Decision[]> {
    try {
      const decisionsStr = await AsyncStorage.getItem(DECISIONS_KEY);
      return decisionsStr ? JSON.parse(decisionsStr) : [];
    } catch {
      return [];
    }
  },
};

