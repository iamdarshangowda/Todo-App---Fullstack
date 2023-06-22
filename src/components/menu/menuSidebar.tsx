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
import React, { useEffect } from 'react';
import SingleMenu from './singleMenu';
import { IMenu, IMenuList } from '@utils/types';
import ListIocnBox from './listIocnBox';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';
import { useDataStoreContext } from '@context/useDataStoreContext';

const TASKS: IMenuList = [
  {
    icon: <UpcommingIcon />,
    label: 'Upcoming',
    route: '/upcoming',
    count: 0,
  },
  {
    icon: <TodayMenuIcon />,
    label: 'Today',
    route: '/today',
    count: 0,
  },
  {
    icon: <CalendarMenuIcon />,
    label: 'Calendar',
    route: 'calendar',
    count: 0,
  },
  {
    icon: <StickyNotes />,
    label: 'Sticky Wall',
    route: 'stickynotes',
    count: 0,
  },
];

const LISTS: IMenuList = [
  {
    icon: <ListIocnBox bgColor={'!bg-red-500'} />,
    label: 'Personal',
    route: '/personal',
    count: 0,
  },
  {
    icon: <ListIocnBox bgColor={'!bg-yellow'} />,
    label: 'Work',
    route: '/work',
    count: 0,
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
  const { tasksCount, setTasksCount } = useDataStoreContext();

  useEffect(() => {
    getAllCount(setTasksCount);
  }, []);

  useEffect(() => {
    [...TASKS, ...LISTS].forEach((task) => {
      switch (task.label.toLocaleLowerCase()) {
        case 'upcoming':
          task.count = tasksCount.upcoming;
          break;
        case 'today':
          task.count = tasksCount.today;
          break;
        case 'personal':
          task.count = tasksCount.personal;
          break;
        case 'work':
          task.count = tasksCount.work;
          break;
      }
    });
  }, [tasksCount]);

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

        <div className="mt-6">
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Tasks</h3>
          <div className="flex flex-col space-y-3 mt-2">
            {TASKS.map(({ icon, label, route, count }: IMenu) => (
              <SingleMenu
                icon={icon}
                label={label}
                key={label}
                count={count}
                route={route}
              />
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-grey-30 rounded-xl my-4"></div>

        <div className="overflow-auto scrollbar-hide">
          <h3 className="text-body-2/b1 text-grey-40 uppercase">Lists</h3>
          <div className="flex flex-col space-y-3 mb-4 mt-2 sm:h-full h-20">
            {LISTS.map(({ icon, label, route, count }: IMenu) => (
              <SingleMenu
                icon={icon}
                label={label}
                key={label}
                count={count}
                route={route}
              />
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
