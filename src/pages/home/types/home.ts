// 홈 전체조회 타입
export type HomeBannerItem = { title?: string; id?: number; imageUrl?: string };

export type HomeSymptomItem = {
  symptomId: number;
  name: string;
  answerId: number;
};

export type HomeTemporaryGuideItem = {
  guideId: number;
  title: string;
  badges: string[];
  description: string;
  imageUrl: string;
  type: string;
  duration: string;
};

export type GetHomeResponse = {
  painAreaId: number | null;
  painAreaName: string | null;
  banners: HomeBannerItem[];
  symptoms: HomeSymptomItem[];
  temporaryGuides: HomeTemporaryGuideItem[];
};
