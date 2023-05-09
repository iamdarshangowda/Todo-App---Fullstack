'use client';

import MenuSidebar from '@components/menu/menuSidebar';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { blurBackground } = useUIHelperContext();
  return (
    <div
      className={`fixed top-0 bottom-0 gap-2 flex p-4 w-full ${
        blurBackground ? 'blur-sm' : 'blur-none'
      } duration-300`}
    >
      <MenuSidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
