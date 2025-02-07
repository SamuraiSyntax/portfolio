import { create } from "zustand";

type ModalStore = {
  activeModals: Set<string>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
};

export const useModal = create<ModalStore>((set, get) => ({
  activeModals: new Set(),
  openModal: (modalId) =>
    set((state) => ({
      activeModals: new Set(state.activeModals).add(modalId),
    })),
  closeModal: (modalId) =>
    set((state) => {
      const newModals = new Set(state.activeModals);
      newModals.delete(modalId);
      return { activeModals: newModals };
    }),
  isModalOpen: (modalId) => get().activeModals.has(modalId),
}));
