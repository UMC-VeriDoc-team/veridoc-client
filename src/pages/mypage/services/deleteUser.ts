import { authApiWrapper } from "@/utils/api/api";

export interface DeleteAccountResponse {
  code: number;
  message: string;
  data: object;
}

// 회원탈퇴
const deleteUser = async (): Promise<DeleteAccountResponse> => {
  const response = await authApiWrapper.delete<DeleteAccountResponse>("/users/me");
  return response.data;
};

export default deleteUser;
