import Icon from "@/components/Icon/Icon";
import { useAuthStore } from "@/stores/user/useAuthStore";
import useBaseModal from "@/stores/modal/useBaseModal";
import { useNavigate } from "react-router-dom";

// 로그아웃 모달
const AuthLogoutModal = () => {
  const navigate = useNavigate();
  const { closeModal } = useBaseModal();
  const { logout } = useAuthStore();

  // 로그아웃
  const handleLogout = () => {
    // 로그아웃 API
    closeModal();
    logout();
    navigate("/");
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="logout" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            로그아웃하시겠습니까?
          </p>
          <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
            진행 시 현재 계정에서 로그아웃됩니다
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-gray-50 text-center text-base font-semibold leading-none text-gray-600 transition-colors hover:bg-gray-100 sm:text-lg"
          >
            계속 이용하기
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLogoutModal;
