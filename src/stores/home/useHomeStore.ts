import { create } from "zustand";

import getHomeData from "@/pages/home/services/getHomeData";
import getDoctorOpinionSummary, {
  type GetDoctorOpinionSummaryResponse,
} from "@/pages/home/services/getDoctorOpinionSummary";

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

  doctorOpinionSummary: GetDoctorOpinionSummaryResponse | null;

  fetchHome: (answerId?: string | number) => Promise<void>;
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

  doctorOpinionSummary: null as GetDoctorOpinionSummaryResponse | null,
};

export const useHomeStore = create<HomeState>((set) => ({
  ...initial,

  resetHome: () => set({ ...initial }),

  fetchHome: async (answerId) => {
    set({ loading: true, error: null });

    try {
      // 홈 데이터 조회
      const home = await getHomeData();

      set({
        painAreaId: home.painAreaId ?? null,
        painAreaName: home.painAreaName ?? null,
        banners: home.banners ?? [],
        symptoms: home.symptoms ?? [],
        temporaryGuides: home.temporaryGuides ?? [],
      });

      // 전문의 요약
      if (answerId !== undefined && answerId !== null && `${answerId}`.trim() !== "") {
        try {
          const summary = await getDoctorOpinionSummary(answerId);
          set({ doctorOpinionSummary: summary ?? null });
        } catch {
          // 요약만 실패한 경우: 요약만 null
          set({ doctorOpinionSummary: null });
        }
      } else {
        set({ doctorOpinionSummary: null });
      }
    } catch {
      set({ error: "홈 전체 데이터 조회 실패" });
    } finally {
      set({ loading: false });
    }
  },
}));
