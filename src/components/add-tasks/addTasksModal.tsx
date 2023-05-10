import PrimaryButton from '@components/common/buttons/primaryButton';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { CloseIcon } from '@components/common/icons/icons';
import DateTimeInput from '@components/common/inputs/dateTimeInput';
import SelectInput from '@components/common/inputs/selectInput';
import TasksInput from '@components/common/inputs/tasksInput';
import TextAreaInput from '@components/common/inputs/textAreaInput';
import Modal from '@components/common/modal/modal';
import React, { Dispatch, SetStateAction } from 'react';

const LIST_OPTIONS = [
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Work',
    value: 'work',
  },
];

interface Props {
  setShowAddTasks: Dispatch<SetStateAction<boolean>>;
  showAddTasks: boolean;
}

const AddTaskModal = (props: Props) => {
  const { setShowAddTasks, showAddTasks } = props;
  return (
    <Modal setShow={() => {}} show={showAddTasks}>
      <div className="bg-grey-10 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60 hover:cursor-pointer">Tasks:</h2>
          <div
            onClick={() => setShowAddTasks((prev) => !prev)}
            className="hover:cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-4 mt-6">
            <TasksInput
              type={'text'}
              placeholder={'Add title'}
              name={'title'}
              onChange={() => {}}
            />
            <TextAreaInput
              placeholder={'Add description'}
              name={'description'}
              onChange={() => {}}
            />
            <SelectInput optionsList={LIST_OPTIONS} />
            <DateTimeInput />

            <div className="flex gap-4">
              <SecondaryButton text={'Delete Task'} />
              <PrimaryButton text={'Save Changes'} type="submit" />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
