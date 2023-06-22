'use client';

import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { useEffect, useState } from 'react';
import { get } from '../../../config/axiosClient';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import { ISingleTask } from '@utils/types';
import SingleTask from '@components/common/ui-components/singleTask';
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import isMobileDevice from '@utils/detectUserDevice';
import { useToggleContext } from '@context/useToggleContext';

const Personal = () => {
  const [tasks, setTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState<boolean>(false);
  const { loading, setLoading } = useUIHelperContext();
  const { setHideMenu } = useToggleContext();

  const handleGetAllPersonalTasks = async () => {
    try {
      setLoading(true);

      await get(`tasks?list_type=personal`).then((tasks) => {
        setTasks(tasks.data);
      });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      // Just to make loading more applealing
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    handleGetAllPersonalTasks();
    if (isMobileDevice()) {
      setHideMenu(true);
    }
  }, []);

  return (
    <TaskPageLayout>
      <TaskHeaderwithCount title={'Personal'} count={tasks.length} loading={false} />

      <ViewTaskModal
        viewTasks={viewTasks}
        setViewTasks={setViewTasks}
        callback={handleGetAllPersonalTasks}
        justView={true}
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

export default Personal;