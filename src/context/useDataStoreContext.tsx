import { initialCount, initialTask } from '@utils/initialData';
import { ICountProps, ISingleTask } from '@utils/types';
import { create } from 'zustand';

type IDataStoreContext = {
  singleTaskData: ISingleTask;
  setSingleTaskData: (singleTaskData: ISingleTask) => void;

  tasksCount: ICountProps;
  setTasksCount: (tasksCount: ICountProps) => void;
};

export const useDataStoreContext = create<IDataStoreContext>((set, get) => ({
  singleTaskData: initialTask,
  setSingleTaskData(singleTaskData) {
    set({ singleTaskData });
  },

  tasksCount: initialCount,
  setTasksCount(tasksCount) {
    set({ tasksCount });
  },
}));
