import React from 'react';

const DateInput = () => {
  return (
    <div className="max-w-xs w-full flex gap-6 items-center">
      <label htmlFor="due-date" className="text-grey-60 text-body-1/b2 flex-1">
        Due Date:
      </label>
      <input
        type="date"
        id="due-date"
        name="due-date"
        className="bg-grey-10 border border-grey-20 p-2 rounded-lg w-1/2
        text-body-1/b1 text-grey-40"
      />
    </div>
  );
};

export default DateInput;
