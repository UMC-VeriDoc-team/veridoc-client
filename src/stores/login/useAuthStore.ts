import { create } from "zustand";
import type { AxiosError } from "axios";
import { postLogin } from "@/pages/login/services/postLogin";

type LoginFailReason = "INVALID" | "UNKNOWN";

type LoginResult = { ok: true } | { ok: false; reason: LoginFailReason };

type LoginErrorBody = {
  code?: string;
};

interface AuthState {
  accessToken: string | null;
  userID: number | null;
  painAreaID: number | null;

  isLoggedIn: boolean;
  loading: boolean;

  login: (payload: { email: string; password: string }) => Promise<LoginResult>;

  logout: () => void;
  setPainAreaID: (id: number | null) => void;
}

const getAxiosStatus = (error: unknown): number | undefined => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<LoginErrorBody>;
    return axiosError.response?.status;
  }
  return undefined;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  userID: null,
  painAreaID: 1, // 임시

  isLoggedIn: Boolean(localStorage.getItem("accessToken")),
  loading: false,

  login: async (payload) => {
    set({ loading: true });
    try {
      const data = await postLogin(payload);

      localStorage.setItem("accessToken", data.accessToken);

      set({
        accessToken: data.accessToken,
        userID: data.userID,
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
      userID: null,
      painAreaID: null,
      isLoggedIn: false,
    });
  },

  setPainAreaID: (id) => set({ painAreaID: id }),
}));
