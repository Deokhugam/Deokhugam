import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/api/auth';
import type { SignupRequest, LoginRequest, User } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, nickname: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

            login: async (email: string, password: string) => {
              set({ isLoading: true, error: null });

              try {
                const loginData: LoginRequest = { email, password };
                const response = await authApi.login(loginData);

                set({
                  user: response,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                });
              } catch (error) {
                set({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: error instanceof Error ? error.message : '로그인에 실패했습니다.',
                });
              }
            },

            signup: async (email: string, nickname: string, password: string) => {
              set({ isLoading: true, error: null });

              try {
                const signupData: SignupRequest = { email, nickname, password };
                await authApi.signup(signupData);

                set({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: null,
                });
              } catch (error) {
                set({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
                });
              }
            },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
