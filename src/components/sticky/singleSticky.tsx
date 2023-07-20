import React from 'react';

interface ISingleStickyProps {
  text: string;
}
const SingleSticky = (props: ISingleStickyProps) => {
  const { text } = props;
  return (
    <div
      className="w-[150px] md:w-[260px] h-[150px] md:h-[260px] flex justify-center items-center
     text-grey-80"
    >
      {text}
    </div>
  );
};

export default SingleSticky;
