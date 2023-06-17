import isMobileDevice from '@utils/detectUserDevice';
import { initialToast } from '@utils/initialData';
import { ISuccessToast } from '@utils/types';
import { create } from 'zustand';

type ITabContext = {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;

  hideMenu: boolean;
  setHideMenu: (hideMenu: boolean) => void;

  showSuccessToast: ISuccessToast;
  setShowSuccessToast: (showSuccessToast: ISuccessToast) => void;

  showErrorToast: ISuccessToast;
  setShowErrorToast: (showSuccessToast: ISuccessToast) => void;
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

  showSuccessToast: initialToast,
  setShowSuccessToast(showSuccessToast) {
    set({ showSuccessToast });
  },

  showErrorToast: initialToast,
  setShowErrorToast(showErrorToast) {
    set({ showErrorToast });
  },
}));
