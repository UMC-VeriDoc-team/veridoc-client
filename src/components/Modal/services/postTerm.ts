import type { PostTermRequest, PostTermResponse } from "@/components/Modal/types/terms";
import { authApiWrapper } from "@/utils/api/api";

// 약관 동의 API 호출
const postTerm = async (data: PostTermRequest): Promise<PostTermResponse> => {
  const response = await authApiWrapper.post<PostTermResponse>("/agreements", data);

  return response.data;
};

export default postTerm;
