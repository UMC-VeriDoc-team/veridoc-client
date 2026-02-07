import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  userID: number | null;

  setUserID: (userID: number | null) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userID: null,

      setUserID: (userID) => set({ userID }),
      resetUser: () => set({ userID: null }),
    }),
    {
      name: "user-store",
    }
  )
);
