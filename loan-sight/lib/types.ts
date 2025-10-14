export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  loans: string[];
  avatarUrl: string | null;
}

export interface Loan {
  id: string;
  beneficiaryId: string;
  amount: number;
  startDate: string;
  endDate: string;
  expectedUploadsEveryDays: number;
  status: 'active' | 'completed' | 'defaulted';
}

export interface Evidence {
  id: string;
  loanId: string;
  beneficiaryId: string;
  mediaUri: string;
  mediaType: 'image' | 'video';
  timestamp: string;
  location: { lat: number; lng: number };
  deviceId: string;
  notes: string;
  syncStatus: 'pending' | 'syncing' | 'synced' | 'failed';
  aiValidation: 'pending' | 'ok' | 'flagged';
  serverId: string | null;
  amountSpent?: number;
}

export interface Officer {
  id: string;
  name: string;
  role: 'state_officer' | 'bank_officer';
  region: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  deepLink: string | null;
  createdAt: string;
}

export interface UserSession {
  id: string;
  phone: string;
  role: 'beneficiary' | 'officer';
  beneficiaryId?: string;
  officerId?: string;
}

export interface OfficerFilters {
  region?: string;
  status?: Evidence['syncStatus'] | 'all';
  aiValidation?: Evidence['aiValidation'] | 'all';
  dateFrom?: string;
  dateTo?: string;
}

export interface Decision {
  evidenceId: string;
  officerId: string;
  decision: 'approved' | 'rejected' | 'flagged';
  comment: string;
  timestamp: string;
}

