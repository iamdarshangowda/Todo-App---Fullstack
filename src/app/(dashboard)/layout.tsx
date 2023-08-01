'use client';

import ErrorToast from '@components/common/toasts/errorToast';
import SuccessToast from '@components/common/toasts/successToast';
import MenuSidebar from '@components/menu/menuSidebar';
import { AuthGaurdWrapper } from '@context/RouteGaurd';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { blurBackground } = useUIHelperContext();
  const { showSuccessToast, showErrorToast } = useToggleContext();
  return (
    <div
      className={`bg-inherit h-screen w-full ${blurBackground ? 'blur-sm' : 'blur-none'}`}
    >
      <AuthGaurdWrapper>
        <MenuSidebar />
        {showSuccessToast.show && <SuccessToast />}
        {showErrorToast.show && <ErrorToast />}
        <div className="sm:ml-64 md:ml-80 p-3 sm:p-6">{children}</div>
      </AuthGaurdWrapper>
    </div>
  );
};

export default DashboardLayout;
