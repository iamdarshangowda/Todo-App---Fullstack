'use client';

import {
  CalendarMenuIocn,
  MenuIcon,
  SettingsIocn,
  SignOutIocn,
  StickyNotes,
  TodayMenuIcon,
  UpcommingIcon,
} from '@components/common/icons/icons';
import React, { useState } from 'react';
import SearchBar from './searchBar';
import SingleMenu from './singleMenu';
import { IMenu, IMenuList } from '@utils/types';
import ListIocnBox from './listIocnBox';

const TASKS: IMenuList = [
  {
    icon: <UpcommingIcon />,
    label: 'Upcomming',
  },
  {
    icon: <TodayMenuIcon />,
    label: 'Today',
  },
  {
    icon: <CalendarMenuIocn />,
    label: 'Calendar',
  },
  {
    icon: <StickyNotes />,
    label: 'Sticky Wall',
  },
];

const LISTS: IMenuList = [
  {
    icon: <ListIocnBox bgColor={'!bg-grey-90'} />,
    label: 'Personal',
  },
  {
    icon: <ListIocnBox bgColor={'!bg-yellow'} />,
    label: 'Work',
  },
  {
    icon: <ListIocnBox />,
    label: 'List 1',
  },
];

const SETTINGS: IMenuList = [
  {
    icon: <SettingsIocn />,
    label: 'Settings',
  },
  {
    icon: <SignOutIocn />,
    label: 'Sign Out',
  },
];

const MenuSidebar = () => {
  const [hide, setHide] = useState(false);
  return (
    <nav
      className={`${
        hide ? 'w-10 flex items-center' : 'w-1/5 min-w-[250px] bg-grey-10'
      } rounded-xl z-10  p-6 flex flex-col`}
    >
      {hide && (
        <div className="hover:cursor-pointer " onClick={() => setHide((prev) => !prev)}>
          <MenuIcon fill="#4B4B4B" />
        </div>
      )}
      <div className={hide ? 'hidden transition-all duration-500' : 'block duration-500'}>
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60">Menu</h2>
          <div className="hover:cursor-pointer" onClick={() => setHide(true)}>
            <MenuIcon fill="#4B4B4B" />
          </div>
        </div>

        <div className="w-full my-6">
          <SearchBar />
        </div>

        <div>
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Tasks</h3>
          <div className="flex flex-col space-y-3 mb-4 mt-2">
            {TASKS.map(({ icon, label }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} count={5} />
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-grey-30 rounded-xl my-4"></div>

        <div className="flex-grow overflow-auto scrollbar-hide">
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Lists</h3>
          <div className="flex flex-col space-y-3 mb-4 mt-2">
            {LISTS.map(({ icon, label }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} count={3} />
            ))}
          </div>
        </div>

        {/* <div className="h-[1px] bg-grey-30 rounded-xl my-4"></div> */}

        <div>
          <div className="flex flex-col space-y-3 mb-4 mt-2">
            {SETTINGS.map(({ icon, label }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuSidebar;
