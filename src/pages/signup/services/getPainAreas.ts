import { api } from "@/utils/api/api";

export interface PainArea {
  painAreaID: number;
  name: string;
}

export interface GetPainAreasResponse {
  painAreas: PainArea[];
}

export const getPainAreas = () => {
  return api.get<GetPainAreasResponse>("/pain-areas");
};
