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
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import { ISingleTask } from '@utils/types';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { initialTask } from '@utils/initialData';

const Today = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const [viewTasks, setViewTasks] = useState<boolean>(false);
  const { setBlurBackground, loading, setLoading } = useUIHelperContext();
  const { setSingleTaskData } = useDataStoreContext();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (showAddTasks || viewTasks) {
      setBlurBackground(true);
    } else {
      setBlurBackground(false);
    }

    if (!showAddTasks && !viewTasks) setSingleTaskData(initialTask);
  }, [showAddTasks, viewTasks]);

  const handleAddTask = () => {
    setSingleTaskData(initialTask);
    setShowAddTasks((prev) => !prev);
  };

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
      <TaskHeaderwithCount title={'Today'} count={tasks.length} loading={loading} />

      <div className="flex gap-4">
        <SecondaryButton text="Add Task" onClick={handleAddTask} icon={<AddIcon />} />
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

      <ViewTaskModal
        viewTasks={viewTasks}
        setViewTasks={setViewTasks}
        setShowAddTasks={setShowAddTasks}
        callback={handleGetAllTasks}
      />

      <div className="flex flex-col space-y-2 overflow-y-scroll h-[calc(95vh-200px)] last:pb-5 scrollbar-hide">
        {loading ? (
          Array(4)
            .fill('')
            .map((data, index) => <SingleTaskSkeleton key={index} />)
        ) : (
          <>
            {tasks.length ? (
              tasks.map((task: ISingleTask) => (
                <SingleTask
                  taskData={task}
                  key={task.title}
                  setViewTasks={setViewTasks}
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
    </TaskPageLayout>
  );
};

export default Today;
