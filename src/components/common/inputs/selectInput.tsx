import React from 'react';

interface ISelectMenu {
  label: string;
  value: string;
}

interface ISelectProps {
  optionsList: ISelectMenu[];
}

const SelectInput = (props: ISelectProps) => {
  const { optionsList } = props;
  return (
    <div className="max-w-xs w-full flex gap-6 items-center">
      <label htmlFor="list" className="text-grey-60 text-body-1/b2 flex-1">
        List:
      </label>
      <select
        name="list"
        id="list"
        className="p-3 sm:p-2 w-1/2 bg-grey-10 border border-grey-20 rounded-lg
        text-body-1/b1 text-grey-40 hover:cursor-pointer"
      >
        {optionsList.map(({ label, value }) => (
          <option value={value} className="text-grey-60 text-body-1/b2 p-2" key={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
