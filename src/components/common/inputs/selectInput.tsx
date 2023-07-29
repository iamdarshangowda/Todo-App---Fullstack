import { IListType } from '@utils/types';
import React, { ChangeEventHandler } from 'react';

interface ISelectMenu {
  label: string;
  list_value: string;
}

interface ISelectProps {
  optionsList: IListType;
  onChange: any;
  value: string;
  // todo  - update type for on change
}

const SelectInput = (props: ISelectProps) => {
  const { optionsList, onChange, value } = props;
  return (
    <div className="max-w-lg w-full flex gap-6 items-center">
      <label htmlFor="list_type" className="text-body-1/b2">
        List:
      </label>
      <select
        name="list_type"
        id="list_type"
        className="p-3 sm:p-2 w-[70%] bg-grey-10 border border-grey-20 rounded-lg
        text-body-1/b1 text-grey-40 hover:cursor-pointer ml-auto"
        onChange={onChange}
        value={value}
      >
        {optionsList.map(({ label }) => (
          <option
            value={label.toLocaleLowerCase()}
            className="text-grey-60 text-body-1/b2 p-2"
            key={label.toLocaleLowerCase()}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
