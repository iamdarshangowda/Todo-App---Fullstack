import { create } from "zustand";

type ITabContext = {
  currentTab: number;
  setCurrentTab: (currentTab: number) => void;
};

export const useTabContext = create<ITabContext>((set, get) => ({
  currentTab: 0,
  setCurrentTab(currentTab) {
    set({ currentTab });
  },
}));
