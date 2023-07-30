import PrimaryButton from '@components/common/buttons/primaryButton';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { CloseIcon } from '@components/common/icons/icons';
import Modal from '@components/common/modal/modal';
import React, { Dispatch, SetStateAction } from 'react';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { initialTask } from '@utils/initialData';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { deleteTask } from '../../config/axiosClient';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';

interface IViewTaskModal {
  setShowAddTasks?: Dispatch<SetStateAction<boolean>>;
  setViewTasks: Dispatch<SetStateAction<boolean>>;
  viewTasks: boolean;
  callback: () => void;
  justView?: boolean;
}

const ViewTaskModal = (props: IViewTaskModal) => {
  const { setViewTasks, viewTasks, setShowAddTasks, callback, justView } = props;
  const { singleTaskData, setSingleTaskData, setTasksCount } = useDataStoreContext();
  const { loading, setLoading } = useUIHelperContext();
  const { setShowSuccessToast, setShowErrorToast } = useToggleContext();
  const { title, description, due_date, list_type, _id } = singleTaskData;

  const handleCloseModal = () => {
    setViewTasks((prev) => !prev);
    setSingleTaskData(initialTask);
  };

  const handleEditTask = () => {
    if (loading || justView) return;
    setViewTasks((prev) => !prev);
    setShowAddTasks && setShowAddTasks(true);
  };

  const handleDeleteTask = async () => {
    if (!_id) {
      return;
    }

    try {
      setLoading(true);
      await deleteTask(`task?id=${_id}`).then((task) => {
        setViewTasks((prev) => !prev);
        setSingleTaskData(initialTask);
        setShowSuccessToast({ show: true, message: task.data.message });
        callback();
        getAllCount(setTasksCount);
      });
    } catch (err: any) {
      setShowErrorToast({ show: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal setShow={() => {}} show={viewTasks}>
      <div className="bg-cream_light p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60 hover:cursor-pointer">Task:</h2>
          <div onClick={handleCloseModal} className="hover:cursor-pointer p-2">
            <CloseIcon />
          </div>
        </div>
        <div className="flex flex-col space-y-6 mt-6">
          <div>
            <h1 className="text-body-1/b1 text-grey-30">Title:</h1>
            <h1 className="text-body-1/b2 text-grey-90">
              {capitalizeFirstLetter(title)}
            </h1>
          </div>
          <div>
            <h1 className="text-body-1/b1 text-grey-30">Description:</h1>
            <h2 className="text-body-1/b2 text-grey-90 whitespace-pre-wrap">
              {description}
            </h2>
          </div>
          <p className="text-body-1/b1 text-grey-30">
            List Type:{' '}
            <span className="text-body-1/b2 text-grey-90 pl-1">
              {list_type ? capitalizeFirstLetter(list_type) : ''}
            </span>
          </p>
          <p className="text-body-1/b1 text-grey-30">
            Due Date:{' '}
            <span className="text-body-1/b2 text-grey-90 pl-1">
              {new Date(due_date ?? '').toLocaleString()}
            </span>
          </p>
          {!justView && (
            <div className="flex gap-4">
              <SecondaryButton
                text={'Delete Task'}
                disable={loading}
                onClick={handleDeleteTask}
              />
              <PrimaryButton
                text={'Edit Task'}
                type="button"
                onClick={handleEditTask}
                disable={loading}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
