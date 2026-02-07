import { authApiWrapper, type ApiResponse } from "@/utils/api/api";

export type AgreementStatusDto = {
  ok: boolean;
  agreements?: {
    termsOfService?: { agreement_type: "TOS"; agreed_at: string | null };
    privacyPolicy?: { agreement_type: "PRIVACY"; agreed_at: string | null };
    locationService?: { agreement_type: "LOCATION"; agreed_at: string | null };
  };
};

// 내 약관 동의 현황 조회
const getAgreementStatus = async () => {
  return await authApiWrapper.get<AgreementStatusDto>("/agreements/me");
};

export default getAgreementStatus;

const hasAgreedAt = (v?: { agreed_at: string | null }) => Boolean(v?.agreed_at);

export const normalizeAgreement = (input: AgreementStatusDto | ApiResponse<AgreementStatusDto>) => {
  const dto = "data" in input ? input.data : input;

  if (!dto?.ok) return false;

  const a = dto.agreements;
  if (!a) return false;

  // 필수 약관 모두 agreed_at 존재해야 true
  return (
    hasAgreedAt(a.termsOfService) && hasAgreedAt(a.privacyPolicy) && hasAgreedAt(a.locationService)
  );
};
