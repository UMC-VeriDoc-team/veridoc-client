import type { OpinionDetail } from "@/pages/home/types/homeDoctorOpinion";
import { authApiWrapper } from "@/utils/api/api";

interface GetDoctorOpinionDetail {
  answerId: number;
}

// 전문의 답변 상세 조회
const GetDoctorOpinionDetail = async ({
  answerId,
}: GetDoctorOpinionDetail): Promise<OpinionDetail> => {
  const res = await authApiWrapper.get<OpinionDetail>(`/expert-answers/${answerId}`);

  return res.data;
};

export default GetDoctorOpinionDetail;
