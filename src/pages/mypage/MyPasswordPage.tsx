import { useState } from "react";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import AuthHeader from "@/components/Header/AuthHeader"; // 헤더 컴포넌트

// [TODO: 백엔드 연동 시 삭제] 테스트용 가짜 비밀번호
const MOCK_CURRENT_PASSWORD = "12345678";

const MyPasswordPage = () => {
  const { openModal } = useBaseModal();

  // --- 기존 Mypage.tsx에 있던 로직 그대로 이사 옴 ---
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [pwdErrors, setPwdErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const isMatchSuccess =
    passwordForm.new && passwordForm.new === passwordForm.confirm && passwordForm.new.length >= 8;

  const handleChange = (field: "current" | "new" | "confirm", value: string) => {
    // 1. 입력값 업데이트
    setPasswordForm((prev) => ({ ...prev, [field]: value }));

    // 2. 에러 메시지 정리 (여기가 핵심! ✨)
    setPwdErrors((prev) => {
      // 일단 지금 입력하고 있는 칸의 에러는 무조건 지움
      const newErrors = { ...prev, [field]: "" };

      // 🔍 [추가 로직] 새 비밀번호와 확인 비밀번호가 실시간으로 같아지면? -> 불일치 에러 삭제!
      // (현재 입력 중인 값 vs 저장된 다른 값 비교)
      const nextNew = field === "new" ? value : passwordForm.new;
      const nextConfirm = field === "confirm" ? value : passwordForm.confirm;

      if (nextNew === nextConfirm) {
        newErrors.confirm = ""; // 둘이 같아졌으니 '불일치' 에러 삭제
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
  // ----------------------------------------------------

  return (
    <div className="flex min-h-screen flex-col bg-white pt-9">
      {/* ✨ 팀장님 요청: 뒤로가기 누르면 마이페이지(/my)로 이동 */}
      <AuthHeader backTo="/my" />

      <div className="flex justify-center pt-[40px]">
        <div className="flex w-full max-w-[400px] flex-col">
          <div className="mb-12 text-center md:text-left">
            <h2 className="mb-2 text-lg font-bold text-gray-950">비밀번호 변경</h2>
            <p className="text-sm text-gray-600">
              계정 보안을 위해 현재 비밀번호를 먼저 확인합니다
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* 1. 현재 비밀번호 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                현재 비밀번호<span className="text-error">*</span>
              </label>
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
              {pwdErrors.current && <p className="mt-2 text-sm text-error">{pwdErrors.current}</p>}
            </div>

            {/* 2. 새 비밀번호 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                새 비밀번호<span className="text-error">*</span>
              </label>
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
              {pwdErrors.new && <p className="mt-2 text-sm text-error">{pwdErrors.new}</p>}
            </div>

            {/* 3. 새 비밀번호 확인 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-900">
                새 비밀번호 확인<span className="text-error">*</span>
              </label>
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
              {pwdErrors.confirm && <p className="mt-2 text-sm text-error">{pwdErrors.confirm}</p>}
              {isMatchSuccess && (
                <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
                  <span>✔</span>
                  <span>입력한 비밀번호가 서로 일치합니다</span>
                </div>
              )}
            </div>

            <button
              onClick={handleSavePassword}
              className="mt-4 w-full rounded bg-brand-primary py-4 text-lg font-bold text-white transition-colors hover:bg-blue-600"
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
