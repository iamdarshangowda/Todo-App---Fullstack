'use client';

import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useToggleContext } from '@context/useToggleContext';
import React, { useEffect, useState } from 'react';

const StickyLayout = ({ children }: any) => {
  const { hideMenu } = useToggleContext();
  const { tasksCount } = useDataStoreContext();
  const [count, setCount] = useState(0);

  useEffect(() => {
    tasksCount.forEach((value) => {
      if (value.title.toLowerCase() === 'sticky') {
        setCount(value.count);
      }
    });
  }, [tasksCount]);

  return (
    <div className={`w-full space-y-6 sm:space-y-10 overflow-y-scroll scrollbar-hide`}>
      <TaskHeaderwithCount title={'Sticky'} count={count} loading={false} />
      {children}
    </div>
  );
};

export default StickyLayout;
