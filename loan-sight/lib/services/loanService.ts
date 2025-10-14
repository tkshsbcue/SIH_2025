import { Loan } from '../types';
import { mockLoans } from './seedData';

export const loanService = {
  async listLoansForBeneficiary(beneficiaryId: string): Promise<Loan[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockLoans.filter((loan) => loan.beneficiaryId === beneficiaryId);
  },

  async getLoan(id: string): Promise<Loan | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockLoans.find((loan) => loan.id === id) || null;
  },

  async createLoanForTesting(input: Partial<Loan>): Promise<Loan> {
    const newLoan: Loan = {
      id: `loan_${Date.now()}`,
      beneficiaryId: input.beneficiaryId || '',
      amount: input.amount || 50000,
      startDate: input.startDate || new Date().toISOString(),
      endDate: input.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      expectedUploadsEveryDays: input.expectedUploadsEveryDays || 30,
      status: input.status || 'active',
    };
    
    mockLoans.push(newLoan);
    return newLoan;
  },
};

