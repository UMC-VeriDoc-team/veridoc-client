import type { DeleteAccountResponse } from "@/components/Modal/types/deleteAccount";
import { authApiWrapper } from "@/utils/api/api";

// 회원탈퇴
const deleteUser = async (): Promise<DeleteAccountResponse> => {
  const response = await authApiWrapper.delete<DeleteAccountResponse>("/users/me");
  return response.data;
};

export default deleteUser;
