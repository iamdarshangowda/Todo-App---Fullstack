'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon } from '@components/common/icons/icons';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useEffect, useState } from 'react';

const Today = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const { setBlurBackground } = useUIHelperContext();

  useEffect(() => {
    setBlurBackground(showAddTasks);
  }, [showAddTasks]);

  return (
    <TaskPageLayout>
      <TaskHeaderwithCount title={'Today'} count={5} loading={false} />

      <div>
        <SecondaryButton
          text="Add Tasks"
          onClick={() => {
            setShowAddTasks((prev) => !prev);
          }}
          icon={<AddIcon />}
        />
      </div>

      <AddTaskModal showAddTasks={showAddTasks} setShowAddTasks={setShowAddTasks} />
    </TaskPageLayout>
  );
};

export default Today;
