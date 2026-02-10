import type { ModalType } from "@/components/Modal/types/modal";
import type { TermsKey } from "@/components/Modal/types/terms";
import { create } from "zustand";

type TermsDetailPayload = {
  activeKey: TermsKey;
  from?: "footer" | undefined;
};

type ModalPayloadMap = {
  [K in ModalType]: K extends typeof ModalType.HOME_TERMS_DETAIL ? TermsDetailPayload : undefined;
};

type ModalPayload = ModalPayloadMap[ModalType] | undefined;

interface BaseModal {
  isModalOpen: boolean;
  modalType: ModalType | null;
  modalPayload: ModalPayload;

  setModalType: (type: ModalType) => void;
  openModal: <T extends ModalType>(type: T, payload?: ModalPayloadMap[T]) => void;
  closeModal: () => void;
}

export const useBaseModal = create<BaseModal>((set) => ({
  isModalOpen: false,
  modalType: null,
  modalPayload: undefined,

  setModalType: (type) => set({ modalType: type }),

  openModal: (modalType, modalPayload) => set({ isModalOpen: true, modalType, modalPayload }),

  closeModal: () => set({ isModalOpen: false, modalType: null, modalPayload: undefined }),
}));
