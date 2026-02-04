import { create } from "zustand";
import { TermsKey, type CheckableTermsKey } from "@/components/Modal/types/terms";

type CheckedMap = Record<CheckableTermsKey, boolean>;

interface TermsAgreementState {
  checked: CheckedMap;
  setChecked: (key: CheckableTermsKey, value: boolean) => void;
  toggleChecked: (key: CheckableTermsKey) => void;
  setAll: (value: boolean) => void;
  reset: () => void;
  locationError: string | null;
  setLocationError: (msg: string | null) => void;
}

const initialChecked: CheckedMap = {
  [TermsKey.SERVICE]: false,
  [TermsKey.PRIVACY]: false,
  [TermsKey.LOCATION]: false,
};

const useTermsAgreementStore = create<TermsAgreementState>((set) => ({
  checked: initialChecked,
  locationError: null,

  setChecked: (key, value) => set((s) => ({ checked: { ...s.checked, [key]: value } })),

  toggleChecked: (key) => set((s) => ({ checked: { ...s.checked, [key]: !s.checked[key] } })),

  setAll: (value) =>
    set({
      checked: Object.fromEntries(Object.keys(initialChecked).map((k) => [k, value])) as CheckedMap,
    }),

  reset: () => set({ checked: initialChecked }),

  setLocationError: (msg) => set({ locationError: msg }),
}));

export default useTermsAgreementStore;
