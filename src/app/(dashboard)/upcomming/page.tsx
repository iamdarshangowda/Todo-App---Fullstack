'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon } from '@components/common/icons/icons';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useState } from 'react';

function Upcomming() {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const { setBlurBackground, blurBackground } = useUIHelperContext();
  return (
    <TaskPageLayout>
      <TaskHeaderwithCount title={'Upcomming'} count={3} loading={false} />

      <div>
        <SecondaryButton
          text="Add Tasks"
          onClick={() => {
            setBlurBackground(!blurBackground);
            setShowAddTasks((prev) => !prev);
          }}
          icon={<AddIcon />}
        />
      </div>

      <AddTaskModal showAddTasks={showAddTasks} setShowAddTasks={setShowAddTasks} />
    </TaskPageLayout>
  );
}

export default Upcomming;
