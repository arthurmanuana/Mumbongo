import { create } from "zustand";

export const useProductsUIStore = create((set) => ({
  modalOpen: false,
  editingProduct: null,
  openAdd: () => set({ modalOpen: true, editingProduct: null }),
  openEdit: (product) => set({ modalOpen: true, editingProduct: product }),
  close: () => set({ modalOpen: false, editingProduct: null }),
}));
