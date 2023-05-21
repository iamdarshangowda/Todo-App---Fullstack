'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon, RecMicIcon } from '@components/common/icons/icons';
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

      <div className="flex gap-4">
        <SecondaryButton
          text="Add Task"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<AddIcon />}
        />
        <SecondaryButton
          text="Rec Audio"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<RecMicIcon />}
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

      {/* <div className="flex sm:hidden fixed bottom-4 gap-2 w-full ">
        <SecondaryButton
          text="Add Task"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<AddIcon />}
        />

        <SecondaryButton
          text="Rec Audio"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<RecMicIcon />}
        />
      </div> */}
    </TaskPageLayout>
  );
};

export default Today;
