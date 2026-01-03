import type { ModalType } from "@/pages/modal/types/modal";
import { create } from "zustand";

interface BaseModal {
  isModalOpen: boolean;
  modalType: ModalType | null;

  setModalType: (type: ModalType) => void;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const useBaseModal = create<BaseModal>((set) => ({
  isModalOpen: false,
  modalType: null,
  props: undefined,

  setModalType: (type) => set({ modalType: type }),

  openModal: (type) =>
    set({
      isModalOpen: true,
      modalType: type,
    }),

  closeModal: () => set({ isModalOpen: false }),
}));

export default useBaseModal;
