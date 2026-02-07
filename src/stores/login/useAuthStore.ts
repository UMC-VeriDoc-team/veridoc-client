import { create } from "zustand";
import type { AxiosError } from "axios";

import { postLogin } from "@/pages/login/services/postLogin";
import getUserData from "@/pages/login/services/getUserData";
import type { GetUserDataResponse } from "@/pages/login/services/getUserData";
import type { Gender } from "@/components/Select/GenderSelect";

type LoginFailReason = "INVALID" | "UNKNOWN";
type LoginResult = { ok: true } | { ok: false; reason: LoginFailReason };

type LoginErrorBody = { code?: string };

interface AuthState {
  // auth
  accessToken: string | null;

  isLoggedIn: boolean;
  loading: boolean;

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
  const firstPainArea = dto.user_pain_areas?.[0]?.pain_areas ?? null;

  return {
    userID: dto.user_id ?? null,
    name: dto.name ?? null,
    email: dto.email ?? null,
    birth: dto.birth ?? null,
    gender: (dto.gender ?? null) as Gender | null,
    painAreaID: firstPainArea?.pain_area_id ?? null,
    painAreaName: firstPainArea?.name ?? null,
  };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken"),
  isLoggedIn: Boolean(localStorage.getItem("accessToken")),
  loading: false,

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

  fetchMe: async () => {
    // 토큰 없으면 호출하지 않음
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
      // 토큰이 있는데 me 실패 → 정책은 팀 기준에 맞춰 선택
      // 1) 만료로 간주하고 logout
      // 2) 로그인 유지 + user 비움
      // 여기선 "유저만 비움"으로 둠
      get().resetMe();
    }
  },

  login: async (payload) => {
    set({ loading: true });
    try {
      const data = await postLogin(payload);

      localStorage.setItem("accessToken", data.accessToken);

      set({
        accessToken: data.accessToken,
        isLoggedIn: true,
      });

      // 로그인 직후 내 정보 조회
      await get().fetchMe();

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
    });
    get().resetMe();
  },

  setPainAreaID: (id) => set({ painAreaID: id }),

  initAuth: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ accessToken: null, isLoggedIn: false });
      get().resetMe();
      return;
    }

    set({ accessToken: token, isLoggedIn: true });
    await get().fetchMe();
  },
}));
