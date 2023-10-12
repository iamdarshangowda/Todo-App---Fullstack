'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import verifyToken from '../apis/handleVerifyToken';
import LoadingSpinner from '@components/common/animations/loadingSpinner';
import { usePathname, useRouter } from 'next/navigation';
import RippleLoader from '@components/common/animations/rippleLoader';
import { useToggleContext } from './useToggleContext';

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
  const { setCurrentTab } = useToggleContext();

  const handleVerifyToken = async () => {
    const isTokenValid = await verifyToken();
    if (isTokenValid) {
      setAuthorized(true);
    } else {
      setCurrentTab(1);
      router.push('/auth');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn) {
      handleVerifyToken();
    } else {
      setCurrentTab(0);
      router.push('/auth');
    }
  }, [pathname]);

  return (
    <>
      {authorized ? (
        <AuthGaurdContext.Provider value={{ authorized, setAuthorized }}>
          {children}
        </AuthGaurdContext.Provider>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <RippleLoader />
        </div>
      )}
    </>
  );
};

export const useAuthGaurdContext = () => {
  return useContext(AuthGaurdContext);
};
