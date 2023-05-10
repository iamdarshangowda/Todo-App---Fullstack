import React, { ReactNode } from 'react';

const TaskPageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-2 w-full space-y-10 ">{children}</div>;
};

export default TaskPageLayout;
