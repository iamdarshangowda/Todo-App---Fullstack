import React, { ChangeEventHandler } from 'react';
import { InputAttributes } from '../../../utils/types';

interface IInputProps {
  name: InputAttributes['name'];
  value?: InputAttributes['value'];
  onBlur?: InputAttributes['onBlur'];
  onChange: any;
  // todo  - update type for on change
  placeholder: InputAttributes['placeholder'];

  disabled?: boolean;
  error?: string;
}

// What is InputAttributes and why it is used?

const TextAreaInput = (props: IInputProps) => {
  const { placeholder, name, onChange, disabled, error, onBlur, value } = props;

  return (
    <div>
      <textarea
        rows={6}
        id={name}
        name={name}
        className="w-full p-2 text-grey-80 border border-grey-20 rounded-lg text-body-1/b2 placeholder:text-grey-20
      placeholder:text-body-1/b2 disabled:text-grey-20 bg-grey-10"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        autoComplete="off"
        onChange={onChange}
      />
      {error && <p className="text-error text-caption/c2 mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
