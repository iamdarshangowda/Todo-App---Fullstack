'use client';
import LoadingSpinner from '@components/common/animations/loadingSpinner';
import RippleLoader from '@components/common/animations/rippleLoader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/tasks/today');
  }, [router]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <RippleLoader />
    </div>
  );
}
