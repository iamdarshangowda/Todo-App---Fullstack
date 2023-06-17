import PrimaryButton from '@components/common/buttons/primaryButton';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { CloseIcon } from '@components/common/icons/icons';
import DateTimeInput from '@components/common/inputs/dateTimeInput';
import SelectInput from '@components/common/inputs/selectInput';
import TasksInput from '@components/common/inputs/tasksInput';
import TextAreaInput from '@components/common/inputs/textAreaInput';
import Modal from '@components/common/modal/modal';
import { ISingleTask } from '@utils/types';
import React, {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { post } from '../../config/axiosClient';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { initialTask } from '@utils/initialData';

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

interface IAddTaskModal {
  setShowAddTasks: Dispatch<SetStateAction<boolean>>;
  showAddTasks: boolean;
  callback?: () => void;
}

const AddTaskModal = (props: IAddTaskModal) => {
  const { setShowAddTasks, showAddTasks, callback } = props;
  const [task, setTask] = useState<ISingleTask>(initialTask);
  const { loading, setLoading } = useUIHelperContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await post('task', task).then((data) => {
        console.log(data);
        setShowAddTasks((prev) => !prev);
        callback && callback();
      });
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal setShow={() => {}} show={showAddTasks}>
      <div className="bg-grey-10 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60 hover:cursor-pointer">Task:</h2>
          <div
            onClick={() => setShowAddTasks((prev) => !prev)}
            className="hover:cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
        <form onSubmit={handleSubmitTask}>
          <div className="flex flex-col space-y-4 mt-6">
            <TasksInput
              type={'text'}
              placeholder={'Add title'}
              name={'title'}
              onChange={handleInputChange}
            />
            <TextAreaInput
              placeholder={'Add description'}
              name={'description'}
              onChange={handleInputChange}
            />
            <SelectInput optionsList={LIST_OPTIONS} onChange={handleInputChange} />
            <DateTimeInput onChange={handleInputChange} />

            <div className="flex gap-4">
              <SecondaryButton text={'Delete Task'} />
              <PrimaryButton text={'Save Changes'} type="submit" disable={loading} />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
