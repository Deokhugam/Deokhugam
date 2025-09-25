import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/types/auth";

export const useAuthRedirect = (
  redirectPath: string = "/auth/login"
): {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
} => {
  const { user, isLoading, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading && !user?.id) {
      router.push(redirectPath);
    }
  }, [user?.id, isLoading, isInitialized, router, redirectPath]);

  return {
    user,
    isLoading: !isInitialized || isLoading,
    isAuthenticated: !!user?.id
  };
};

export const useAuthGuard = (
  redirectPath: string = "/auth/login"
): {
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
    shouldShowContent: !isLoading && isAuthenticated
  };
};
