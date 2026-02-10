import { authApiWrapper } from "@/utils/api/api";
import type { TemporaryGuideDetail } from "@/components/Modal/types/temporaryGuide";

export const getTemporaryGuideDetail = async (guideId: number) => {
  return await authApiWrapper.get<TemporaryGuideDetail>(`/temporary-guides/${guideId}`);
};
