import { IMenu } from '@utils/types';
import React from 'react';

interface SingleMenuProps {
  count?: number;
}

const SingleMenu = (props: IMenu & SingleMenuProps) => {
  const { icon, label, count } = props;
  return (
    <div className="flex items-center gap-2 py-2 px-2 hover:bg-[#D8D8D8] rounded-lg hover:cursor-pointer duration-300">
      {icon}
      <h3 className="text-body-1/b2 text-grey-40 flex-grow hover:text-body-1/b1">
        {label}
      </h3>
      {count && (
        <span className="px-3 text-body-2/b1 text-grey-60 bg-[#D8D8D8] rounded-md ">
          {count}
        </span>
      )}
    </div>
  );
};

export default SingleMenu;
