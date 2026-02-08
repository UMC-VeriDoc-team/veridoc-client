import { authApiWrapper } from "@/utils/api/api";

export type PutMyPasswordBody = {
  currentPassword: string;
  newPassword: string;
};

export type PutMyPasswordResponse = {
  code: number;
  message: string;
  data: null;
  errorCode?: string;
};

export const putMyPassword = async (body: PutMyPasswordBody) => {
  return await authApiWrapper.put<PutMyPasswordResponse>("/users/me/password", body);
};
