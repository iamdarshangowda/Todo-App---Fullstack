import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowAddTasks: Dispatch<SetStateAction<boolean>>;
}

const Today = (props: Props) => {
  const { setShowAddTasks } = props;
  return (
    <div className="p-2 w-full">
      <div className="text-heading-1/h2 text-grey-80 flex gap-10 ">
        <h1>Today</h1>
        <span className="px-4 border border-grey-20 rounded-lg">5</span>
      </div>
      <button onClick={() => setShowAddTasks((prev) => !prev)}>Add Tasks</button>
    </div>
  );
};

export default Today;
