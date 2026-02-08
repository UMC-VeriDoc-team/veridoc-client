import { authApiWrapper } from "./api";
import type { DeleteAccountResponse } from "@/components/Modal/types/deleteAccount";

export const accountApi = {
  /**
   * 회원탈퇴 API (DELETE /users/me)
   * 스웨거 명세서에 맞춰 인증 정보(토큰)를 포함한 삭제 요청을 보냅니다.
   */
  deleteAccount: async (): Promise<DeleteAccountResponse> => {
    // 1. 엔드포인트는 스웨거와 동일한 /users/me 입니다.
    // 2. 인증이 필수이므로 authApiWrapper.delete를 사용합니다.
    const response = await authApiWrapper.delete<DeleteAccountResponse>("/users/me");
    return response.data;
  },
};
