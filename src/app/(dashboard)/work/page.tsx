'use client';

import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { get } from '../../../config/axiosClient';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import { ISingleTask } from '@utils/types';
import SingleTask from '@components/common/ui-components/singleTask';
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import isMobileDevice from '@utils/detectUserDevice';
import { useToggleContext } from '@context/useToggleContext';
import { DELAY } from '@utils/initialData';
import { debounce } from '@utils/debounce';

const Work = () => {
  const [tasks, setTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState<boolean>(false);
  const { loading, setLoading } = useUIHelperContext();
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  });

  const filteredTasks = useMemo(() => {
    if (!searchText.length) return tasks;

    return tasks.filter((task: any) =>
      task.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [tasks, searchText]);

  const handleGetAllPersonalTasks = async () => {
    try {
      setLoading(true);

      await get(`tasks?list_type=work`).then((tasks) => {
        setTasks(tasks.data);
      });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      // Just to make loading more applealing
      setTimeout(() => {
        setLoading(false);
      }, DELAY);
    }
  };

  return (
    <TaskPageLayout
      header="Work"
      count={tasks.length}
      loading={loading}
      handleGetAllTasks={handleGetAllPersonalTasks}
      viewTasks={viewTasks}
      setViewTasks={setViewTasks}
      handleSearchChange={handleSearchChange}
    >
      <>
        {filteredTasks.length ? (
          filteredTasks.map((task: ISingleTask) => (
            <SingleTask taskData={task} key={task.title} setViewTasks={setViewTasks} />
          ))
        ) : (
          <h2 className="text-grey-40 text-body-1/b2 text-center mt-5">
            {searchText.length ? 'No tasks found' : 'No Tasks in Work Category!'}
          </h2>
        )}
      </>
    </TaskPageLayout>
  );
};

export default Work;
