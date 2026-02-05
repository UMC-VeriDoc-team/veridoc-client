export interface Post {
  answerId: number;
  painAreaId: number;
  symptomId: number;
  title: string;
  imageUrl: string | null;
}

export interface opinionDetail extends Post {
  painAreaName: string;
  symptomName: string;
  content: string;
  sourceUrl: string;
  updatedAt: string;
  morePosts: Post[];
}

export interface GetDoctorOpinionDetailResponse {
  data: opinionDetail;
}
