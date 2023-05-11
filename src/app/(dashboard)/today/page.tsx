'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon } from '@components/common/icons/icons';
import SingleTask from '@components/common/ui-components/singleTask';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { TaskLists } from '@utils/types';
import React, { useEffect, useState } from 'react';

const TASKS: TaskLists = [
  {
    title: 'Research content ideas',
    dueDateTime: '12-05-2023',
    listType: 'Personal',
  },
  {
    title: 'Create a database of a guest author',
    // dueDateTime: '01-05-2023',
    listType: 'Work',
  },
  {
    title:
      'Checkboxes are used to let a user select one or more options of a limited number of choices',
    // dueDateTime: '24-10-2023',
    // listType: 'Personal',
  },
];

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
          text="Add Task"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<AddIcon />}
        />
      </div>

      <AddTaskModal showAddTasks={showAddTasks} setShowAddTasks={setShowAddTasks} />

      <div className="flex flex-col space-y-2">
        {TASKS.map(({ title, dueDateTime, listType }) => (
          <SingleTask
            title={title}
            dueDateTime={dueDateTime}
            listType={listType}
            key={title}
          />
        ))}
      </div>
    </TaskPageLayout>
  );
};

export default Today;
