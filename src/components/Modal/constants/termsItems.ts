import { TermsKey, type TermsItem } from "@/components/Modal/types/terms";

// 임시 약관 데이터
export const TERMS_ITEMS: TermsItem[] = [
  {
    key: TermsKey.ALL,
    label: "전체 약관 내용",
    required: false,
    content: "전체 약관 내용",
  },
  {
    key: TermsKey.SERVICE,
    label: "서비스 이용 약관",
    required: true,
    content: "서비스 이용 약관 내용",
  },
  {
    key: TermsKey.PRIVACY,
    label: "개인정보 수집 및 이용 동의",
    required: true,
    content: "개인정보",
  },
  {
    key: TermsKey.LOCATION,
    label: "위치기반 서비스 이용 동의",
    required: true,
    content: "위치기반",
  },
];
