import { api } from "@/utils/api/api";

export interface UsageGuide {
  cardNumber: number;
  guideId: number;
  sourceUrl: string;
}

export interface GetUsageGuideResponse {
  guides: UsageGuide[];
}

// 범용가이드 조회
const getUsageGuide = async () => {
  const res = await api.get<GetUsageGuideResponse>("/usage-guides");

  return res.data;
};

export default getUsageGuide;
