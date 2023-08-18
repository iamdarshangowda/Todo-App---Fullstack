'use client';

import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { ISingleTask } from '@utils/types';
import SingleTask from '@components/common/ui-components/singleTask';
import { debounce } from '@utils/debounce';
import { useParams } from 'next/navigation';
import { get } from '../../../../config/axiosClient';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

const List = () => {
  const [tasks, setTasks] = useState([]);
  const { list } = useParams();
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

      await get(`tasks?list_type=${list}`).then((tasks) => {
        setTasks(tasks.data);
      });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskPageLayout
      header={capitalizeFirstLetter(list as string)}
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
            {searchText.length
              ? 'No tasks found'
              : `No Tasks in ${capitalizeFirstLetter(list as string)} Category!`}
          </h2>
        )}
      </>
    </TaskPageLayout>
  );
};

export default List;
