import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon, RecMicIcon } from '@components/common/icons/icons';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import SearchBar from '@components/menu/searchBar';
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useToggleContext } from '@context/useToggleContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import isMobileDevice from '@utils/detectUserDevice';
import { initialTask } from '@utils/initialData';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

interface ITaskLayoutProps {
  header: string;
  count: number;
  loading: boolean;
  handleGetAllTasks: () => void;
  viewTasks: boolean;
  setViewTasks: Dispatch<SetStateAction<boolean>>;
  handleSearchChange: () => void;
}

interface ITaskPageLayoutProps extends ITaskLayoutProps {
  children: ReactNode;
}

const TaskPageLayout = ({ children, ...props }: ITaskPageLayoutProps) => {
  const {
    header,
    count,
    loading,
    handleGetAllTasks,
    viewTasks,
    setViewTasks,
    handleSearchChange,
  } = props;
  const { hideMenu, setHideMenu } = useToggleContext();
  const [showAddTasks, setShowAddTasks] = useState<boolean>(false);
  const { setBlurBackground } = useUIHelperContext();
  const { setSingleTaskData } = useDataStoreContext();

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

  useEffect(() => {
    handleGetAllTasks();
    if (isMobileDevice()) {
      setHideMenu(true);
    }
  }, []);

  return (
    <div className={`w-full space-y-6 sm:space-y-10 ${hideMenu ? '' : 'pl-4'}`}>
      <TaskHeaderwithCount title={header} count={count} loading={loading} />

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
          <>{children}</>
        )}
      </div>
    </div>
  );
};

export default TaskPageLayout;
