'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon } from '@components/common/icons/icons';
import React, { useState } from 'react';

const Today = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  return (
    <div className={`p-2 w-full space-y-10 ${showAddTasks ? 'blur-sm' : 'blur-none'}`}>
      <div className="text-heading-1/h2 text-grey-80 flex gap-10 ">
        <h1>Today</h1>
        <span className="px-4 border border-grey-20 rounded-lg">5</span>
      </div>

      <div>
        <SecondaryButton
          text="Add Tasks"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<AddIcon />}
        />
      </div>

      <AddTaskModal showAddTasks={showAddTasks} setShowAddTasks={setShowAddTasks} />
    </div>
  );
};

export default Today;
