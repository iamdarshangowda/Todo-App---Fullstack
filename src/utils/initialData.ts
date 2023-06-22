import { ICountProps, ISingleTask } from './types';

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
