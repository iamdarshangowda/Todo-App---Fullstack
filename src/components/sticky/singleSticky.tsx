import { IStickyData } from '@utils/types';
import React from 'react';

interface ISingleStickyProps {
  data: IStickyData;
}
const SingleSticky = (props: ISingleStickyProps) => {
  const { data } = props;

  return (
    <div
      className={`h-[150px] md:h-[260px]
     text-grey-80 rounded-xl p-3 overflow-auto`}
      style={{
        backgroundColor: data.stickyColor,
      }}
    >
      <p className="drop-shadow-xl">{data.text}</p>
    </div>
  );
};

export default SingleSticky;
