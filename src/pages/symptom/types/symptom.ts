export type SymptomTag = {
  id: string;
  label: string;
};

export interface source {
  name: string;
}

export interface LifeStyleVideo {
  videoId: number;
  youtubeUrl: string;
  youtubeTitle: string;
  description: string;
  source: source;
}

export interface LifeStyleGuideData {
  painAreaId: number;
  painAreaName: string;
  title: string;
  subtitle: string;
  videos: LifeStyleVideo[];
}
