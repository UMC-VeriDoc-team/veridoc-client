import { api } from "@/utils/api/api";

export type TemporaryGuideIdItem = {
  guideId: number;
  painAreaName: string | null;
};

export type TemporaryGuideIdList = {
  guides: TemporaryGuideIdItem[];
};

export const getTemporaryGuideIds = async () => {
  return await api.get<TemporaryGuideIdList>("/temporary-guides/ids");
};
