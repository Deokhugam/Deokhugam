'use client';

import { useEffect, useState } from 'react';
import { useAuthGuard } from '@/hooks/auth/useAuthRedirect';
import LoadingScreen from '@/components/common/LoadingScreen';

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const [id, setId] = useState<string>('');
  const { shouldShowContent } = useAuthGuard();

  useEffect(() => {
    // params에서 id 추출
    params.then(({ id: bookId }) => {
      setId(bookId);
    });
  }, [params]);

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }
  
  return (
    <div>
      <h1>도서 상세 페이지</h1>
      <p>도서 ID: {id}</p>
    </div>
  );
}
