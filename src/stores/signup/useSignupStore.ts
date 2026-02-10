import { create } from "zustand";
import axios, { AxiosError } from "axios";
import {
  postSignup,
  type SignupPayload,
  type SignupResponse,
} from "@/pages/signup/services/postSignup";

type FieldKey = "name" | "email" | "password" | "birth" | "gender" | "painAreaID";
type FieldErrors = Partial<Record<FieldKey, string>>;

interface SignupState {
  // 증상 선택 상태
  selectedKey: string | null;
  selectedPainAreaID: number | null;

  // 회원가입 프로세스 상태
  loading: boolean;
  fieldErrors: FieldErrors;
  formError: string;

  // Actions
  setSelectedSymptom: (key: string | null, painAreaID: number | null) => void;
  resetSelectedSymptom: () => void;
  clearFieldError: (key: FieldKey) => void;
  resetErrors: () => void;
  resetAll: () => void;

  signup: (payload: SignupPayload) => Promise<SignupResponse>;
}

export const useSignupStore = create<SignupState>((set) => ({
  selectedKey: null,
  selectedPainAreaID: null,
  loading: false,
  fieldErrors: {},
  formError: "",

  setSelectedSymptom: (key, painAreaID) =>
    set({ selectedKey: key, selectedPainAreaID: painAreaID }),

  resetSelectedSymptom: () => set({ selectedKey: null, selectedPainAreaID: null }),

  clearFieldError: (key) =>
    set((state) => {
      const nextFieldErrors = { ...state.fieldErrors };
      delete nextFieldErrors[key];
      return { fieldErrors: nextFieldErrors };
    }),

  resetErrors: () => set({ fieldErrors: {}, formError: "" }),

  resetAll: () =>
    set({
      selectedKey: null,
      selectedPainAreaID: null,
      loading: false,
      fieldErrors: {},
      formError: "",
    }),

  signup: async (payload: SignupPayload) => {
    set({ loading: true, fieldErrors: {}, formError: "" });

    try {
      const response = await postSignup(payload);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ code?: string }>;
        const status = axiosError.response?.status;
        const code = axiosError.response?.data?.code;

        if (status === 409 || code === "EMAIL_ALREADY_EXISTS") {
          set({ fieldErrors: { email: "이미 가입된 이메일 주소입니다." } });
        } else if (status === 400) {
          switch (code) {
            case "INVALID_EMAIL_FORMAT":
              set({ fieldErrors: { email: "이메일 형식이 올바르지 않습니다." } });
              break;
            case "INVALID_PASSWORD_FORMAT":
              set({ fieldErrors: { password: "비밀번호 형식이 올바르지 않습니다." } });
              break;
            case "INVALID_BIRTHDATE_FORMAT":
              set({ fieldErrors: { birth: "생년월일 형식이 올바르지 않습니다." } });
              break;
            default:
              set({ formError: "입력값을 다시 확인해주세요." });
          }
        } else {
          set({ formError: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요." });
        }
      } else {
        set({ formError: "알 수 없는 에러가 발생했습니다." });
      }
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
