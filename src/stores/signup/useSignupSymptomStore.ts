import { create } from "zustand";

interface SignupSymptomState {
  selectedKey: string | null; // UI 표시용
  selectedPainAreaID: number | null; // 서버 전송용

  // UI + 서버용 값 함께 설정 -> 동기화
  setSelectedSymptom: (key: string | null, painAreaID: number | null) => void;
}

const useSignupSymptomStore = create<SignupSymptomState>((set) => ({
  selectedKey: null,
  selectedPainAreaID: null,

  setSelectedSymptom: (key, painAreaID) =>
    set({ selectedKey: key, selectedPainAreaID: painAreaID }),
}));

export default useSignupSymptomStore;
