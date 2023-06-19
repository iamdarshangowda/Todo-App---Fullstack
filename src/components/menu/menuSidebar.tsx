'use client';

import {
  CalendarMenuIcon,
  MenuIcon,
  SettingsIcon,
  SignOutIcon,
  StickyNotes,
  TodayMenuIcon,
  UpcommingIcon,
} from '@components/common/icons/icons';
import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar';
import SingleMenu from './singleMenu';
import { IMenu, IMenuList } from '@utils/types';
import ListIocnBox from './listIocnBox';
import { useToggleContext } from '@context/useToggleContext';

const TASKS: IMenuList = [
  {
    icon: <UpcommingIcon />,
    label: 'Upcoming',
    route: '/upcoming',
  },
  {
    icon: <TodayMenuIcon />,
    label: 'Today',
    route: '/today',
  },
  {
    icon: <CalendarMenuIcon />,
    label: 'Calendar',
    route: 'calendar',
  },
  {
    icon: <StickyNotes />,
    label: 'Sticky Wall',
    route: 'stickynotes',
  },
];

const LISTS: IMenuList = [
  {
    icon: <ListIocnBox bgColor={'!bg-red-500'} />,
    label: 'Personal',
    route: '/personal',
  },
  {
    icon: <ListIocnBox bgColor={'!bg-yellow'} />,
    label: 'Work',
    route: '/work',
  },
];

const SETTINGS: IMenuList = [
  {
    icon: <SettingsIcon />,
    label: 'Settings',
    route: '/settings',
  },
  {
    icon: <SignOutIcon />,
    label: 'Sign Out',
    route: '/',
  },
];

const MenuSidebar = () => {
  const { hideMenu, setHideMenu } = useToggleContext();

  return (
    <nav
      className={`${
        hideMenu ? 'hidden' : 'w-1/5 min-w-[300px] bg-grey-10'
      } rounded-xl z-10  p-6 flex flex-col `}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 text-grey-60">Menu</h2>
          <div className="hover:cursor-pointer" onClick={() => setHideMenu(true)}>
            <MenuIcon fill="#4B4B4B" />
          </div>
        </div>

        <div className="w-full my-6">
          <SearchBar />
        </div>

        <div>
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Tasks</h3>
          <div className="flex flex-col space-y-3 mt-2">
            {TASKS.map(({ icon, label, route }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} count={5} route={route} />
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-grey-30 rounded-xl my-4"></div>

        <div className="overflow-auto scrollbar-hide">
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Lists</h3>
          <div className="flex flex-col space-y-3 mb-4 mt-2 sm:h-full h-20">
            {LISTS.map(({ icon, label, route }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} count={3} route={route} />
            ))}
          </div>
        </div>

        {/* <div className="h-[1px] bg-grey-30 rounded-xl my-4"></div> */}

        <div>
          <div className="flex flex-col mb-2 mt-2">
            {SETTINGS.map(({ icon, label, route }: IMenu) => (
              <SingleMenu icon={icon} label={label} key={label} route={route} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuSidebar;
