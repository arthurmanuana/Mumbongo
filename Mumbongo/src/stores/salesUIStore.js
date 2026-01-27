import { create } from "zustand";

export const useSalesUIStore = create((set) => ({
  modalOpen: false,
  close: () => set({ modalOpen: false }),
  open: () => set({ modalOpen: true }),
}));
