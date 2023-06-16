import React from 'react';
import { CalendarMenuIcon, RightIcon } from '../icons/icons';
import ListIocnBox from '@components/menu/listIocnBox';
import { ISingleTask } from '@utils/types';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';

const SingleTask = (props: ISingleTask) => {
  const { title, dueDateTime, listType } = props;
  return (
    <div className="hover:bg-[#D8D8D8] p-2 rounded-lg hover:cursor-pointer ">
      <div className="flex gap-4 p-1">
        <div className="w-5 h-5">
          <input type="checkbox" id={title} name="singletask" value="task1" size={4} />
        </div>
        <label
          htmlFor={title}
          className="text-grey-40 flex-grow hover:cursor-pointer text-body-1/b2"
        >
          {title}
        </label>
        <div>
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
