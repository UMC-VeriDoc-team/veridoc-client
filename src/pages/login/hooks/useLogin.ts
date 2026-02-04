import { useState } from "react";
import { postLogin, type LoginPayload } from "../services/postLogin";

// INVALID: 400/401 에러, UNKNOWN: 그 외 에러
type LoginResult = { ok: true } | { ok: false; reason: "INVALID" | "UNKNOWN" };

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (payload: LoginPayload): Promise<LoginResult> => {
    setLoading(true);

    try {
      const res = await postLogin(payload);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userID", String(res.data.userID));

      return { ok: true };
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 400 || status === 401) return { ok: false, reason: "INVALID" };
      return { ok: false, reason: "UNKNOWN" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
