'use client';

import ErrorToast from '@components/common/toasts/errorToast';
import SuccessToast from '@components/common/toasts/successToast';
import MenuSidebar from '@components/menu/menuSidebar';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { useUserDataContext } from '@context/useUserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { get } from '../../config/axiosClient';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { blurBackground } = useUIHelperContext();
  const { showSuccessToast, showErrorToast } = useToggleContext();
  const { userAuthData, setUserAuthData } = useUserDataContext();

  const getUserProfile = async () => {
    await get('user/profile').then(
      (data) => {
        if (data.data.user) {
          setUserAuthData(data.data.user);
        } else {
          router.push('/');
        }
      },
      (err: any) => {
        router.push('/');
        console.log(err.message);
      }
    );
  };

  useEffect(() => {
    if (!userAuthData._id) {
      getUserProfile();
    }
  }, []);

  return (
    <div
      className={`fixed top-0 bottom-0 gap-2 flex p-4 w-full ${
        blurBackground ? 'blur-sm' : 'blur-none'
      } duration-300`}
    >
      <MenuSidebar />
      {showSuccessToast.show && <SuccessToast />}
      {showErrorToast.show && <ErrorToast />}
      {children}
    </div>
  );
};

export default DashboardLayout;
