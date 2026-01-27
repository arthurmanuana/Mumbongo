import { create } from "zustand";

export const useUIStore = create((set) => ({
  drawerOpen: false,
  setDrawerOpen: (v) => set({ drawerOpen: v }),
}));
