import dateTimeFormat from '@utils/dateTimeFormat';
import React from 'react';

interface IDateTimeInputProps {
  onChange: any;
  // todo  - update type for on change
}

const DateTimeInput = (props: IDateTimeInputProps) => {
  const { onChange } = props;
  const TODAY = dateTimeFormat();

  return (
    <div className="max-w-xs w-full flex gap-6 items-center">
      <label htmlFor="due-date" className="text-grey-60 text-body-1/b2 flex-1">
        Due Date:
      </label>
      <input
        defaultValue={TODAY}
        min={TODAY}
        type="datetime-local"
        id="due_date"
        name="due_date"
        className="bg-grey-10 border border-grey-20 p-2 rounded-lg w-1/2
        text-body-1/b1 text-grey-40"
        onChange={onChange}
      />
    </div>
  );
};

export default DateTimeInput;
