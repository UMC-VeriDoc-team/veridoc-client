import { authApiWrapper } from "@/utils/api/api";

export interface GetDoctorOpinionSummaryResponse {
  answerId: number;
  painAreaId: number;
  painAreaName: string;
  symptomId: number;
  symptomName: string;
  summary: string;
  updatedAt: string;
}

// 전문의 소견 요약본 조회
const getDoctorOpinionSummary = async (answerId: string | number) => {
  const res = await authApiWrapper.get<GetDoctorOpinionSummaryResponse>(
    `/expert-answers/${answerId}/summary`
  );

  return res.data;
};

export default getDoctorOpinionSummary;
