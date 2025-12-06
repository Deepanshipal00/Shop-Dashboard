import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authAPI } from '@/lib/api';
import { AuthState } from '@/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const response = await authAPI.login(username, password);
          const { token, ...user } = response.data;
          
          set({
            token,
            user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
      skipHydration: true, 
    }
  )
);
