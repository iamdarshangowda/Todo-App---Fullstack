'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon, RecMicIcon } from '@components/common/icons/icons';
import SingleTask from '@components/common/ui-components/singleTask';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useEffect, useState } from 'react';
import { get } from '../../../config/axiosClient';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';

const Today = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const { setBlurBackground, loading, setLoading } = useUIHelperContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setBlurBackground(showAddTasks);
  }, [showAddTasks]);

  const handleGetAllTasks = async () => {
    try {
      setLoading(true);

      await get('tasks').then((tasks) => {
        setTasks(tasks.data);
      });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
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

      <div className="flex flex-col space-y-2 overflow-y-scroll h-[calc(90vh-200px)] last:pb-5">
        {loading ? (
          Array(4)
            .fill('')
            .map((data) => <SingleTaskSkeleton />)
        ) : (
          <>
            {tasks.length ? (
              tasks.map(({ title, due_date, list_type }) => (
                <SingleTask
                  title={title}
                  dueDateTime={due_date}
                  listType={list_type}
                  key={title}
                />
              ))
            ) : (
              <h2 className="text-grey-40 text-body-1/b2 text-center mt-5">
                No Tasks Added!
              </h2>
            )}
          </>
        )}
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
