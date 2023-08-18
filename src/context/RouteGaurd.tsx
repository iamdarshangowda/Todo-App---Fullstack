'use client';

import { createContext, useEffect, useState } from 'react';
import verifyToken from '../apis/handleVerifyToken';
import LoadingSpinner from '@components/common/animations/loadingSpinner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface contextProviderProp {
  children: any;
}

export const AuthGaurdContext = createContext<any>(null);

export const AuthGaurdWrapper: React.FunctionComponent<contextProviderProp> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [authorized, setAuthorized] = useState<boolean>(false);

  const handleVerifyToken = async () => {
    const isTokenValid = await verifyToken();
    if (isTokenValid) {
      console.log('valid');
      setAuthorized(true);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('todoAuthToken', JSON.stringify(token));
    }
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn || token) {
      handleVerifyToken();
    }
  }, [pathname, token]);

  return (
    <>
      {authorized ? (
        children
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
