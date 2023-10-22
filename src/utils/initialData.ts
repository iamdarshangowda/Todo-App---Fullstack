import { ISingleTask } from './types';

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

export const initialVoiceNote = {
  id: '',
  createdAt: new Date(),
  duration: 0,
  title: '',
};
