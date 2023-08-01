'use client';

import { createContext, useEffect, useState } from 'react';
import verifyToken from '../apis/handleVerifyToken';
import LoadingSpinner from '@components/common/animations/loadingSpinner';
import { usePathname, useRouter } from 'next/navigation';

interface contextProviderProp {
  children: any;
}

export const AuthGaurdContext = createContext<any>(null);

export const AuthGaurdWrapper: React.FunctionComponent<contextProviderProp> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);

  const handleVerifyToken = async () => {
    const isTokenValid = await verifyToken();
    if (isTokenValid) {
      setAuthorized(true);
    } else {
      console.log('pusj');
      router.push('/');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn) {
      handleVerifyToken();
    } else {
      router.push('/');
    }
  }, [pathname]);

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
