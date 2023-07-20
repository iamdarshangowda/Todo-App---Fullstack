'use client';

import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import { useToggleContext } from '@context/useToggleContext';
import React from 'react';

const StickyLayout = ({ children }: any) => {
  const { hideMenu } = useToggleContext();
  return (
    <div
      className={`w-full space-y-6 sm:space-y-10 overflow-y-scroll scrollbar-hide ${
        hideMenu ? '' : 'pl-4'
      }`}
    >
      <TaskHeaderwithCount title={'Sticky'} count={3} loading={false} />
      {children}
    </div>
  );
};

export default StickyLayout;
