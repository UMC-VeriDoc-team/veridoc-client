import Icon from "@/components/icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { useNavigate } from "react-router-dom";

// 메일 발송 완료 모달
const AuthMailSentModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useBaseModal();

  // 로그인 페이지로 이동
  const handleGoToLogin = () => {
    closeModal();
    navigate("/login"); // 임시 주소
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="mail" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            메일 발송이 완료되었습니다
          </p>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              입력한 이메일로 비밀번호 재설정 링크를 전송했어요
            </p>
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              메일함을 확인해 주세요
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={closeModal} // 메일 재전송 API 호출
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gray-50 text-center text-base font-semibold leading-none text-gray-600 transition-colors hover:bg-gray-100 sm:text-lg"
          >
            메일 재발송
          </button>
          <button
            type="button"
            onClick={handleGoToLogin}
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthMailSentModal;
