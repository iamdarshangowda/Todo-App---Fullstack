import React from 'react';
import { InputAttributes } from '../../../utils/types';

interface IInputProps {
  name: InputAttributes['name'];
  type: InputAttributes['type'];
  value?: InputAttributes['value'];
  onBlur?: InputAttributes['onBlur'];
  onChange: InputAttributes['onChange'];
  placeholder: InputAttributes['placeholder'];

  disabled?: boolean;
  error?: string;
}

// What is InputAttributes and why it is used?

const TasksInput = (props: IInputProps) => {
  const { type, placeholder, name, onChange, disabled, error, onBlur, value } = props;

  return (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full p-2 text-grey-80 border border-grey-20 rounded-lg text-body-1/b2 placeholder:text-grey-20
      placeholder:text-body-1/b2 disabled:text-grey-20 bg-grey-10"
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        value={value}
        autoComplete="off"
      />
      {error && <p className="text-error text-caption/c2 mt-1">{error}</p>}
    </div>
  );
};

export default TasksInput;
