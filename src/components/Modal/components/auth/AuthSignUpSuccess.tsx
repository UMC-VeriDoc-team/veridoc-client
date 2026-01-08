import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { useNavigate } from "react-router-dom";

// 회원가입 성공 모달
const AuthSignUpSuccess = () => {
  const navigate = useNavigate();
  const { closeModal } = useBaseModal();

  // 로그인 페이지로 이동
  const handleGoToLogin = () => {
    closeModal();
    navigate("/login");
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="success" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            회원가입이 완료되었습니다
          </p>
          <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
            로그인 후 서비스를 바로 이용하실 수 있어요
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoToLogin}
          className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default AuthSignUpSuccess;
