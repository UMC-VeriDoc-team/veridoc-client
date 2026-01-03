import Icon from "@/components/icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/pages/modal/types/modal";

// 회원탈퇴 안내 모달
const MyWithdrawNoticeModal = () => {
  const { setModalType, closeModal } = useBaseModal();

  // 회원탈퇴 버튼 클릭
  const handleWithdrawAccount = () => {
    // 회원탈퇴 API 호출
    setModalType(ModalType.MY_WITHDRAW_DONE);
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="warning" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <div>
            <div className="flex items-center justify-center">
              <p className="text-center text-lg font-bold text-brand-primary sm:text-xl">홍길동</p>
              <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">님 정말로</p>
            </div>
            <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
              회원탈퇴하시겠습니까?
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              탈퇴일 포함 3일 동안 재가입이 불가하며,
            </p>
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              재가입 시에도 이용 내용은 복구되지 않습니다.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gray-50 text-center text-base font-semibold leading-none text-gray-600 transition-colors hover:bg-gray-100 sm:text-lg"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleWithdrawAccount}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWithdrawNoticeModal;
