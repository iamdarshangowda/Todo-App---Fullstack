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
    <div className="border border-grey-20 rounded-lg flex items-center px-2 gap-2">
      <SearchIcon />
      <input
        type="text"
        id="search"
        name="search"
        className="w-full p-2 text-grey-80  text-body-1/b
      placeholder:text-body-1/b2 placeholder:text-grey-20 disabled:text-grey-20 outline-none bg-grey-10"
        placeholder="Search"
        onChange={onChange}
        disabled={disabled}
        //onBlur={onBlur}
        //value={value}
      />
    </div>
  );
};

export default SearchBar;
