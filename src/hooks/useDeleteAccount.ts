import { useMutation } from "@tanstack/react-query";
import { accountApi } from "@/utils/api/account";
import type { DeleteAccountResponse } from "@/components/Modal/types/deleteAccount";
import type { ApiError, ApiErrorBody } from "@/types/error";

/** 회원탈퇴 API 전송 훅 (useDeleteAccount) */
export const useDeleteAccount = () => {
  return useMutation<DeleteAccountResponse, ApiError<ApiErrorBody>, void>({
    // 회원탈퇴는 전송할 data(Request Body)가 없으므로 제네릭 세 번째 인자를 void로 지정합니다.
    mutationFn: (): Promise<DeleteAccountResponse> => accountApi.deleteAccount(),

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
