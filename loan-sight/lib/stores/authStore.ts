import { create } from 'zustand';
import { UserSession } from '../types';
import { authService } from '../services/authService';

interface AuthState {
  session: UserSession | null;
  isLoading: boolean;
  error: string | null;
  
  setSession: (session: UserSession | null) => void;
  loadSession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoading: false,
  error: null,

  setSession: (session) => set({ session, error: null }),

  loadSession: async () => {
    set({ isLoading: true });
    try {
      const session = await authService.getSession();
      set({ session, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load session', isLoading: false });
    }
  },

  logout: async () => {
    await authService.logout();
    set({ session: null, error: null });
  },
}));

