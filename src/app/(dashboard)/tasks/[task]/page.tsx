'use client';

import SingleTask from '@components/common/ui-components/singleTask';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { ISingleTask } from '@utils/types';
import { debounce } from '@utils/debounce';
import { useToggleContext } from '@context/useToggleContext';
import { get } from '../../../../config/axiosClient';
import { useParams } from 'next/navigation';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';

const Task = () => {
  const [viewTasks, setViewTasks] = useState<boolean>(false);
  const { loading, setLoading } = useUIHelperContext();
  const { task } = useParams();
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState<string>('');
  const { setShowErrorToast } = useToggleContext();

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

  const handleGetAllTasks = async () => {
    try {
      setLoading(true);
      await get(`tasks?date=${task}`).then((tasks) => {
        setTasks(tasks.data);
      });
    } catch (err: any) {
      console.log(err.message);
      setShowErrorToast({ show: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskPageLayout
      header={capitalizeFirstLetter(task as string)}
      count={tasks.length}
      loading={loading}
      handleGetAllTasks={handleGetAllTasks}
      viewTasks={viewTasks}
      setViewTasks={setViewTasks}
      handleSearchChange={handleSearchChange}
    >
      <>
        {loading && <SingleTaskSkeleton />}
        {filteredTasks.length ? (
          filteredTasks.map((task: ISingleTask) => (
            <SingleTask taskData={task} key={task.title} setViewTasks={setViewTasks} />
          ))
        ) : (
          <h2 className="text-grey-40 text-body-1/b2 text-center mt-5">
            {searchText.length
              ? 'No tasks found'
              : `No Tasks Added for ${capitalizeFirstLetter(task as string)}!`}
          </h2>
        )}
      </>
    </TaskPageLayout>
  );
};

export default Task;
