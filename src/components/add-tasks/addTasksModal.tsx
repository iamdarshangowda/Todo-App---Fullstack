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
import { deleteTask, post, put } from '../../config/axiosClient';
import { useUIHelperContext } from '@context/useUIHelperContext';
import { initialTask } from '@utils/initialData';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';

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
  const { singleTaskData, setSingleTaskData, setTasksCount, userLists } =
    useDataStoreContext();
  const { setShowSuccessToast, setShowErrorToast } = useToggleContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prev) => ({
      ...prev,
      [name]: name === 'due_date' ? new Date(value) : value,
    }));
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
          getAllCount(setTasksCount);
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
          setSingleTaskData(initialTask);
          callback && callback();
          getAllCount(setTasksCount);
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

  const handleDeleteTask = async () => {
    if (!singleTaskData?._id) {
      return;
    }

    try {
      setLoading(true);
      await deleteTask(`task?id=${singleTaskData?._id}`).then((task) => {
        handleCloseModal();
        setShowSuccessToast({ show: true, message: task.data.message });
        callback && callback();
        getAllCount(setTasksCount);
      });
    } catch (err: any) {
      setShowErrorToast({ show: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddTasks((prev) => !prev);
    setSingleTaskData(initialTask);
    setTask(initialTask);
  };

  useEffect(() => {
    if (showAddTasks && singleTaskData.title.length) {
      setTask(singleTaskData);
    }
  }, [singleTaskData, showAddTasks]);

  return (
    <Modal setShow={() => {}} show={showAddTasks}>
      <div className="bg-cream_light p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 hover:cursor-pointer">Task:</h2>
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
              optionsList={userLists}
              onChange={handleInputChange}
              value={task.list_type ? task.list_type : 'personal'}
            />
            <DateTimeInput
              onChange={handleInputChange}
              value={new Date(task.due_date ?? '')}
            />

            <div className="flex gap-4">
              {singleTaskData.title.length > 0 && (
                <SecondaryButton
                  text={'Delete Task'}
                  disable={loading}
                  onClick={handleDeleteTask}
                />
              )}
              <PrimaryButton
                text={`${singleTaskData.title.length ? 'Update Changes' : 'Add Task'}`}
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
