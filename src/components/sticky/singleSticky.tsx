import { IStickyData } from '@utils/types';
import React from 'react';

interface ISingleStickyProps {
  data: IStickyData;
  isDeleting: boolean;
}
const SingleSticky = (props: ISingleStickyProps) => {
  const { data, isDeleting } = props;

  return (
    <div
      className={`h-[150px] md:h-[260px]
     text-grey-80 p-3 overflow-auto rounded-xl`}
      style={{
        backgroundColor: isDeleting ? '#FF3B30' : data.stickyColor,
      }}
    >
      <p className="drop-shadow-xl">{data.text}</p>
    </div>
  );
};

export default SingleSticky;
