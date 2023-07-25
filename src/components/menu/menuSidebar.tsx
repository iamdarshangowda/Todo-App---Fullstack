'use client';

import {
  AddIcon,
  CalendarMenuIcon,
  CheckIcon,
  CloseIcon,
  LeftArrowIcon,
  SignOutIcon,
  StickyNotes,
  TodayMenuIcon,
  TodoIconSmall,
  UpcommingIcon,
} from '@components/common/icons/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SingleMenu from './singleMenu';
import { IMenu, IMenuList } from '@utils/types';
import ListIocnBox from './listIocnBox';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useRouter } from 'next/navigation';
import TextInput from '@components/common/inputs/textInput';
import { get, post } from '../../config/axiosClient';
import { COLOR_LIST } from '@utils/initialData';
import DarkModeToggle from '@components/common/ui-components/darkModeToggle';

const TASKS: IMenuList = [
  {
    icon: <UpcommingIcon />,
    label: 'Upcoming',
    route: '/tasks/upcoming',
    count: 0,
  },
  {
    icon: <TodayMenuIcon />,
    label: 'Today',
    route: '/tasks/today',
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
    route: '/sticky',
    count: 0,
  },
];

const LISTS: IMenuList = [
  {
    icon: <ListIocnBox bgColor={'!bg-red'} />,
    label: 'Personal',
    route: '/lists/personal',
    count: 0,
  },
  {
    icon: <ListIocnBox bgColor={'!bg-yellow'} />,
    label: 'Work',
    route: '/lists/work',
    count: 0,
  },
];

const SETTINGS: IMenuList = [
  {
    icon: <SignOutIcon />,
    label: 'Sign Out',
    route: '/',
  },
];

const MenuSidebar = () => {
  const router = useRouter();
  const { hideMenu, setHideMenu } = useToggleContext();
  const { tasksCount, setTasksCount, userLists, setUserLists } = useDataStoreContext();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');

  const handleInputChamge = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setListName(value);
  };

  const handleAddNewList = async () => {
    if (!listName) return;
    await post('list', { list: listName.trim() }).then((data) => {
      setShowInput(false);
      setListName('');
      handleGetUserLists();
    });
  };

  const handleGetUserLists = async () => {
    await get('lists').then((data) => {
      const { lists } = data.data;
      const extraLists: IMenuList = [];
      lists.forEach((list: any, index: number) =>
        extraLists.push({
          icon: <ListIocnBox bgColor={COLOR_LIST[index + 2]} />,
          label: list.list,
          route: `/lists/${list.list.toLocaleLowerCase()}`,
          count: 0,
        })
      );
      setUserLists([...LISTS, ...extraLists]);
    });
  };

  useEffect(() => {
    handleGetUserLists();
    getAllCount(setTasksCount);
  }, []);

  useEffect(() => {
    [...TASKS, ...userLists].forEach((menu) =>
      tasksCount.forEach((value) => {
        if (menu.label.toLowerCase() === value.title.toLowerCase()) {
          menu.count = value.count;
        }
      })
    );
  }, [tasksCount, userLists]);

  return (
    <nav
      className={`${
        hideMenu ? 'hidden' : 'w-1/5 min-w-[330px] rounded-xl p-6 flex flex-col'
      }`}
    >
      <div className="flex justify-between items-center">
        <div onClick={() => router.push('/tasks/today')} className="hover:cursor-pointer">
          <TodoIconSmall size={'44px'} />
        </div>
        <div
          className="hover:cursor-pointer p-3 rounded-lg hover:scale-110"
          onClick={() => setHideMenu(true)}
        >
          <LeftArrowIcon fill="#4B4B4B" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-body-2/b1 uppercase">Tasks</h3>
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

      <div className="h-[1px] bg-grey-20 rounded-xl my-4"></div>

      <div className="overflow-auto scrollbar-hide h-full">
        <div className="flex justify-between py-1">
          <h3 className="text-body-2/b1 uppercase">Lists</h3>
          {!showInput && userLists.length < 5 && (
            <button onClick={() => setShowInput((prev) => !prev)}>
              <AddIcon size={'w-5 h-5'} />
            </button>
          )}
        </div>
        {showInput && (
          <div className="flex gap-2 my-6">
            <TextInput
              name="list"
              type="text"
              onChange={handleInputChamge}
              placeholder="Enter List Name"
            />
            <button
              className="hover:bg-grey-0 p-1 sm:p-3 rounded-full"
              onClick={handleAddNewList}
              disabled={!listName}
            >
              <CheckIcon size={'20px'} fill={`${listName ? 'default' : 'grey'}`} />
            </button>
            <button
              onClick={() => setShowInput((prev) => !prev)}
              className="hover:bg-grey-20 p-1 sm:p-3 rounded-full"
            >
              <CloseIcon size={'w-5 h-5'} />
            </button>
          </div>
        )}
        <div className="flex flex-col space-y-3 mb-4 mt-2 sm:h-full h-20">
          {userLists.map(({ icon, label, route, count }: IMenu) => (
            <SingleMenu
              icon={icon}
              label={label}
              key={label}
              count={count}
              route={route}
              showDelete={showInput}
              setShowInput={setShowInput}
              callback={handleGetUserLists}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-3 mb-2 mt-auto">
        <div className="h-[1px] bg-grey-30 rounded-xl "></div>
        <div className="p-3">
          <DarkModeToggle />
        </div>
        {SETTINGS.map(({ icon, label, route }: IMenu) => (
          <SingleMenu icon={icon} label={label} key={label} route={route} />
        ))}
      </div>
    </nav>
  );
};

export default MenuSidebar;
