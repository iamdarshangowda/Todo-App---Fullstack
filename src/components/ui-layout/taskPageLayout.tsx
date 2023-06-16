import React, { ReactNode } from 'react';

const TaskPageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full space-y-6 sm:space-y-10 ">{children}</div>;
};

export default TaskPageLayout;
