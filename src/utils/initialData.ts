import { ICountProps, ISingleTask } from './types';

export const DELAY: number = 100;

export const initialTask: ISingleTask = {
  title: '',
  description: '',
  list_type: 'personal',
  due_date: new Date(),
};

export const initialToast = { show: false, message: '' };

export const initialUserData = {
  username: '',
  email: '',
  _id: '',
};

export const singleInitialListsData = {
  icon: null,
  label: '',
  route: '',
  count: 0,
};

export const COLOR_LIST = [
  '!bg-red',
  '!bg-yellow',
  '!bg-blue',
  '!bg-green',
  '!bg-purple',
];
