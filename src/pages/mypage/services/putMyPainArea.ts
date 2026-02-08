import { authApiWrapper } from "@/utils/api/api";

export type PatchMyPainAreaRequest = {
  painAreaID: number;
};

export type PatchMyPainAreaResponse = {
  painAreaID: number;
  name: string;
};

export const putMyPainArea = async (payload: PatchMyPainAreaRequest) => {
  return await authApiWrapper.put<PatchMyPainAreaResponse>("/users/me/pain-area", payload);
};
