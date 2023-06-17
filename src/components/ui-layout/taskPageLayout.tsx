import { useToggleContext } from '@context/useToggleContext';
import React, { ReactNode } from 'react';

const TaskPageLayout = ({ children }: { children: ReactNode }) => {
  const { hideMenu } = useToggleContext();
  return (
    <div className={`w-full space-y-6 sm:space-y-10 ${hideMenu ? '' : 'pl-4'}`}>
      {children}
    </div>
  );
};

export default TaskPageLayout;
