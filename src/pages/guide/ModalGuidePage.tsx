import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import type { GuideDetailType } from "@/components/Modal/types/guideDetail";

interface ModalTestItem {
  label: string;
  type: ModalType;
}

// 범용 가이드 상세 테스트 아이템 타입
interface GuideModalTestItem {
  label: string;
  guideType: GuideDetailType;
}

const ModalGuidePage = () => {
  const { openModal } = useBaseModal();
  const { setGuideType } = useGuideDetailModalStore();

  const items: ModalTestItem[] = [
    // 로그인/회원가입
    {
      label: "로그인 실패",
      type: ModalType.AUTH_LOGIN_FAILED,
    },
    {
      label: "메일 발송",
      type: ModalType.AUTH_MAIL_SENT,
    },
    {
      label: "비밀번호 변경",
      type: ModalType.AUTH_PASSWORD_CHANGED,
    },
    {
      label: "접근 제한",
      type: ModalType.AUTH_REQUIRED,
    },

    // 홈
    {
      label: "서비스 약관 동의",
      type: ModalType.HOME_TERMS_AGREEMENT,
    },
    {
      label: "약관 상세 내역",
      type: ModalType.HOME_TERMS_DETAIL,
    },
    {
      label: "전문의 소견 전체 보기",
      type: ModalType.HOME_DOCTOR_OPINION,
    },
    {
      label: "임시 대처 방안",
      type: ModalType.HOME_TEMPORARY_MEASURE,
    },

    // 마이페이지
    {
      label: "선택 증상 변경 완료",
      type: ModalType.MY_SYMPTOM_CHANGED,
    },
    {
      label: "증상 미선택 안내",
      type: ModalType.MY_SYMPTOM_NOT_SELECTED,
    },
    {
      label: "개인정보 수정완료",
      type: ModalType.MY_PROFILE_UPDATED,
    },
    {
      label: "회원탈퇴 안내",
      type: ModalType.MY_WITHDRAW_NOTICE,
    },
    {
      label: "탈퇴 완료",
      type: ModalType.MY_WITHDRAW_DONE,
    },
  ];

  // 범용 가이드 상세 모달을 종류별로 테스트하기 위한 버튼 목록
  const guideItems: GuideModalTestItem[] = [
    {
      label: "가이드 상세 - 이런 증상은 흔해요",
      guideType: "COMMON_SYMPTOMS",
    },
    {
      label: "가이드 상세 - 당장 병원에 가야 하는 경우",
      guideType: "NEED_HOSPITAL",
    },
    {
      label: "가이드 상세 - 일상에서 조심하면 좋은 점",
      guideType: "DAILY_CARE",
    },
    {
      label: "가이드 상세 - VeriDoc 이렇게 사용하세요",
      guideType: "HOW_TO_USE",
    },
  ];

  // 일반 모달 오픈
  const onClickOpen = (type: ModalType) => {
    openModal(type);
  };

  // 범용 가이드 상세 모달 오픈 (전용 store에 타입 저장 후 모달 열기)
  const onClickOpenGuideDetail = (guideType: GuideDetailType) => {
    setGuideType(guideType);
    openModal(ModalType.HOME_GUIDE_DETAIL);
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-10 md:px-12">
      <div className="mx-auto w-full max-w-[900px]">
        <h1 className="text-2xl font-bold text-gray-900">Modal Guide</h1>

        {/* 범용 가이드 상세 모달 테스트 */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">범용 가이드 상세 모달</h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guideItems.map((item) => (
              <button
                key={item.guideType}
                type="button"
                onClick={() => onClickOpenGuideDetail(item.guideType)}
                className="flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 기존 모달들 */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900">기타 모달</h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => onClickOpen(item.type)}
                className="flex h-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGuidePage;
