import { AddIcon, CloseIcon } from '@components/common/icons/icons';
import React, { useState } from 'react';

const AddSticky = () => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div
      className="relative rounded-xl shadow-md shadow-grey-50 dark:shadow-grey-40 w-[150px] md:w-[260px] h-[150px] md:h-[260px] flex justify-center items-center
     text-grey-80 bg-cream"
    >
      {isAdding ? (
        <div className="w-full h-full">
          <textarea className=" rounded-xl w-full h-full border-none outline-none pt-12 px-6 bg-grey-10" />
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => setIsAdding(false)}
          >
            <CloseIcon />
          </div>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setIsAdding(true)}>
          <AddIcon size={'w-8 h-8'} />
        </div>
      )}
    </div>
  );
};

export default AddSticky;
