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
import { get } from '../../../config/axiosClient';

const Today = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const { setBlurBackground } = useUIHelperContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setBlurBackground(showAddTasks);
  }, [showAddTasks]);

  const handleGetAllTasks = () => {
    get('tasks').then((tasks) => {
      console.log(tasks.data);
      setTasks(tasks.data);
    });
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

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

      <AddTaskModal
        showAddTasks={showAddTasks}
        setShowAddTasks={setShowAddTasks}
        callback={handleGetAllTasks}
      />

      <div className="flex flex-col space-y-2">
        {tasks.map(({ title, due_date, list_type }) => (
          <SingleTask
            title={title}
            dueDateTime={due_date}
            listType={list_type}
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
