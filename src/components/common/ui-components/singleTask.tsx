import React, { Dispatch, SetStateAction } from 'react';
import { CalendarMenuIcon, RightIcon } from '../icons/icons';
import ListIocnBox from '@components/menu/listIocnBox';
import { ISingleTask } from '@utils/types';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { useDataStoreContext } from '@context/useDataStoreContext';

interface ISingleTaskProps {
  setViewTasks: Dispatch<SetStateAction<boolean>>;
  taskData: ISingleTask;
}

const SingleTask = (props: ISingleTaskProps) => {
  const { taskData, setViewTasks } = props;
  const { title, due_date, list_type, description, _id } = taskData;
  const { setSingleTaskData } = useDataStoreContext();

  const handleViewTask = () => {
    setViewTasks(true);
    setSingleTaskData({
      title,
      description,
      due_date,
      list_type,
      _id,
    });
  };

  return (
    <div
      onClick={handleViewTask}
      className="hover:bg-grey-10 m-0 sm:mx-2 sm:first:mt-2 p-2 rounded-lg hover:cursor-pointer
     sm:hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div className="flex gap-4 p-1 items-center">
        <div>
          <h1 className="text-grey-40 flex-grow hover:cursor-pointer text-body-1/b2">
            {capitalizeFirstLetter(title)}
          </h1>

          <div className="flex gap-8 items-center py-3">
            {due_date && (
              <div className="flex gap-2 items-center">
                <CalendarMenuIcon />
                <h3 className="text-grey-60 text-body-2/b1">
                  {new Date(due_date ?? '').toLocaleString()}
                </h3>
              </div>
            )}
            {list_type && (
              <div className="flex gap-2 items-center">
                <ListIocnBox
                  size={'!h-4 w-4 rounded-sm'}
                  bgColor={list_type === 'work' ? '!bg-yellow' : '!bg-red'}
                />
                <h3 className="text-grey-60 text-body-2/b1">
                  {capitalizeFirstLetter(list_type)}
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="pr-1 sm:pr-5 ml-auto">
          <RightIcon />
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
