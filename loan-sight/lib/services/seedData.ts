import { Beneficiary, Loan, Evidence, Officer } from '../types';

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: 'ben_001',
    name: 'Asha Devi',
    phone: '+919876543210',
    loans: ['loan_100'],
    avatarUrl: null,
  },
  {
    id: 'ben_002',
    name: 'Rajesh Kumar',
    phone: '+919876543211',
    loans: ['loan_101'],
    avatarUrl: null,
  },
  {
    id: 'ben_003',
    name: 'Lakshmi Bai',
    phone: '+919876543212',
    loans: ['loan_102'],
    avatarUrl: null,
  },
];

export const mockLoans: Loan[] = [
  {
    id: 'loan_100',
    beneficiaryId: 'ben_001',
    amount: 50000,
    startDate: '2024-06-01T00:00:00.000Z',
    endDate: '2025-06-01T00:00:00.000Z',
    expectedUploadsEveryDays: 30,
    status: 'active',
  },
  {
    id: 'loan_101',
    beneficiaryId: 'ben_002',
    amount: 75000,
    startDate: '2024-07-01T00:00:00.000Z',
    endDate: '2025-07-01T00:00:00.000Z',
    expectedUploadsEveryDays: 30,
    status: 'active',
  },
  {
    id: 'loan_102',
    beneficiaryId: 'ben_003',
    amount: 100000,
    startDate: '2024-05-01T00:00:00.000Z',
    endDate: '2025-05-01T00:00:00.000Z',
    expectedUploadsEveryDays: 30,
    status: 'active',
  },
];

export const mockEvidence: Evidence[] = [
  {
    id: 'ev_900',
    loanId: 'loan_100',
    beneficiaryId: 'ben_001',
    mediaUri: 'https://via.placeholder.com/400x300/0066FF/FFFFFF?text=Receipt+1',
    mediaType: 'image',
    timestamp: '2024-07-02T08:30:00.000Z',
    location: { lat: 19.076, lng: 72.8777 },
    deviceId: 'demo-device-1',
    notes: 'Purchased sewing machine (partial)',
    syncStatus: 'synced',
    aiValidation: 'ok',
    serverId: 'srv_ev_900',
    amountSpent: 15000,
  },
  {
    id: 'ev_901',
    loanId: 'loan_100',
    beneficiaryId: 'ben_001',
    mediaUri: 'https://via.placeholder.com/400x300/00A86B/FFFFFF?text=Receipt+2',
    mediaType: 'image',
    timestamp: '2024-08-05T10:15:00.000Z',
    location: { lat: 19.076, lng: 72.8777 },
    deviceId: 'demo-device-1',
    notes: 'Fabric materials for tailoring business',
    syncStatus: 'synced',
    aiValidation: 'ok',
    serverId: 'srv_ev_901',
    amountSpent: 8000,
  },
  {
    id: 'ev_902',
    loanId: 'loan_101',
    beneficiaryId: 'ben_002',
    mediaUri: 'https://via.placeholder.com/400x300/FFB020/FFFFFF?text=Receipt+3',
    mediaType: 'image',
    timestamp: '2024-09-10T14:20:00.000Z',
    location: { lat: 28.7041, lng: 77.1025 },
    deviceId: 'demo-device-2',
    notes: 'Tools for carpentry shop',
    syncStatus: 'synced',
    aiValidation: 'flagged',
    serverId: 'srv_ev_902',
    amountSpent: 25000,
  },
];

export const mockOfficers: Officer[] = [
  {
    id: 'off_001',
    name: 'Priya Sharma',
    role: 'state_officer',
    region: 'Maharashtra',
  },
  {
    id: 'off_002',
    name: 'Amit Patel',
    role: 'bank_officer',
    region: 'Gujarat',
  },
];

