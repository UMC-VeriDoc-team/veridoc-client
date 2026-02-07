import { authApiWrapper } from "@/utils/api/api";
import type { GetHomeResponse } from "../types/home";

// 홈 전체 데이터 조회 (전문의 소견 요약 / 지도 제외)
const getHomeData = async () => {
  const res = await authApiWrapper.get<GetHomeResponse>("/homes");

  return res.data;
};

export default getHomeData;
