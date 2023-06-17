import React from 'react';

const SingleTaskSkeleton = () => {
  return (
    <div className="bg-grey-10 p-2 rounded-lg h-15 mx-4 animate-pulse">
      <div className="flex gap-4 p-2">
        <div className="w-[90%] bg-grey-20 rounded-lg h-5"></div>
        <label className="text-grey-40 flex-grow hover:cursor-pointer text-body-1/b2 h-5"></label>
      </div>

      <div className="flex gap-8 items-center p-2">
        <div className="flex gap-2 items-center ">
          <div className="h-5 w-5 bg-grey-20 rounded-lg"></div>
          <h3 className="bg-grey-20 text-body-2/b1 w-20 h-5 rounded-lg"></h3>
        </div>

        <div className="flex gap-2 items-center ">
          <div className="h-5 w-5 bg-grey-20 rounded-lg"></div>
          <h3 className="bg-grey-20 text-body-2/b1 w-20 h-5 rounded-lg"></h3>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskSkeleton;
