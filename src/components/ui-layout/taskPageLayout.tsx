import AddTaskModal from '@components/add-tasks/addTasksModal';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon, RecMicIcon } from '@components/common/icons/icons';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import SearchBar from '@components/menu/searchBar';
import ViewTaskModal from '@components/view-tasks/viewTaskModal';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { initialTask } from '@utils/initialData';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const {
    header,
    count,
    loading,
    handleGetAllTasks,
    viewTasks,
    setViewTasks,
    handleSearchChange,
  } = props;
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

  const handleVoiceNote = () => {
    router.push('/voice-notes');
  };

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return (
    <div className={`w-full space-y-6 sm:space-y-10`}>
      <TaskHeaderwithCount
        title={header}
        count={count}
        loading={loading}
        handleSearchChange={handleSearchChange}
      />

      <div className="flex gap-2 sm:gap-4 w-full justify-between sm:justify-start">
        <SecondaryButton text="Add Task" onClick={handleAddTask} icon={<AddIcon />} />
        <SecondaryButton
          text="Voice Note"
          onClick={handleVoiceNote}
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

      <div className="sm:hidden">
        <SearchBar onChange={handleSearchChange} />
      </div>

      <div className="flex flex-col space-y-2 overflow-y-scroll h-[calc(95vh-200px)] last:pb-5 scrollbar-hide">
        {loading ? (
          Array(3)
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
