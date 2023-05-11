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

  hideMenu: false,
  setHideMenu(hideMenu) {
    set({ hideMenu });
  },
}));
