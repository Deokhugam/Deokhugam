import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import type { User } from '@/types/auth';

export const useAuthRedirect = (redirectPath: string = '/auth/login'): {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
} => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 로딩이 완료되고 로그인되지 않은 경우 리다이렉트
    if (!isLoading && !user?.id) {
      router.push(redirectPath);
    }
  }, [user?.id, isLoading, router, redirectPath]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user?.id,
  };
};

export const useAuthGuard = (redirectPath: string = '/auth/login'): {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  shouldShowContent: boolean;
} => {
  const { user, isLoading, isAuthenticated } = useAuthRedirect(redirectPath);

  return {
    user,
    isLoading,
    isAuthenticated,
    shouldShowContent: !isLoading && isAuthenticated,
  };
};