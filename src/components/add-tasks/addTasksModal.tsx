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
  useEffect,
  useState,
} from 'react';
import { post, put } from '../../config/axiosClient';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { initialTask } from '@utils/initialData';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useToggleContext } from '@context/useToggleContext';

const LIST_OPTIONS = [
  {
    label: 'Personal',
    list_value: 'personal',
  },
  {
    label: 'Work',
    list_value: 'work',
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
  const { singleTaskData, setSingleTaskData } = useDataStoreContext();
  const { setShowSuccessToast, setShowErrorToast } = useToggleContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (singleTaskData.title.length) {
      // Update Task
      try {
        setLoading(true);
        await put(`task?id=${singleTaskData._id}`, task).then((data) => {
          setShowAddTasks((prev) => !prev);
          callback && callback();
          setSingleTaskData(initialTask);
          setShowSuccessToast({ show: true, message: data.data.message });
        });
      } catch (error: any) {
        console.log(error.response.data.message);
        setShowErrorToast({ show: true, message: error.response.data.message });
      } finally {
        setLoading(false);
      }
    } else {
      // Add new Task
      try {
        setLoading(true);
        await post('task', task).then((data) => {
          setShowAddTasks((prev) => !prev);
          callback && callback();
          setSingleTaskData(initialTask);
          setShowSuccessToast({ show: true, message: data.data.message });
        });
      } catch (error: any) {
        console.log(error.response.data.message);
        setShowErrorToast({ show: true, message: error.response.data.message });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddTasks((prev) => !prev);
    setSingleTaskData(initialTask);
    setTask(initialTask);
  };

  useEffect(() => {
    if (singleTaskData.title.length) {
      setTask(singleTaskData);
    }
  }, [singleTaskData]);

  return (
    <Modal setShow={() => {}} show={showAddTasks}>
      <div className="bg-grey-10 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60 hover:cursor-pointer">Task:</h2>
          <div onClick={handleCloseModal} className="hover:cursor-pointer p-2">
            <CloseIcon />
          </div>
        </div>
        <form onSubmit={handleSubmitTask}>
          <div className="flex flex-col space-y-4 mt-6">
            <TasksInput
              value={task.title}
              type={'text'}
              placeholder={'Add title'}
              name={'title'}
              onChange={handleInputChange}
            />
            <TextAreaInput
              value={task.description}
              placeholder={'Add description'}
              name={'description'}
              onChange={handleInputChange}
            />
            <SelectInput
              optionsList={LIST_OPTIONS}
              onChange={handleInputChange}
              value={task.list_type ? task.list_type : 'personal'}
            />
            <DateTimeInput
              onChange={handleInputChange}
              value={task.due_date ? task.due_date : Date.now().toString()}
            />

            <div className="flex gap-4">
              <SecondaryButton text={'Delete Task'} />
              <PrimaryButton
                text={`${
                  singleTaskData.title.length ? 'Update Changes' : 'Save Changes'
                }`}
                type="submit"
                disable={loading}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
