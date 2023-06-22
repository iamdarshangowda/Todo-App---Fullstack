'use client';

import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon, RecMicIcon } from '@components/common/icons/icons';
import SingleTask from '@components/common/ui-components/singleTask';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import TaskPageLayout from '@components/ui-layout/taskPageLayout';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { get } from '../../../config/axiosClient';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import { ISingleTask } from '@utils/types';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { DELAY, initialTask } from '@utils/initialData';
import isMobileDevice from '@utils/detectUserDevice';
import { useToggleContext } from '@context/useToggleContext';
import SearchBar from '@components/menu/searchBar';
import { debounce } from '@utils/debounce';

const Upcoming = () => {
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const [viewTasks, setViewTasks] = useState<boolean>(false);
  const { setBlurBackground, loading, setLoading } = useUIHelperContext();
  const { setSingleTaskData } = useDataStoreContext();
  const { setHideMenu } = useToggleContext();
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState<string>('');

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

      await get(`tasks?date=upcoming`).then((tasks) => {
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

  useEffect(() => {
    handleGetAllTasks();
    if (isMobileDevice()) {
      setHideMenu(true);
    }
  }, []);

  return (
    <TaskPageLayout>
      <TaskHeaderwithCount title={'Upcoming'} count={tasks.length} loading={loading} />

      <div className="flex gap-2 sm:gap-4 w-full justify-between sm:justify-start">
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

      {isMobileDevice() && <SearchBar onChange={handleSearchChange} />}

      <div className="flex flex-col space-y-2 overflow-y-scroll h-[calc(95vh-200px)] last:pb-5 scrollbar-hide">
        {loading ? (
          Array(4)
            .fill('')
            .map((data, index) => <SingleTaskSkeleton key={index} />)
        ) : (
          <>
            {filteredTasks.length ? (
              filteredTasks.map((task: ISingleTask) => (
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

export default Upcoming;
