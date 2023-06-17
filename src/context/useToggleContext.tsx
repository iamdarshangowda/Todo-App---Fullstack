import isMobileDevice from '@utils/detectUserDevice';
import { create } from 'zustand';

type ITabContext = {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;

  hideMenu: boolean;
  setHideMenu: (hideMenu: boolean) => void;
};

export const useToggleContext = create<ITabContext>((set, get) => ({
  currentTab: 0,
  setCurrentTab(currentTab) {
    set({ currentTab });
  },

  hideMenu: isMobileDevice() ? true : false,
  setHideMenu(hideMenu) {
    set({ hideMenu });
  },
}));
