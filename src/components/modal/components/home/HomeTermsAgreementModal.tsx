import Icon from "@/components/icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { TermsKey, type CheckableTermsKey, type TermsItem } from "@/components/Modal/types/terms";
import useTermsAgreementStore from "@/stores/modal/useTermsAgreementStore";
import { TERMS_ITEMS } from "@/components/Modal/constants/termsItems";

// 서비스 약관 동의 모달
const HomeTermsAgreementModal = () => {
  const { openModal, closeModal } = useBaseModal();
  const { checked, toggleChecked, setAll, reset } = useTermsAgreementStore();

  const termsItems = TERMS_ITEMS;

  // 전체 동의 여부
  const checkableItems = termsItems.filter(
    (t): t is TermsItem & { key: CheckableTermsKey } => t.key !== TermsKey.ALL
  );

  const allChecked = checkableItems.every((t) => checked[t.key]);
  const canJoin = allChecked;

  // 전체 동의 토글
  const handleToggleAll = () => {
    setAll(!allChecked);
  };

  // 상세 모달 열기
  const openDetail = (key: TermsKey) => {
    openModal(ModalType.HOME_TERMS_DETAIL, { activeKey: key });
  };

  // 동의하고 가입하기: 약관 동의 체크박스 리셋 + 모달 닫기
  const handleSubmit = () => {
    reset();
    closeModal();
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
          <p className="text-lg font-bold text-brand-primary sm:text-xl">홍길동</p>
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
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleToggleAll}
              className="h-6 w-6 accent-brand-primary"
            />
            <span className="text-base font-semibold text-gray-900 sm:text-lg">약관 전체 동의</span>
          </label>

          <button
            type="button"
            onClick={() => openDetail(TermsKey.ALL)}
            aria-label="전체 약관 내용 보기"
            className="rounded-md p-1"
          >
            <Icon name="chevron-right" className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* 개별 약관 */}
        <div className="flex flex-col gap-3">
          {checkableItems.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked[t.key]}
                  onChange={() => toggleChecked(t.key)}
                  className="h-6 w-6 accent-brand-primary"
                />
                <span className="text-base font-semibold text-gray-900 sm:text-lg">
                  {t.required && <span className="text-brand-primary">[필수] </span>}
                  {t.label}
                </span>
              </label>

              <button
                type="button"
                onClick={() => openDetail(t.key)}
                aria-label={`${t.label} 상세 보기`}
                className="rounded-md p-1"
              >
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
          disabled={!canJoin}
          onClick={handleSubmit}
          className={[
            "inline-flex h-12 w-full items-center justify-center rounded-[4px] text-lg font-semibold",
            canJoin ? "bg-brand-primary text-white hover:opacity-90" : "bg-gray-50 text-gray-600",
          ].join(" ")}
        >
          동의하고 가입하기
        </button>
      </div>
    </div>
  );
};

export default HomeTermsAgreementModal;
