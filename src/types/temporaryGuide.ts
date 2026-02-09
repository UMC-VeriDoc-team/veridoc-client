export interface TemporaryGuideNote {
  noteId: number;
  imageUrl: string;
  bold: string;
  text: string;
}

export interface TemporaryGuideCaution {
  cautionId: number;
  iconUrl: string;
  bold: string;
  text: string;
}

export interface TemporaryGuideHelp {
  helpId: number;
  text: string;
}

export interface TemporaryGuideMorePost {
  guideId: number;
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
