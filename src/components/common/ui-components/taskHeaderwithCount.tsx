import React from 'react';
import { MenuIcon } from '../icons/icons';
import { useToggleContext } from '@context/useToggleContext';

interface ITaskHeaderwithCount {
  title: string;
  count: number;
  loading: boolean;
}

const TaskHeaderwithCount = (props: ITaskHeaderwithCount) => {
  const { title, count, loading } = props;
  const { hideMenu, setHideMenu } = useToggleContext();
  return (
    <div className="text-heading-1/h2 text-grey-80 flex gap-10 items-center ">
      {hideMenu && (
        <div className="hover:cursor-pointer " onClick={() => setHideMenu(false)}>
          <MenuIcon fill="#4B4B4B" />
        </div>
      )}
      <h1>{title}</h1>
      {loading ? (
        <span className="w-12 rounded-lg animate-pulse bg-grey-10"></span>
      ) : count ? (
        <span className="px-4 border border-grey-20 rounded-lg">{count}</span>
      ) : null}
    </div>
  );
};

export default TaskHeaderwithCount;
