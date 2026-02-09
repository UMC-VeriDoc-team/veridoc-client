import type { DeleteAccountResponse } from "@/components/Modal/types/deleteAccount";
import { authApiWrapper } from "@/utils/api/api";

// 회원탈퇴
export const deleteUser = {
  deleteAccount: async (): Promise<DeleteAccountResponse> => {
    const response = await authApiWrapper.delete<DeleteAccountResponse>("/users/me");
    return response.data;
  },
};
