'use client';

import ErrorToast from '@components/common/toasts/errorToast';
import SuccessToast from '@components/common/toasts/successToast';
import MenuSidebar from '@components/menu/menuSidebar';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { blurBackground } = useUIHelperContext();
  const { showSuccessToast, showErrorToast } = useToggleContext();
  return (
    <div
      className={`bg-inherit fixed top-0 bottom-0 gap-2 flex p-4 w-full ${
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
