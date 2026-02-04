import { api } from "@/utils/api/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number; // 200
  message: string;
  data: {
    userID: number;
    accessToken: string;
  };
}

export const postLogin = (payload: LoginPayload) => {
  return api.post<LoginResponse>("/users/login", payload);
};
