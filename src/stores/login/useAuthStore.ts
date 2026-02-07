import { create } from "zustand";
import { postLogin } from "@/pages/login/services/postLogin";

interface AuthState {
  accessToken: string | null;
  userID: number | null;
  painAreaID: number | null;

  isLoggedIn: boolean;
  loading: boolean;

  login: (payload: {
    email: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; reason: "INVALID" | "UNKNOWN" }>;

  logout: () => void;
  setPainAreaID: (id: number | null) => void;
}

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
    } catch (e: any) {
      const status = e?.response?.status;
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
