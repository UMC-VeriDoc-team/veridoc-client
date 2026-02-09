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

  // derived (선택)
  isLoggedIn: () => boolean;

  // actions
  login: (payload: { email: string; password: string }) => Promise<LoginResult>;
  logout: () => void;

  fetchMe: () => Promise<boolean>;
  resetMe: () => void;

  setPainAreaID: (id: number | null) => void;
  fetchAgreement: () => Promise<boolean>;

  initAuth: () => Promise<void>;
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

  isLoggedIn: () => get().authStatus === "authenticated",

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

  fetchMe: async () => {
    const token = get().accessToken;
    if (!token) {
      get().resetMe();
      return false;
    }

    try {
      const dto = await getUserData();
      const mapped = mapUserMeToState(dto);

      set({
        ...mapped,
      });

      return true;
    } catch (e) {
      const status = (e as any)?.response?.status;
      if (status === 401 || status === 403) {
        get().logout();
      } else {
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
        authStatus: "authenticated",
      });

      await get().fetchMe();
      await get().fetchAgreement();

      return { ok: true };
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
    set({ authStatus: "unknown" });

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

    set({ accessToken: token });

    const ok = await get().fetchMe();
    if (!ok) {
      set({ authStatus: "unauthenticated" });
      return;
    }

    set({ authStatus: "authenticated" });
    await get().fetchAgreement();
  },
}));
