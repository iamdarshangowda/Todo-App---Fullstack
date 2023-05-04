'use client';

import { MenuIcon } from '@components/common/icons/icons';
import React from 'react';
import SearchBar from './searchBar';

const MenuSidebar = () => {
  return (
    <div className="w-1/5 min-w-[250px] rounded-xl m-4 fixed bottom-0 top-0 left-0 bg-grey-10 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-2/h1 text-grey-60">Menu</h2>
        <div className="hover:cursor-pointer">
          <MenuIcon fill="#4B4B4B" />
        </div>
      </div>

      <div className="w-full my-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default MenuSidebar;
