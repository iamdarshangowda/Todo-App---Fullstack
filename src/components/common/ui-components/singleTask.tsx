import React from 'react';
import { CalendarMenuIcon, RightIcon } from '../icons/icons';
import ListIocnBox from '@components/menu/listIocnBox';
import { ISingleTask } from '@utils/types';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

const SingleTask = (props: ISingleTask) => {
  const { title, dueDateTime, listType } = props;
  return (
    <div
      className="hover:bg-grey-10 m-0 sm:mx-2 sm:first:mt-2 p-2 rounded-lg hover:cursor-pointer
    hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div className="flex gap-4 p-1">
        <div className="w-5 h-5">
          <input type="checkbox" id={title} name="singletask" value="task1" size={4} />
        </div>
        <label
          htmlFor={title}
          className="text-grey-40 flex-grow hover:cursor-pointer text-body-1/b2"
        >
          {capitalizeFirstLetter(title)}
        </label>
        <div className="pr-1 sm:pr-5">
          <RightIcon />
        </div>
      </div>

      <div className="flex gap-8 pl-10 items-center pt-1">
        {dueDateTime && (
          <div className="flex gap-2 items-center">
            <CalendarMenuIcon />
            <h3 className="text-grey-60 text-body-2/b1">{dueDateTime}</h3>
          </div>
        )}
        {listType && (
          <div className="flex gap-2 items-center">
            <ListIocnBox size={'!h-4 w-4 rounded-sm'} />
            <h3 className="text-grey-60 text-body-2/b1">
              {capitalizeFirstLetter(listType)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTask;
