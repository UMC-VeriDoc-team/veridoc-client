import { create } from "zustand";
import getHomeData from "@/pages/home/services/getHomeData";
import type {
  HomeBannerItem,
  HomeSymptomItem,
  HomeTemporaryGuideItem,
} from "@/pages/home/types/home";

type HomeState = {
  loading: boolean;
  error: string | null;

  painAreaId: number | null;
  painAreaName: string | null;
  banners: HomeBannerItem[];
  symptoms: HomeSymptomItem[];
  temporaryGuides: HomeTemporaryGuideItem[];

  fetchHome: () => Promise<void>;
  resetHome: () => void;
};

const initial = {
  loading: false,
  error: null as string | null,
  painAreaId: null as number | null,
  painAreaName: null as string | null,
  banners: [] as HomeBannerItem[],
  symptoms: [] as HomeSymptomItem[],
  temporaryGuides: [] as HomeTemporaryGuideItem[],
};

export const useHomeStore = create<HomeState>((set) => ({
  ...initial,

  resetHome: () => set({ ...initial }),

  fetchHome: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getHomeData();
      set({
        painAreaId: data.painAreaId ?? null,
        painAreaName: data.painAreaName ?? null,
        banners: data.banners ?? [],
        symptoms: data.symptoms ?? [],
        temporaryGuides: data.temporaryGuides ?? [],
      });
    } catch (e) {
      set({ error: "홈 전체 데이터 조회 실패" });
    } finally {
      set({ loading: false });
    }
  },
}));
