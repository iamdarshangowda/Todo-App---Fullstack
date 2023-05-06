import { CloseIcon } from '@components/common/icons/icons';
import SelectInput from '@components/common/inputs/selectInput';
import TasksInput from '@components/common/inputs/tasksInput';
import TextAreaInput from '@components/common/inputs/textAreaInput';
import TextInput from '@components/common/inputs/textInput';
import React from 'react';

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

const AddTasks = () => {
  return (
    <div className="w-1/2 min-w-[250px] bg-grey-10 p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-2/h1 text-grey-60">Tasks:</h2>
        <CloseIcon />
      </div>
      <form>
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
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
