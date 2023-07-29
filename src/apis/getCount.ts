import { get } from '../config/axiosClient';
import { ICountProps } from '@utils/types';

export const getAllCount = async (setCount: (tasksCount: ICountProps[]) => void) => {
  await get('tasksCount').then((data) => {
    console.log(data.data.allCounts);
    setCount(data.data.allCounts);
  });
};
