import React from 'react';

const SkeletonSticky = () => {
  return (
    <div
      className={`bg-grey-10 dark:bg-grey-80 animate-pulse h-[150px] md:h-[260px]
     text-grey-80 dark:text-grey-10 p-3 overflow-auto rounded-xl
     shadow-sm shadow-grey-50 dark:shadow-grey-40 flex justify-center items-center`}
    >
      Loading...
    </div>
  );
};

export default SkeletonSticky;
