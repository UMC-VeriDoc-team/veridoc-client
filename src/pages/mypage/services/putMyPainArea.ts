import { authApiWrapper } from "@/utils/api/api";

export type PatchMyPainAreaRequest = {
  painAreaID: number;
};

export type PatchMyPainAreaResponse = {
  painAreaID: number;
  name: string;
};

// 내 증상 부위 수정
const putMyPainArea = async (payload: PatchMyPainAreaRequest) => {
  return await authApiWrapper.put<PatchMyPainAreaResponse>("/users/me/pain-area", payload);
};

export default putMyPainArea;
