import { authApiWrapper } from "@/utils/api/api";

export interface GuideResetData {
  painAreaId: number;
  progress: {
    currentStep: number;
    resetAt: string; // ISO 8601
  };
}

// 증상 가이드 초기화
const postGuideStepReset = async (painAreaId: string | number): Promise<GuideResetData> => {
  const res = await authApiWrapper.post<GuideResetData>(`/symptoms/${painAreaId}/guide/reset`);

  return res.data;
};

export default postGuideStepReset;
