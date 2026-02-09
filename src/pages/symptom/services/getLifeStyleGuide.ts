import { authApiWrapper } from "@/utils/api/api";
import type { LifeStyleGuideData } from "@/types/symptom";

export const getLifeStyleGuide = async (painAreaId: number) => {
  const response = await authApiWrapper.get<LifeStyleGuideData>(
    `/symptoms/${painAreaId}/lifestyle-videos`
  );
  return response;
};
