import { api } from "@/utils/api/api";

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// 비밀번호 재설정 (로그인X)
const postResetPassword = async (payload: ResetPasswordPayload) => {
  return api.post("/users/reset-password", payload);
};

export default postResetPassword;
