import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postLogin, type LoginPayload } from "@/pages/login/services/postLogin";
import { useUserStore } from "../user/useUserStore";

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;

  setAccessToken: (token: string | null) => void;
  login: (
    payload: LoginPayload
  ) => Promise<
    | { ok: true; data: { userID: number; accessToken: string } }
    | { ok: false; reason: "INVALID" | "UNKNOWN" }
  >;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isLoggedIn: false,
      loading: false,

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: Boolean(token),
        }),

      login: async (payload) => {
        set({ loading: true });
        try {
          const data = await postLogin(payload);

          // auth 저장
          get().setAccessToken(data.accessToken);

          // user 저장
          useUserStore.getState().setUserID(data.userID);

          return { ok: true as const, data };
        } catch (e: any) {
          const status = e?.response?.status;
          if (status === 400 || status === 401) {
            return { ok: false as const, reason: "INVALID" as const };
          }
          return { ok: false as const, reason: "UNKNOWN" as const };
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        // auth 초기화
        set({ accessToken: null, isLoggedIn: false });

        // user 초기화
        useUserStore.getState().resetUser();
      },
    }),
    {
      name: "auth-store",
      // persist된 값에서 복원될 때 isLoggedIn 동기화
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.isLoggedIn = Boolean(state.accessToken);
      },
    }
  )
);
