import { create } from "zustand";

interface SignupSymptomState {
  selectedKey: string | null;
  setSelectedKey: (key: string | null) => void;
}

const useSignupSymptomStore = create<SignupSymptomState>((set) => ({
  selectedKey: null,
  setSelectedKey: (key) => set({ selectedKey: key }),
}));

export default useSignupSymptomStore;
