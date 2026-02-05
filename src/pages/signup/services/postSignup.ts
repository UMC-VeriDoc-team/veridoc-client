import { api } from "@/utils/api/api";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  birthDate: string; // "YYYY-MM-DD"
  gender: "M" | "F";
  painAreaID?: number | null;
}

export interface SignupResponse {
  code: number; // 201
  message: string;
  data: {
    userID: number;
    email: string;
  };
}

export const postSignup = (payload: SignupPayload) => {
  return api.post<SignupResponse>("/users/signup", payload);
};
