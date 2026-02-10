import { api } from "@/utils/api/api";

// 서버 응답
export interface PainAreaApi {
  pain_area_id: number;
  name: string;
}

export interface PainArea {
  painAreaID: number;
  name: string;
}

export interface GetPainAreasResponse {
  painAreas: PainArea[];
}

// 주요 아픈 부위 목록 조회
const getPainAreas = () => {
  return api.get<{ painAreas: PainAreaApi[] }>("/pain-areas").then((res) => {
    const list = res.data?.painAreas ?? [];
    return {
      ...res,
      data: {
        painAreas: list.map((p) => ({ painAreaID: p.pain_area_id, name: p.name })),
      } satisfies GetPainAreasResponse,
    };
  });
};

export default getPainAreas;
