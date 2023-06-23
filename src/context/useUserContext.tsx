import { initialUserData } from '@utils/initialData';
import { IUserAuthData } from '@utils/types';
import { create } from 'zustand';

type IUserDataContext = {
  userAuthData: IUserAuthData;
  setUserAuthData: (userAuthData: IUserAuthData) => void;
};

export const useUserDataContext = create<IUserDataContext>((set, get) => ({
  userAuthData: initialUserData,
  setUserAuthData(userAuthData) {
    set({ userAuthData });
  },
}));
