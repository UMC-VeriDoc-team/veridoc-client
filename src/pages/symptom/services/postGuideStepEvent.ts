import { authApiWrapper } from "@/utils/api/api";

export type GuideEventType = "DOCTOR_OPINION_VIEWED" | "TREATMENT_INFO_VIEWED";

export interface GuideEventRequest {
  event: GuideEventType;
}

export interface GuideEventData {
  painAreaId: number;
  event: GuideEventType;
  recordedAt: string; // ISO 8601
}

// 사용자 행동 이벤트 기록 (트리거 해제용)
const postGuideStepEvent = async (
  painAreaId: string | number,
  event: GuideEventType
): Promise<GuideEventData> => {
  const res = await authApiWrapper.post<GuideEventData>(`/symptoms/${painAreaId}/guide/events`, {
    event,
  });

  return res.data;
};

export default postGuideStepEvent;
