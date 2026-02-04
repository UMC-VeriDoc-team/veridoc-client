import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import AuthHeader from "@/components/Header/AuthHeader";
// 👇 로고 이미지 경로 확인!
import LogoImage from "/images/logo.svg";

// [TODO: 백엔드 연동 시 삭제] 테스트용 가짜 비밀번호
const MOCK_CURRENT_PASSWORD = "12345678";

const MyPasswordPage = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  // --- [State] 입력값 ---
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- [State] 에러 메시지 ---
  const [pwdErrors, setPwdErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- [Logic] 핸들러 ---
  const isMatchSuccess =
    passwordForm.new && passwordForm.new === passwordForm.confirm && passwordForm.new.length >= 8;

  const handleChange = (field: "current" | "new" | "confirm", value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    setPwdErrors((prev) => {
      const newErrors = { ...prev, [field]: "" };
      const nextNew = field === "new" ? value : passwordForm.new;
      const nextConfirm = field === "confirm" ? value : passwordForm.confirm;

      if (nextNew === nextConfirm) {
        newErrors.confirm = "";
      }
      return newErrors;
    });
  };

  const handleSavePassword = () => {
    const { current, new: newPwd, confirm } = passwordForm;
    const newErrors = { current: "", new: "", confirm: "" };
    let isValid = true;

    if (!current) {
      newErrors.current = "필수 입력 사항입니다";
      isValid = false;
    }
    if (!newPwd) {
      newErrors.new = "필수 입력 사항입니다";
      isValid = false;
    }
    if (!confirm) {
      newErrors.confirm = "필수 입력 사항입니다";
      isValid = false;
    }

    if (current && current !== MOCK_CURRENT_PASSWORD) {
      newErrors.current = "기존 비밀번호를 입력해주세요";
      isValid = false;
    }
    if (newPwd && newPwd.length < 8) {
      newErrors.new = "새 비밀번호 형식이 올바르지 않습니다";
      isValid = false;
    }
    if (confirm && newPwd !== confirm) {
      newErrors.confirm = "입력한 비밀번호가 서로 일치하는지 확인해 주세요";
      isValid = false;
    }

    setPwdErrors(newErrors);
    if (!isValid) return;

    openModal(ModalType.AUTH_PASSWORD_CHANGED);
  };

  // --- [Render] UI 렌더링 ---
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* [Header 1] Mobile 전용 헤더 (뒤로가기 화살표) */}
      <div className="w-full md:hidden">
        <AuthHeader backTo="/my?tab=info" />
      </div>

      {/* [Header 2] PC 전용 헤더 (로고 + 탭 메뉴) */}
      <div className="hidden w-full flex-col items-center md:flex">
        {/* 1. 로고 영역 */}
        <div className="mb-8 mt-10 flex items-center justify-center">
          {/* ✨ [수정 완료] 40px -> 85px로 복구! (원래 사이즈) */}
          <div className="h-[85px]">
            <img src={LogoImage} alt="VeriDoc Logo" className="h-full w-auto" />
          </div>
        </div>

        {/* 2. 탭 메뉴 (이동패널) */}
        <div className="mb-8 w-[777px]">
          <div className="flex h-[69px] w-full items-center justify-center rounded-[10px] bg-gray-50 p-[4px]">
            <button
              className="flex h-full flex-1 items-center justify-center rounded-[7px] bg-transparent text-[20px] font-bold tracking-[-0.025em] text-gray-400 transition-all duration-200"
              onClick={() => navigate("/my?tab=symptom")}
            >
              나의 증상 관리
            </button>

            <button
              className="flex h-full flex-1 items-center justify-center rounded-[7px] bg-white text-[20px] font-bold tracking-[-0.025em] text-gray-950 shadow-sm transition-all duration-200"
              onClick={() => navigate("/my?tab=info")}
            >
              정보 수정
            </button>
          </div>
        </div>
      </div>

      {/* [Content] 메인 컨텐츠 영역 */}
      <div className="mt-[10px] flex w-full flex-col px-[30px] md:mt-[60px] md:w-[400px] md:px-0">
        {/* 타이틀 */}
        <div className="mb-12 text-left md:text-center">
          <h2 className="mb-2 text-[24px] font-bold text-gray-950 md:text-[32px]">비밀번호 변경</h2>
          <p className="text-[16px] font-medium text-gray-600 md:text-[18px]">
            계정 보안을 위해 현재 비밀번호를 먼저 확인합니다
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-6">
          {/* 1. 현재 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              현재 비밀번호<span className="text-error">*</span>
            </label>
            <div>
              <input
                type="password"
                placeholder="현재 비밀번호를 입력해주세요"
                value={passwordForm.current}
                onChange={(e) => handleChange("current", e.target.value)}
                className={`w-full rounded border p-4 focus:outline-none ${
                  pwdErrors.current
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
            </div>
            {pwdErrors.current && <p className="mt-2 text-sm text-error">{pwdErrors.current}</p>}
          </div>

          {/* 2. 새 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              새 비밀번호<span className="text-error">*</span>
            </label>
            <div>
              <input
                type="password"
                placeholder="새 비밀번호를 입력해주세요 (8자 이상)"
                value={passwordForm.new}
                onChange={(e) => handleChange("new", e.target.value)}
                className={`w-full rounded border p-4 focus:outline-none ${
                  pwdErrors.new
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
            </div>
            {pwdErrors.new && <p className="mt-2 text-sm text-error">{pwdErrors.new}</p>}
          </div>

          {/* 3. 새 비밀번호 확인 */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              새 비밀번호 확인<span className="text-error">*</span>
            </label>
            <div>
              <input
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={passwordForm.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                className={`w-full rounded border p-4 focus:outline-none ${
                  pwdErrors.confirm
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
            </div>
            {pwdErrors.confirm && <p className="mt-2 text-sm text-error">{pwdErrors.confirm}</p>}
            {isMatchSuccess && (
              <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                <span>✔</span>
                <span>입력한 비밀번호가 서로 일치합니다</span>
              </div>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="mb-[100px] mt-[60px] w-full">
            <button
              onClick={handleSavePassword}
              className="w-full rounded bg-brand-primary py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPasswordPage;
