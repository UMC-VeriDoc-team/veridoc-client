import { create } from "zustand";
import type { AxiosError } from "axios";

import { postLogin } from "@/pages/login/services/postLogin";
import getUserData from "@/pages/login/services/getUserData";
import type { GetUserDataResponse } from "@/pages/login/services/getUserData";
import type { Gender } from "@/components/Select/GenderSelect";
import getAgreementStatus, {
  normalizeAgreement,
} from "@/components/Modal/services/getAgreementStatus";

type LoginFailReason = "INVALID" | "UNKNOWN";
type LoginResult = { ok: true } | { ok: false; reason: LoginFailReason };

type LoginErrorBody = { code?: string };

interface AuthState {
  // auth
  accessToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;

  // term
  hasAgreedTerms: boolean | null;
  needsAgreementModal: boolean;

  // user
  userID: number | null;
  name: string | null;
  email: string | null;
  birth: string | null;
  gender: Gender | null;

  painAreaID: number | null;
  painAreaName: string | null;

  // actions
  login: (payload: { email: string; password: string }) => Promise<LoginResult>;
  logout: () => void;

  fetchMe: () => Promise<void>;
  resetMe: () => void;

  setPainAreaID: (id: number | null) => void;

  fetchAgreement: () => Promise<boolean>;

  // 앱 시작 시 토큰 기반 초기화
  initAuth: () => Promise<void>;
}

const getAxiosStatus = (error: unknown): number | undefined => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<LoginErrorBody>;
    return axiosError.response?.status;
  }
  return undefined;
};

const mapUserMeToState = (dto: GetUserDataResponse) => {
  return {
    userID: dto.user_id ?? null,
    name: dto.name ?? null,
    email: dto.email ?? null,
    birth: dto.birth ?? null,
    gender: (dto.gender ?? null) as Gender | null,
    painAreaID: dto.painAreaID ?? null,
  };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  isLoggedIn: Boolean(localStorage.getItem("accessToken")),
  loading: false,

  hasAgreedTerms: null,
  needsAgreementModal: false,

  userID: null,
  name: null,
  email: null,
  birth: null,
  gender: null,
  painAreaID: null,
  painAreaName: null,

  resetMe: () =>
    set({
      userID: null,
      name: null,
      email: null,
      birth: null,
      gender: null,
      painAreaID: null,
      painAreaName: null,
    }),

  fetchAgreement: async () => {
    const token = get().accessToken;

    if (!token) {
      set({ hasAgreedTerms: null, needsAgreementModal: false });
      return false;
    }

    try {
      const res = await getAgreementStatus();
      const agreed = normalizeAgreement(res);

      set({
        hasAgreedTerms: agreed,
        needsAgreementModal: !agreed,
      });

      return agreed;
    } catch {
      console.log("약관 동의 현황 조회 실패");
      set({ hasAgreedTerms: false, needsAgreementModal: true });
      return false;
    }
  },

  fetchMe: async () => {
    if (!get().accessToken) {
      set({ isLoggedIn: false });
      get().resetMe();
      return;
    }

    try {
      const dto = await getUserData();
      const mapped = mapUserMeToState(dto);

      set({
        ...mapped,
        isLoggedIn: true,
      });
    } catch {
      get().resetMe();
    }
  },

  login: async (payload) => {
    set({ loading: true, needsAgreementModal: false });

    try {
      const data = await postLogin(payload);

      localStorage.setItem("accessToken", data.accessToken);

      set({
        accessToken: data.accessToken,
        isLoggedIn: true,
      });

      return { ok: true };
    } catch (error: unknown) {
      const status = getAxiosStatus(error);

      if (status === 400 || status === 401) {
        return { ok: false, reason: "INVALID" };
      }
      return { ok: false, reason: "UNKNOWN" };
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      accessToken: null,
      isLoggedIn: false,
      loading: false,
      hasAgreedTerms: null,
      needsAgreementModal: false,
    });
    get().resetMe();
  },

  setPainAreaID: (id) =>
    set({
      painAreaID: id,
    }),

  initAuth: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({
        accessToken: null,
        isLoggedIn: false,
        hasAgreedTerms: null,
        needsAgreementModal: false,
      });
      get().resetMe();
      return;
    }

    set({ accessToken: token, isLoggedIn: true });

    // 내 정보
    await get().fetchMe();

    // 약관 체크
    await get().fetchAgreement();
  },
}));
