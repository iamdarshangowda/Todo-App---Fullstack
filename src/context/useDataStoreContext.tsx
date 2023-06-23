import { initialTask } from '@utils/initialData';
import { ICountProps, IMenuList, ISingleTask } from '@utils/types';
import { create } from 'zustand';

type IDataStoreContext = {
  singleTaskData: ISingleTask;
  setSingleTaskData: (singleTaskData: ISingleTask) => void;

  tasksCount: ICountProps[];
  setTasksCount: (tasksCount: ICountProps[]) => void;

  userLists: IMenuList;
  setUserLists: (userLists: IMenuList) => void;
};

export const useDataStoreContext = create<IDataStoreContext>((set, get) => ({
  singleTaskData: initialTask,
  setSingleTaskData(singleTaskData) {
    set({ singleTaskData });
  },

  tasksCount: [],
  setTasksCount(tasksCount) {
    set({ tasksCount });
  },

  userLists: [],
  setUserLists(userLists) {
    set({ userLists });
  },
}));
