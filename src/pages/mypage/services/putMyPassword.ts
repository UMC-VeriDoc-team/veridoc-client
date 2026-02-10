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

// 마이페이지 내 비밀번호 변경
const putMyPassword = async (body: PutMyPasswordBody) => {
  return await authApiWrapper.put<PutMyPasswordResponse>("/users/me/password", body);
};

export default putMyPassword;
