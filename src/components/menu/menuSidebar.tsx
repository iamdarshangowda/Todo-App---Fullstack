'use client';

import {
  AddIcon,
  CalendarMenuIcon,
  CheckIcon,
  CloseIcon,
  LeftArrowIcon,
  MicroPhoneIcon,
  SignOutIcon,
  StickyNotes,
  TodayMenuIcon,
  TodoIconSmall,
  UpcommingIcon,
} from '@components/common/icons/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SingleMenu from './singleMenu';
import { IList, IListType, IMenu, IMenuList } from '@utils/types';
import { useToggleContext } from '@context/useToggleContext';
import { getAllCount } from '../../apis/getCount';
import { useDataStoreContext } from '@context/useDataStoreContext';
import { useRouter } from 'next/navigation';
import TextInput from '@components/common/inputs/textInput';
import { get, post } from '../../config/axiosClient';
import DarkModeToggle from '@components/common/ui-components/darkModeToggle';
import { generateRandomColor } from '@utils/generateRandomColor';
import SingleList from './singleList';
import { useThemeContext } from '@context/ThemeContext';

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
    icon: <StickyNotes />,
    label: 'Sticky',
    route: '/sticky',
    count: 0,
  },
  {
    icon: <MicroPhoneIcon />,
    label: 'Voice Notes',
    route: '/voice-notes',
    count: 0,
  },
];

const LISTS: IListType = [
  {
    label: 'Personal',
    route: '/lists/personal',
    color: '#EBB02D', // yellow
    count: 0,
  },
  {
    label: 'Work',
    route: '/lists/work',
    color: '#F24C3D', // red
    count: 0,
  },
];

const SETTINGS: IMenuList = [
  {
    icon: <SignOutIcon />,
    label: 'Sign Out',
    route: '/auth',
  },
];

const MenuSidebar = () => {
  const router = useRouter();
  const { hideMenu, setHideMenu, setShowSuccessToast, setShowErrorToast } =
    useToggleContext();
  const { tasksCount, setTasksCount, userLists, setUserLists } = useDataStoreContext();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');
  const { mode } = useThemeContext();

  const handleInputChamge = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Change to zod validation
    const WHITE_SPACE = /\s/;
    if (WHITE_SPACE.test(value)) {
      setShowErrorToast({ show: true, message: 'Space not allowed' });
      return;
    }

    if (value.length > 10) {
      setShowErrorToast({ show: true, message: 'Text too long! Max 10 Characters' });
      return;
    }

    setListName(value);
  };

  const handleAddNewList = async () => {
    if (!listName) return;
    await post('list', { list: listName.trim(), color: generateRandomColor() }).then(
      (data) => {
        setShowInput(false);
        setListName('');
        setShowSuccessToast({ show: true, message: data.data.message });
        handleGetUserLists();
        getAllCount(setTasksCount);
      }
    );
  };

  const handleGetUserLists = async () => {
    await get('lists').then((data) => {
      const { lists } = data.data;
      const extraLists: IListType = [];
      lists.forEach((list: any) =>
        extraLists.push({
          color: list.color,
          label: list.list,
          route: `/lists/${list.list.toLocaleLowerCase()}`,
          count: 0,
        })
      );
      setUserLists([...LISTS, ...extraLists]);
    });
  };

  const handleCloseInput = () => {
    setHideMenu(!hideMenu);
    setListName('');
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
    <aside
      className={`bg-inherit fixed top-0 left-0 z-40 w-72 md:w-80 h-full p-6 flex flex-col
       border-r border-grey-20 dark:border-grey-30 transition-transform  ${
         hideMenu ? '-translate-x-full sm:translate-x-0 ' : 'translate-x-0'
       }`}
    >
      <div className="flex justify-between items-center">
        <div onClick={() => router.push('/tasks/today')} className="hover:cursor-pointer">
          <TodoIconSmall size={'44px'} />
        </div>
        <div
          className="md:hidden hover:cursor-pointer p-3 rounded-lg hover:scale-110"
          onClick={handleCloseInput}
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
              value={listName}
              onChange={handleInputChamge}
              placeholder="Enter List Name"
            />
            <button
              className="hover:bg-grey-0 p-1 sm:p-3 rounded-full"
              onClick={handleAddNewList}
              disabled={!listName}
            >
              <CheckIcon
                size={'20px'}
                fill={`${listName ? (mode === 'dark' ? 'white' : 'default') : 'grey'}`}
              />
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
          {userLists.map(({ label, route, count, color }: IList) => (
            <SingleList
              color={color}
              label={label}
              key={color}
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
        <div className="h-[1px] bg-grey-20 rounded-xl "></div>
        <div className="p-3">
          <DarkModeToggle />
        </div>
        {SETTINGS.map(({ icon, label, route }: IMenu) => (
          <SingleMenu icon={icon} label={label} key={label} route={route} />
        ))}
      </div>
    </aside>
  );
};

export default MenuSidebar;
