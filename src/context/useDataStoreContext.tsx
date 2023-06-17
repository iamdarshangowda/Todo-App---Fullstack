import { initialTask } from '@utils/initialData';
import { ISingleTask } from '@utils/types';
import { create } from 'zustand';

type IDataStoreContext = {
  singleTaskData: ISingleTask;
  setSingleTaskData: (singleTaskData: ISingleTask) => void;
};

export const useDataStoreContext = create<IDataStoreContext>((set, get) => ({
  singleTaskData: initialTask,
  setSingleTaskData(singleTaskData) {
    set({ singleTaskData });
  },
}));
