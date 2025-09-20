'use client';

import { useEffect, useState } from 'react';
import { useAuthGuard } from '@/hooks/auth/useAuthRedirect';
import LoadingScreen from '@/components/common/LoadingScreen';

interface ReviewDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const [id, setId] = useState<string>('');
  const { shouldShowContent } = useAuthGuard();

  useEffect(() => {
    // params에서 id 추출
    params.then(({ id: reviewId }) => {
      setId(reviewId);
    });
  }, [params]);

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-gray-0 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-header1 font-bold text-gray-900 mb-8">
          상세 리뷰 페이지
        </h1>
        <p className="text-body2 text-gray-600 mb-4">
          리뷰 ID: {id}
        </p>
        <p className="text-body2 text-gray-600">
          여기에 상세 리뷰 내용이 들어갑니다.
        </p>
      </div>
    </div>
  );
}
