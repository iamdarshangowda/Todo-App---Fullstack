import { ISingleTask } from './types';

export const initialTask: ISingleTask = {
  title: '',
  description: '',
  list_type: 'personal',
  due_date: '',
};

export const initialToast = { show: false, message: '' };
