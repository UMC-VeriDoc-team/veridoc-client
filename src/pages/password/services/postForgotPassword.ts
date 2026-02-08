import { api } from "@/utils/api/api";

interface ForgotPasswordRequest {
  email: string;
}

// 비밀번호 재설정 이메일 전송
const postForgotPassword = async ({ email }: ForgotPasswordRequest) => {
  return api.post("/users/forgot-password", {
    email,
  });
};

export default postForgotPassword;
