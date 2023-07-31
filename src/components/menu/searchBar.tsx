import { SearchIcon } from '@components/common/icons/icons';
import { InputAttributes } from '@utils/types';
import React from 'react';

interface ISearchProps {
  onChange?: InputAttributes['onChange'];

  disabled?: boolean;
}

const SearchBar = (props: ISearchProps) => {
  const { onChange, disabled } = props;
  return (
    <div className="border border-grey-20 dark:border-cream rounded-lg flex items-center">
      <div className="px-2">
        <SearchIcon />
      </div>
      <input
        type="text"
        id="search"
        name="search"
        className={`w-full p-2 text-body-1/b dark:text-grey-0
      placeholder:text-body-1/b2 placeholder:text-grey-20 dark:placeholder:text-cream disabled:text-grey-20 outline-none dark:bg-grey-70`}
        placeholder="Search your tasks"
        onChange={onChange}
        disabled={disabled}
        //onBlur={onBlur}
        //value={value}
      />
    </div>
  );
};

export default SearchBar;
