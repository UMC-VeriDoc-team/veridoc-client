import { TermsKey, type TermsItem } from "@/components/Modal/types/terms";
import { LOCATION_TERMS, PRIVACY_TERMS, SERVICE_TERMS } from "./termsContent";

export const TERMS_ITEMS: TermsItem[] = [
  {
    key: TermsKey.ALL,
    label: "전체 약관 내용",
    required: false,
    content: [SERVICE_TERMS, PRIVACY_TERMS, LOCATION_TERMS],
  },
  {
    key: TermsKey.SERVICE,
    label: "서비스 이용 약관",
    required: true,
    content: [SERVICE_TERMS],
  },
  {
    key: TermsKey.PRIVACY,
    label: "개인정보 수집 및 이용 동의",
    required: true,
    content: [PRIVACY_TERMS],
  },
  {
    key: TermsKey.LOCATION,
    label: "위치기반 서비스 이용 동의",
    required: true,
    content: [LOCATION_TERMS],
  },
];
