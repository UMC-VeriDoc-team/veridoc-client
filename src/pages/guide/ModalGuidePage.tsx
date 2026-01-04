import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";

interface ModalTestItem {
  label: string;
  type: ModalType;
}

const ModalGuidePage = () => {
  const { openModal } = useBaseModal();

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

  const onClickOpen = (type: ModalType) => {
    openModal(type);
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-10 md:px-12">
      <div className="mx-auto w-full max-w-[900px]">
        <h1 className="text-2xl font-bold text-gray-900">Modal Guide</h1>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
  );
};

export default ModalGuidePage;
