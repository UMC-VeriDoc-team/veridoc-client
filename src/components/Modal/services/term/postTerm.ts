import type { PostTermRequest, PostTermResponse } from "@/components/Modal/types/terms";
import { authApiWrapper } from "@/utils/api/api";

/** 약관 동의 API 호출 (usePostTerm에서 사용). 백엔드가 { code, data } 래핑 여부와 관계없이 payload 반환 */
export const postTerm = async (data: PostTermRequest): Promise<PostTermResponse> => {
  const response = await authApiWrapper.post<PostTermResponse>("/agreements", data);

  return response.data;
};
