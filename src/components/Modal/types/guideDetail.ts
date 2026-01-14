// 가이드 상세 타입
export type GuideDetailType = "COMMON_SYMPTOMS" | "NEED_HOSPITAL" | "DAILY_CARE" | "HOW_TO_USE";

// 번호 리스트 아이템 타입
export interface GuideStepItem {
  title: string;
  description: string;
}

// 가이드 상세 콘텐츠 타입
export interface GuideDetailContent {
  // 헤더 영역
  header: {
    title: string;
    subtitle: string;
    imageSrc: string;
  };

  // 출처 정보
  source: {
    name: string;
    link: string;
  };

  // 본문 문단
  paragraphs: string;

  // 번호 리스트
  steps?: GuideStepItem[];
}
