import SecondaryButton from '@components/common/buttons/secondaryButton';
import { AddIcon } from '@components/common/icons/icons';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  setShowAddTasks: Dispatch<SetStateAction<boolean>>;
}

const Today = (props: Props) => {
  const { setShowAddTasks } = props;
  return (
    <div className="p-2 w-full space-y-10">
      <div className="text-heading-1/h2 text-grey-80 flex gap-10 ">
        <h1>Today</h1>
        <span className="px-4 border border-grey-20 rounded-lg">5</span>
      </div>

      <div>
        <SecondaryButton
          text="Add Tasks"
          onClick={() => setShowAddTasks((prev) => !prev)}
          icon={<AddIcon />}
        />
      </div>
    </div>
  );
};

export default Today;
