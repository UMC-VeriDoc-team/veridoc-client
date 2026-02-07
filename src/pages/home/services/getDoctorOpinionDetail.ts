import type { GetDoctorOpinionDetailResponse } from "@/types/homeDoctorOpinion";
import { authApiWrapper } from "@/utils/api/api";

interface GetDoctorOpinionDetail {
  answerId: number;
}

// 전문의 답변 상세 조회
const getDoctorOpinionDetail = async ({
  answerId,
}: GetDoctorOpinionDetail): Promise<GetDoctorOpinionDetailResponse> => {
  const res = await authApiWrapper.get<GetDoctorOpinionDetailResponse>(
    `/doctor-answers/${answerId}`
  );

  return res.data;
};

export default getDoctorOpinionDetail;
