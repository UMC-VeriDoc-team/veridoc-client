import { api } from "@/utils/api/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  userID: number;
  accessToken: string;
}

export const postLogin = async (payload: LoginPayload) => {
  const res = await api.post<LoginData>("/users/login", payload);

  return res.data;
};
