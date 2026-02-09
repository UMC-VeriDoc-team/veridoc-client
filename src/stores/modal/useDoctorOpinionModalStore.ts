import { create } from "zustand";

interface DoctorOpinionModalState {
  doctorOpinionId: number | null;
  setDoctorOpinionId: (id: number) => void;
  reset: () => void;
}

// 전문의소견 모달 전용 스토어
const useDoctorOpinionModalStore = create<DoctorOpinionModalState>((set) => ({
  doctorOpinionId: null,
  setDoctorOpinionId: (id) => set({ doctorOpinionId: id }),
  reset: () => set({ doctorOpinionId: null }),
}));

export default useDoctorOpinionModalStore;
