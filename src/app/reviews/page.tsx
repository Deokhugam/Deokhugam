'use client';

import { useAuthGuard } from '@/hooks/auth/useAuthRedirect';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function ReviewsPage() {
  const { shouldShowContent } = useAuthGuard();

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1>리뷰 목록 페이지</h1>
    </div>
  );
}
