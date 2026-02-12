import { useMemo } from "react";
import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import {
  TermsKey,
  type CheckableTermsKey,
  type PostTermRequest,
  type TermsItem,
} from "@/components/Modal/types/terms";
import { useTermsAgreementStore } from "@/stores/modal/useTermsAgreementStore";
import { TERMS_ITEMS } from "@/constants/terms/termsItems";
import { useAuthStore } from "@/stores/user/useAuthStore";
import toast from "react-hot-toast";

const HomeTermsAgreementModal = () => {
  const { openModal, closeModal } = useBaseModal();
  const { name, submitTerms, loading } = useAuthStore();
  const { checked, setChecked, setAll, reset } = useTermsAgreementStore();

  const termsItems = TERMS_ITEMS;

  // 전체 동의 여부 계산 (ALL 키 제외)
  const checkableItems = termsItems.filter(
    (t): t is TermsItem & { key: CheckableTermsKey } => t.key !== TermsKey.ALL
  );

  const allChecked = checkableItems.every((t) => checked[t.key]);

  const locationKey: CheckableTermsKey = TermsKey.LOCATION;

  const locationItem = useMemo(
    () => termsItems.find((t) => t.key === TermsKey.LOCATION),
    [termsItems]
  );
  const locationRequired = Boolean(locationItem?.required);

  // 버튼 활성화 조건: 모든 필수 약관 동의 여부만 확인
  const canJoin = useMemo(() => {
    if (!allChecked) return false;
    if (locationRequired && !checked[locationKey]) return false;
    return true;
  }, [allChecked, locationRequired, checked, locationKey]);

  const openDetail = (key: TermsKey) => {
    openModal(ModalType.HOME_TERMS_DETAIL, { activeKey: key });
  };

  // 전체 동의 토글 (비동기 로직 제거)
  const handleToggleAll = () => {
    const next = !allChecked;
    setAll(next);
  };

  // 개별 약관 체크 (위치 권한 요청 로직 제거)
  const handleToggleTerm = (key: CheckableTermsKey) => {
    setChecked(key, !checked[key]);
  };

  // 동의하고 가입하기
  const handleSubmit = async () => {
    const requestData: PostTermRequest = {
      termsOfService: checked[TermsKey.SERVICE],
      privacyPolicy: checked[TermsKey.PRIVACY],
      locationService: checked[TermsKey.LOCATION],
    };

    const loadingToast = toast.loading("동의 정보를 저장하고 있습니다...");

    const result = await submitTerms(requestData);

    if (result.ok) {
      toast.success("약관 동의가 완료되었습니다!", { id: loadingToast });
      reset();
      closeModal();
    } else {
      toast.error(
        result.message || "서비스 연동 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col gap-6 rounded-xl bg-white px-6 py-8 sm:min-w-[380px] sm:px-7 sm:py-10">
      {/* 상단 아이콘 */}
      <div className="flex justify-center">
        <div className="rounded-lg bg-[#2B7FFF1F] p-2">
          <Icon name="success" className="h-6 w-6" />
        </div>
      </div>

      {/* 타이틀 */}
      <div className="text-center">
        <div className="flex justify-center">
          <p className="text-lg font-bold text-brand-primary sm:text-xl">{name}</p>
          <p className="text-lg font-bold text-gray-950 sm:text-xl">님 환영합니다!</p>
        </div>
        <p className="mt-1 text-lg font-bold text-gray-950 sm:text-xl">
          서비스 이용을 위해 약관에 동의해 주세요
        </p>
      </div>

      {/* 약관 체크 영역 */}
      <div className="mt-4 flex flex-col gap-4">
        {/* 전체 동의 */}
        <div className="flex items-center justify-between">
          <label htmlFor="all-terms" className="flex cursor-pointer items-center gap-3">
            <input
              id="all-terms"
              type="checkbox"
              checked={allChecked}
              onChange={handleToggleAll}
              className="h-6 w-6 accent-brand-primary"
            />
            <span className="text-base font-semibold text-gray-900 sm:text-lg">약관 전체 동의</span>
          </label>

          <button type="button" onClick={() => openDetail(TermsKey.ALL)} className="rounded-md p-1">
            <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* 개별 약관 리스트 */}
        <div className="flex flex-col gap-3">
          {checkableItems.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <label htmlFor={`term-${t.key}`} className="flex cursor-pointer items-center gap-3">
                <input
                  id={`term-${t.key}`}
                  type="checkbox"
                  checked={checked[t.key]}
                  onChange={() => handleToggleTerm(t.key)}
                  className="h-6 w-6 accent-brand-primary"
                />
                <span className="text-base font-medium text-gray-900 sm:text-lg">
                  {t.required && (
                    <span className="text-brand-primary" aria-label="필수 항목">
                      [필수]{" "}
                    </span>
                  )}
                  {t.label}
                </span>
              </label>

              <button type="button" onClick={() => openDetail(t.key)} className="rounded-md p-1">
                <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6">
        <button
          type="button"
          disabled={!canJoin || loading}
          onClick={handleSubmit}
          className={[
            "inline-flex h-12 w-full items-center justify-center rounded-[4px] text-lg font-semibold",
            canJoin && !loading
              ? "bg-brand-primary text-white hover:opacity-90"
              : "bg-gray-50 text-gray-600",
          ].join(" ")}
        >
          {loading ? "처리 중..." : "동의하고 가입하기"}
        </button>
      </div>
    </div>
  );
};

export default HomeTermsAgreementModal;
