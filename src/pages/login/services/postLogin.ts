import { api } from "@/utils/api/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  userID: number;
  accessToken: string;
}

// 사용자 로그인
const postLogin = async (payload: LoginPayload) => {
  const res = await api.post<LoginData>("/users/login", payload);

  return res.data;
};

export default postLogin;
