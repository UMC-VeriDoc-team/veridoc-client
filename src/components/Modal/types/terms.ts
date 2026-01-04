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
  content: string;
}
