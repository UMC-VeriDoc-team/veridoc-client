import { authApiWrapper } from "@/utils/api/api";
import type { TemporaryGuideDetail } from "@/components/Modal/types/temporaryGuide";

// 임시대처방안 상세 조회
const getTemporaryGuideDetail = async (guideId: number) => {
  return await authApiWrapper.get<TemporaryGuideDetail>(`/temporary-guides/${guideId}`);
};

export default getTemporaryGuideDetail;
