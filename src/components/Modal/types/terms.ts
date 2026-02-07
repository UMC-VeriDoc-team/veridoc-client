export const TermsKey = {
  ALL: "ALL",
  SERVICE: "SERVICE",
  PRIVACY: "PRIVACY",
  LOCATION: "LOCATION",
} as const;

export type TermsKey = (typeof TermsKey)[keyof typeof TermsKey];

// 체크 가능한 키 (ALL 제외)
export type CheckableTermsKey = Exclude<TermsKey, typeof TermsKey.ALL>;

export interface TermsItem {
  key: TermsKey;
  label: string;
  required: boolean;
  content: TermsContent[];
}

export type TermsBodyItem =
  | { type: "text"; value: string[] }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export interface TermsSection {
  title: string;
  body: TermsBodyItem[];
}

export interface TermsContent {
  title: string;
  sections: TermsSection[];
}

// --- 약관 동의 API 전송 시 필요한 타입만 추가 (usePostTerm 등에서 사용) ---

/** 약관 동의 API 요청 바디 (백엔드 agreement 구조분해 할당명과 일치) */
export interface PostTermRequest {
  termsOfService: boolean;
  privacyPolicy: boolean;
  locationService: boolean;
}

/** 약관 동의 API 응답 */
export interface PostTermResponse {
  ok: boolean;
  agreedAt: string;
}
