export interface TemporaryGuideNote {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

export interface TemporaryGuideCaution {
  id: number;
  iconUrl: string;
  title: string;
  description: string;
}

export interface TemporaryGuideHelp {
  id: number;
  description: string;
}

export interface TemporaryGuideMorePost {
  answerId: number;
  painAreaId: number;
  title: string;
  imageUrl: string;
}

export interface TemporaryGuideDetail {
  painAreaId: number;
  painAreaName: string;
  type: string;

  guideId: number;
  title: string;
  subtitle: string | null;
  imageUrl: string;

  duration: string;

  sourceName: string | null; //  원문 제공 출처
  sourceUrl: string | null;

  highlighter: string | null;
  content: string;

  badges: string[];

  notes: TemporaryGuideNote[];
  cautions: TemporaryGuideCaution[];
  helps: TemporaryGuideHelp[];

  morePosts: TemporaryGuideMorePost[];
}
