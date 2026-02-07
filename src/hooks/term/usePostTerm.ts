import { postTerm } from "@/components/Modal/services/postTerm";
import type { PostTermRequest, PostTermResponse } from "@/components/Modal/types/terms";
import type { ApiError, ApiErrorBody } from "@/types/error";
import { useMutation } from "@tanstack/react-query";

/** 약관 동의 API 전송 훅 (usePostTerm). Zustand 대신 이 훅으로 전송 처리 */
export const usePostTerm = () => {
  return useMutation<PostTermResponse, ApiError<ApiErrorBody>, PostTermRequest>({
    mutationFn: (data: PostTermRequest): Promise<PostTermResponse> => postTerm(data),
    onSuccess: () => {
      console.log("약관 동의 성공");
    },
    onError: () => {
      console.error("약관 동의 실패");
    },
  });
};
