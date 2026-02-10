import { create } from "zustand";
import type { AxiosError } from "axios";

import { postLogin } from "@/pages/login/services/postLogin";
import getUserData from "@/pages/login/services/getUserData";
import type { GetUserDataResponse } from "@/pages/login/services/getUserData";
import type { Gender } from "@/components/Select/GenderSelect";
import getAgreementStatus, {
  normalizeAgreement,
} from "@/components/Modal/services/getAgreementStatus";
import deleteUser from "@/pages/mypage/services/deleteUser";

type LoginFailReason = "INVALID" | "UNKNOWN";
type LoginResult = { ok: true } | { ok: false; reason: LoginFailReason };
type LoginErrorBody = { code?: string };

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

  initAuth: () => Promise<void>;

  withdraw: () => Promise<{
    ok: boolean;
    message?: string;
    error?: any;
  }>;
}

const getAxiosStatus = (error: unknown): number | undefined => {
  if (error instanceof Error && "isAxiosError" in error) {
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

  // 성공 여부 반환
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

      // 토큰이 만료/무효면 즉시 로그아웃 처리
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
        authStatus: "unknown", // 검증 전
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

    // 토큰 미보유
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
    } catch (error: any) {
      set({ loading: false });
      // 에러 객체에 담긴 실제 메시지를 반환하거나 로깅
      return {
        ok: false,
        error: error,
        message: error.response?.data?.message || "서버 오류",
      };
    }
  },
}));
