import type { GetNearbyHospitalResponse } from "@/pages/home/types/homeMapHospital";
import { api } from "@/utils/api/api";

interface GetNearbyHospitalParams {
  lat: number;
  lng: number;
  painAreaId: number;
  limit: number;
}

// 근처 병원 정보 조회
const getNearbyHospital = async ({
  lat,
  lng,
  painAreaId,
  limit,
}: GetNearbyHospitalParams): Promise<GetNearbyHospitalResponse> => {
  const res = await api.get<GetNearbyHospitalResponse>("/hospital/nearby", {
    params: {
      lat,
      lng,
      painAreaId,
      limit,
    },
  });

  return res.data;
};

export default getNearbyHospital;
