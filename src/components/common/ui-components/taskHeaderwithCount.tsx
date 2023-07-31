import React from 'react';
import { MenuIcon } from '../icons/icons';
import { useToggleContext } from '@context/useToggleContext';
import SearchBar from '@components/menu/searchBar';

interface ITaskHeaderwithCount {
  title: string;
  count: number;
  loading: boolean;
  handleSearchChange?: () => void;
}

const TaskHeaderwithCount = (props: ITaskHeaderwithCount) => {
  const { title, count, loading, handleSearchChange } = props;
  const { hideMenu, setHideMenu } = useToggleContext();

  return (
    <div className=" flex gap-5 items-center relative justify-items-stretch">
      <div
        className="sm:hidden hover:cursor-pointer rounded-md"
        onClick={() => setHideMenu(!hideMenu)}
      >
        <MenuIcon />
      </div>

      <h1 className="text-heading-1/h2">{title}</h1>
      {loading ? (
        <span className="w-12 h-12 rounded-lg animate-pulse bg-grey-10 dark:bg-grey-80"></span>
      ) : count ? (
        <span className="text-heading-2/h1 px-4 border border-grey-20 rounded-lg ">
          {count}
        </span>
      ) : null}

      <div className="ml-auto hidden sm:block">
        <SearchBar onChange={handleSearchChange} />
      </div>
    </div>
  );
};

export default TaskHeaderwithCount;
