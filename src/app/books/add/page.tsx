'use client';

import { useAuthGuard } from '@/hooks/auth/useAuthRedirect';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function AddBookPage() {
  const { shouldShowContent } = useAuthGuard();

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1>도서 등록 페이지</h1>
    </div>
  );
}
