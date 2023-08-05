'use client';

import { createContext, useEffect, useState } from 'react';
import verifyToken from '../apis/handleVerifyToken';
import LoadingSpinner from '@components/common/animations/loadingSpinner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

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
      console.log('valid');
      setAuthorized(true);
    } else {
      router.push('/');
    }
  };

  const handleVerifyOAuth = async () => {
    try {
      const response = await axios.get(`${process.env.TODO_BACKED_PORT}/auth/getUser`, {
        withCredentials: true,
      });

      if (response.data) {
        console.log(response.data);
        setAuthorized(true);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      router.push('/');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn) {
      handleVerifyToken();
    } else {
      handleVerifyOAuth();
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
