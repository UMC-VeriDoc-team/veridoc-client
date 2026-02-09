import { authApiWrapper } from "@/utils/api/api";

// 각 단계에 대한 타입
export interface StepData {
  step: number;
  title: string;
  subtitle: string;
  caption: string;
  description: string;
  imageUrl: string;
}

// 사용자의 현재 진행 상태에 대한 타입
export interface UserProgress {
  currentStep: number;
  lastVisitedAt: string; // ISO 8601
}

export interface SymptomGuideData {
  painAreaId: number;
  steps: StepData[];
  userProgress: UserProgress | null; // 첫 방문 시 null
}

// 증상별 가이드 4단계 전체 조회
const getSymptomGuide = async (painAreaId: string | number): Promise<SymptomGuideData> => {
  const res = await authApiWrapper.get<SymptomGuideData>(`/symptoms/${painAreaId}/guide`);

  return res.data;
};

export default getSymptomGuide;
