import { authApiWrapper } from "@/utils/api/api";

export interface GuideValidateRequest {
  fromStep: number;
  toStep: number;
}

export interface GuideValidateData {
  canMove: boolean;
}

// 단계 전환 가능 여부 검증 (트리거 관리)
const postGuideStepValidate = async (
  painAreaId: string | number,
  steps: GuideValidateRequest
): Promise<GuideValidateData> => {
  const res = await authApiWrapper.post<GuideValidateData>(
    `/symptoms/${painAreaId}/guide/validate`,
    steps
  );

  return res.data;
};

export default postGuideStepValidate;
