import { authApiWrapper } from "@/utils/api/api";
import type { LifeStyleGuideData } from "@/types/symptom";

export const getLifeStyleGuide = async (painAreaId: number) => {
  const response = await authApiWrapper.get<LifeStyleGuideData>(`/lifestyle-videos/${painAreaId}`);
  return response;
};
