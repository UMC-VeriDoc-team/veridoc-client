import { create } from "zustand";

interface TemporaryMeasureModalState {
  measureId: string | null;
  setMeasureId: (id: string) => void;
  reset: () => void;
}

// 임시대처방안 모달 전용 스토어
export const useTemporaryMeasureModalStore = create<TemporaryMeasureModalState>((set) => ({
  measureId: null,
  setMeasureId: (id) => set({ measureId: id }),
  reset: () => set({ measureId: null }),
}));
