import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSession } from '../types';
import { DEMO_OTP, USER_SESSION_KEY } from '../utils/constants';
import { mockBeneficiaries, mockOfficers } from './seedData';

export const authService = {
  async sendOtp(phone: string): Promise<{ success: boolean; otpStub?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const beneficiary = mockBeneficiaries.find((b) => b.phone === phone);
    if (beneficiary) {
      return { success: true, otpStub: DEMO_OTP };
    }
    
    return { success: false };
  },

  async verifyOtp(
    phone: string,
    otp: string
  ): Promise<{ success: boolean; userSession?: UserSession }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (otp !== DEMO_OTP) {
      return { success: false };
    }

    const beneficiary = mockBeneficiaries.find((b) => b.phone === phone);
    if (!beneficiary) {
      return { success: false };
    }

    const session: UserSession = {
      id: `session_${Date.now()}`,
      phone,
      role: 'beneficiary',
      beneficiaryId: beneficiary.id,
    };

    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
    return { success: true, userSession: session };
  },

  async officerLogin(
    username: string,
    password: string
  ): Promise<{ success: boolean; userSession?: UserSession }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (password !== 'officer123') {
      return { success: false };
    }

    const officer = mockOfficers.find(
      (o) => o.name.toLowerCase().replace(/\s+/g, '') === username.toLowerCase()
    );

    if (!officer) {
      return { success: false };
    }

    const session: UserSession = {
      id: `session_${Date.now()}`,
      phone: '',
      role: 'officer',
      officerId: officer.id,
    };

    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
    return { success: true, userSession: session };
  },

  async getSession(): Promise<UserSession | null> {
    try {
      const sessionStr = await AsyncStorage.getItem(USER_SESSION_KEY);
      if (!sessionStr) return null;
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
  },
};

