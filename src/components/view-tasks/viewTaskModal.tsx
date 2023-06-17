import PrimaryButton from '@components/common/buttons/primaryButton';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { CloseIcon } from '@components/common/icons/icons';
import Modal from '@components/common/modal/modal';
import React, { Dispatch, SetStateAction } from 'react';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { initialTask } from '@utils/initialData';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

interface IAddTaskModal {
  setShowAddTasks: Dispatch<SetStateAction<boolean>>;
  showAddTasks: boolean;
  callback?: () => void;
}

const ViewTaskModal = (props: IAddTaskModal) => {
  const { setShowAddTasks, showAddTasks, callback } = props;
  const { singleTaskData, setSingleTaskData } = useDataStoreContext();
  const { title, description, due_date, list_type } = singleTaskData;

  const handleCloseModal = () => {
    setShowAddTasks((prev) => !prev);
    setSingleTaskData(initialTask);
  };

  return (
    <Modal setShow={() => {}} show={showAddTasks}>
      <div className="bg-grey-10 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60 hover:cursor-pointer">Task:</h2>
          <div onClick={handleCloseModal} className="hover:cursor-pointer">
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
            <h2 className="text-body-1/b2 text-grey-90">{description}</h2>
          </div>
          <p className="text-body-1/b1 text-grey-30">
            List Type:{' '}
            <span className="text-body-1/b2 text-grey-90 pl-1">
              {list_type ? capitalizeFirstLetter(list_type) : ''}
            </span>
          </p>
          <p className="text-body-1/b1 text-grey-30">
            Due Date: <span className="text-body-1/b2 text-grey-90 pl-1">{due_date}</span>
          </p>
          <div className="flex gap-4">
            <SecondaryButton text={'Delete Task'} />
            <PrimaryButton text={'Edit Task'} type="button" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
