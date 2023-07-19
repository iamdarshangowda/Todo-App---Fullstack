import React from 'react';
import { MenuIcon } from '../icons/icons';
import { useToggleContext } from '@context/useToggleContext';
import SearchBar from '@components/menu/searchBar';
import isMobileDevice from '@utils/detectUserDevice';

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
    <div className=" flex gap-6 items-center relative justify-items-stretch">
      {hideMenu && (
        <div
          className="hover:cursor-pointer p-3 bg-grey-10 rounded-lg hover:scale-110"
          onClick={() => setHideMenu(false)}
        >
          <MenuIcon fill="#4B4B4B" />
        </div>
      )}
      <h1 className="text-heading-1/h2">{title}</h1>
      {loading ? (
        <span className="w-12 h-12 rounded-lg animate-pulse bg-grey-10 dark:bg-grey-80"></span>
      ) : count ? (
        <span className="text-heading-2/h1 px-4 border border-grey-20 rounded-lg ">
          {count}
        </span>
      ) : null}

      <div className="ml-auto">
        {!isMobileDevice() && <SearchBar onChange={handleSearchChange} />}
      </div>
    </div>
  );
};

export default TaskHeaderwithCount;
