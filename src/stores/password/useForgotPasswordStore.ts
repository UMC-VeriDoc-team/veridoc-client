import { create } from "zustand";
import postForgotPassword from "@/pages/password/services/postForgotPassword";
import axios from "axios";
import toast from "react-hot-toast";

type ForgotPasswordState = {
  email: string;
  loading: boolean;
  error: string | null;

  setEmail: (email: string) => void;
  sendMail: () => Promise<boolean>;
  resendMail: () => Promise<boolean>;
  reset: () => void;
};

export const useForgotPasswordStore = create<ForgotPasswordState>((set, get) => ({
  email: "",
  loading: false,
  error: null,

  setEmail: (email) => set({ email }),

  sendMail: async () => {
    const email = get().email.trim();
    if (!email) {
      set({ error: "이메일이 비어있어요." });
      return false;
    }

    set({ loading: true, error: null });

    try {
      await postForgotPassword(email);
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("가입되지 않은 이메일입니다.");
      }
      set({ error: "가입되지 않은 이메일입니다." });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  resendMail: async () => {
    return await get().sendMail();
  },

  reset: () => set({ email: "", loading: false, error: null }),
}));
