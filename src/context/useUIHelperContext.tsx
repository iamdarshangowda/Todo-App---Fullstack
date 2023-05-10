import { create } from 'zustand';

type IUIHelperContext = {
  loading: boolean;
  setLoading: (currentTab: boolean) => void;

  blurBackground: boolean;
  setBlurBackground: (currentTab: boolean) => void;
};

export const useUIHelperContext = create<IUIHelperContext>((set, get) => ({
  loading: false,
  setLoading(loading) {
    set({ loading });
  },

  blurBackground: false,
  setBlurBackground(blurBackground) {
    set({ blurBackground });
  },
}));
