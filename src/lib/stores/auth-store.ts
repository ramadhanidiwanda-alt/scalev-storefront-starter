import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api/client';
import type { AuthTokens, Customer, LoginPayload, RegisterPayload } from '@/lib/api/types';

interface AuthStore {
  tokens: AuthTokens | null;
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  fetchCustomer: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      tokens: null,
      customer: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.login(payload);
          const tokens = response.data;
          
          // Save tokens to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('scalev_auth_tokens', JSON.stringify(tokens));
          }
          
          set({ 
            tokens, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Fetch customer data
          await get().fetchCustomer();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },

      register: async (payload: RegisterPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.register(payload);
          const tokens = response.data;
          
          // Save tokens to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('scalev_auth_tokens', JSON.stringify(tokens));
          }
          
          set({ 
            tokens, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Fetch customer data
          await get().fetchCustomer();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await apiClient.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear tokens from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('scalev_auth_tokens');
          }
          
          set({ 
            tokens: null,
            customer: null,
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      fetchCustomer: async () => {
        if (!get().isAuthenticated) return;
        
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.getCustomer();
          set({ customer: response.data, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch customer',
            isLoading: false 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'scalev-auth-storage',
      partialize: (state) => ({ 
        tokens: state.tokens,
        customer: state.customer,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
