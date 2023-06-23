import { ICountProps, ISingleTask } from './types';

export const DELAY: number = 150;

export const initialTask: ISingleTask = {
  title: '',
  description: '',
  list_type: 'personal',
  due_date: new Date(),
};

export const initialToast = { show: false, message: '' };

export const initialCount: ICountProps = {
  upcoming: 0,
  today: 0,
  personal: 0,
  work: 0,
};

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

export const COLOR_LIST = ['!bg-blue', '!bg-green', '!bg-purple'];
