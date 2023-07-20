import dateTimeFormat from '@utils/dateTimeFormat';
import React from 'react';

interface IDateTimeInputProps {
  onChange: any;
  // todo  - update type for on change
  value: Date;
}

const DateTimeInput = (props: IDateTimeInputProps) => {
  const { onChange, value } = props;
  const TODAY = dateTimeFormat();
  const DATE = dateTimeFormat(value);

  return (
    <div className="max-w-lg w-full flex gap-6 items-center">
      <label htmlFor="due-date" className="text-body-1/b2">
        Due Date:
      </label>
      <input
        value={value ? DATE : TODAY}
        min={TODAY}
        type="datetime-local"
        id="due_date"
        name="due_date"
        className="bg-grey-10 border border-grey-20 p-2 rounded-lg w-[70%]
        text-body-1/b1 text-grey-40 ml-auto"
        onChange={onChange}
      />
    </div>
  );
};

export default DateTimeInput;
