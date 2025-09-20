'use client';

import { useAuthGuard } from '@/hooks/auth/useAuthRedirect';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function BooksPage() {
  const { shouldShowContent } = useAuthGuard();

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1>도서 목록 페이지</h1>
    </div>
  );
}
