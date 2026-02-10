import { create } from "zustand";
import type { AxiosError } from "axios";

import { postLogin } from "@/pages/login/services/postLogin";
import getUserData from "@/pages/login/services/getUserData";
import type { GetUserDataResponse } from "@/pages/login/services/getUserData";
import type { Gender } from "@/components/Select/GenderSelect";
import getAgreementStatus, {
  normalizeAgreement,
} from "@/components/Modal/services/getAgreementStatus";
import type { PostTermRequest } from "@/components/Modal/types/terms";
import type { ActionResult, ApiError } from "@/types/error";
import deleteUser from "@/pages/mypage/services/deleteUser";
import postTerm from "@/components/Modal/services/postTerm";

type LoginFailReason = "INVALID" | "UNKNOWN";
type LoginResult = { ok: true } | { ok: false; reason: LoginFailReason };
type LoginErrorBody = { code?: string; message?: string };
type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

interface AuthState {
  // auth
  accessToken: string | null;
  authStatus: AuthStatus;
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

  fetchMe: () => Promise<boolean>;
  resetMe: () => void;

  setPainAreaID: (id: number | null) => void;

  fetchAgreement: () => Promise<boolean>;
  submitTerms: (payload: PostTermRequest) => Promise<ActionResult>;

  initAuth: () => Promise<void>;

  withdraw: () => Promise<ActionResult>;
}

const getErrorMessage = (error: unknown, defaultMsg: string): string => {
  if (error instanceof Error && (error as ApiError).isAxiosError) {
    const axiosError = error as AxiosError<LoginErrorBody>;
    return axiosError.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

const getAxiosStatus = (error: unknown): number | undefined => {
  if (error instanceof Error && (error as ApiError).isAxiosError) {
    const axiosError = error as AxiosError<LoginErrorBody>;
    return axiosError.response?.status;
  }
  return undefined;
};

const mapUserMeToState = (dto: GetUserDataResponse) => ({
  userID: dto.user_id ?? null,
  name: dto.name ?? null,
  email: dto.email ?? null,
  birth: dto.birth ?? null,
  gender: (dto.gender ?? null) as Gender | null,
  painAreaID: dto.painAreaID ?? null,
});

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  authStatus: "unknown",
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
      set({ hasAgreedTerms: false, needsAgreementModal: true });
      return false;
    }
  },

  submitTerms: async (payload) => {
    set({ loading: true });
    try {
      await postTerm(payload);
      const { fetchAgreement } = get();
      if (fetchAgreement) await fetchAgreement();

      set({ loading: false });
      return { ok: true };
    } catch (error: unknown) {
      set({ loading: false });
      return {
        ok: false,
        error,
        message: getErrorMessage(error, "약관 동의 처리 중 오류가 발생했습니다."),
      };
    }
  },

  fetchMe: async () => {
    const token = get().accessToken;
    if (!token) {
      get().resetMe();
      return false;
    }

    try {
      const dto = await getUserData();
      const mapped = mapUserMeToState(dto);
      set(mapped);
      return true;
    } catch (e) {
      const status = getAxiosStatus(e);

      if (status === 401) {
        localStorage.removeItem("accessToken");
        set({
          accessToken: null,
          authStatus: "unauthenticated",
          hasAgreedTerms: null,
          needsAgreementModal: false,
        });
        get().resetMe();
      }

      return false;
    }
  },

  login: async (payload) => {
    set({ loading: true, needsAgreementModal: false });

    try {
      const data = await postLogin(payload);
      localStorage.setItem("accessToken", data.accessToken);

      set({
        accessToken: data.accessToken,
        authStatus: "unknown",
      });

      // 로그인 직후 검증/초기화
      await get().initAuth();

      return get().authStatus === "authenticated" ? { ok: true } : { ok: false, reason: "UNKNOWN" };
    } catch (error: unknown) {
      const status = getAxiosStatus(error);
      if (status === 400 || status === 401) return { ok: false, reason: "INVALID" };
      return { ok: false, reason: "UNKNOWN" };
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      accessToken: null,
      authStatus: "unauthenticated",
      loading: false,
      hasAgreedTerms: null,
      needsAgreementModal: false,
    });
    get().resetMe();
  },

  setPainAreaID: (id) => set({ painAreaID: id }),

  initAuth: async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      set({
        accessToken: null,
        authStatus: "unauthenticated",
        hasAgreedTerms: null,
        needsAgreementModal: false,
      });
      get().resetMe();
      return;
    }

    // 토큰 O, 아직 검증 전
    set({ accessToken: token, authStatus: "unknown" });

    // 서버로 내 정보 검증
    const okMe = await get().fetchMe();
    if (!okMe) {
      if (get().authStatus === "unknown") {
        get().logout();
      }
      return;
    }

    // 인증 확정
    set({ authStatus: "authenticated" });

    // 약관 체크
    await get().fetchAgreement();
  },

  withdraw: async () => {
    set({ loading: true });
    try {
      await deleteUser();
      localStorage.removeItem("accessToken");
      set({ authStatus: "unauthenticated", loading: false });
      return { ok: true };
    } catch (error: unknown) {
      set({ loading: false });
      return {
        ok: false,
        error,
        message: getErrorMessage(error, "회원탈퇴 처리 중 오류가 발생했습니다."),
      };
    }
  },
}));
