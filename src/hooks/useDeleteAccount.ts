import { useMutation } from "@tanstack/react-query";
import type { DeleteAccountResponse } from "@/components/Modal/types/deleteAccount";
import type { ApiError, ApiErrorBody } from "@/types/error";
import { deleteUser } from "@/pages/mypage/services/deleteUser";

export const useDeleteAccount = () => {
  return useMutation<DeleteAccountResponse, ApiError<ApiErrorBody>, void>({
    mutationFn: (): Promise<DeleteAccountResponse> => deleteUser.deleteAccount(),

    onSuccess: (data: DeleteAccountResponse) => {
      console.log("회원탈퇴 성공:", data);

      // 로컬 스토리지의 인증 토큰 삭제
      localStorage.removeItem("accessToken");
    },

    onError: (error: ApiError<ApiErrorBody>) => {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
