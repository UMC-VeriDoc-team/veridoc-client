import { api } from "@/utils/api/api";

// 비밀번호 재설정 이메일 전송
const postForgotPassword = async (email: string) => {
  return api.post("/users/forgot-password", {
    email,
  });
};

export default postForgotPassword;
