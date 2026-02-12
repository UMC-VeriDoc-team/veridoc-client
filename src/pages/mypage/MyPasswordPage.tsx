import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import Icon from "@/components/Icon/Icon";
import LogoImage from "/images/logo.svg";
import putMyPassword from "@/pages/mypage/services/putMyPassword";
import { PASSWORD_REGEX } from "@/utils/validatePassword";
import Button from "@/components/Button/Button";

const MyPasswordPage = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();

  // --- [State] ---
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
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- [Logic] ---
  const isMatchSuccess =
    passwordForm.new &&
    passwordForm.new === passwordForm.confirm &&
    passwordForm.current !== passwordForm.new &&
    PASSWORD_REGEX.test(passwordForm.new);

  const handleChange = (field: "current" | "new" | "confirm", value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    setPwdErrors((prev) => {
      const newErrors = { ...prev, [field]: "" };
      const nextNew = field === "new" ? value : passwordForm.new;
      const nextConfirm = field === "confirm" ? value : passwordForm.confirm;
      if (nextNew === nextConfirm) newErrors.confirm = "";
      return newErrors;
    });
  };

  const handleSavePassword = async () => {
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
    if (newPwd && !PASSWORD_REGEX.test(newPwd)) {
      newErrors.new = "비밀번호 형식이 올바르지 않습니다";
      isValid = false;
    }

    // 현재와 새 비밀번호가 같은지 체크
    if (current && newPwd && current === newPwd) {
      newErrors.new = "현재 비밀번호와 다른 비밀번호를 입력해 주세요";
      isValid = false;
    }

    if (confirm && newPwd !== confirm) {
      newErrors.confirm = "입력한 비밀번호가 서로 일치하는지 확인해 주세요";
      isValid = false;
    }

    setPwdErrors(newErrors);
    if (!isValid) return;

    try {
      await putMyPassword({ currentPassword: current, newPassword: newPwd });
      openModal(ModalType.AUTH_PASSWORD_CHANGED);
      setPasswordForm({ current: "", new: "", confirm: "" });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        const body = e.response?.data;

        const apiCode = body?.code;
        if (apiCode === "INVALID_CREDENTIALS") {
          setPwdErrors((prev) => ({
            ...prev,
            current: "현재 비밀번호가 올바르지 않습니다.",
          }));
          return;
        }

        if (status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
          return;
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* PC 전용 헤더 (Logo + Tabs) - 1280px 이상에서만 보임 */}
      <div className="hidden w-full flex-col items-center xl:flex">
        <div className="md:mb-8 md:mt-10 md:flex md:items-center md:justify-center">
          <div className="h-[85px]">
            <img src={LogoImage} alt="VeriDoc Logo" className="h-full w-auto" />
          </div>
        </div>
        <div className="mb-8 w-[777px]">
          <div className="flex h-[48px] w-[354px] rounded-[10px] bg-gray-50 p-[6px] md:h-[69px] md:w-full md:max-w-[777px] md:p-0 md:px-[11px] md:py-[10px]">
            <button
              className="flex h-full flex-1 items-center justify-center rounded-[7px] bg-transparent text-[20px] font-bold tracking-[-0.025em] text-gray-400 transition-all duration-200"
              onClick={() => navigate("/my?tab=symptom")}
            >
              나의 증상 관리
            </button>
            <button
              className="flex h-full flex-1 items-center justify-center rounded-[7px] bg-white text-[20px] font-bold tracking-[-0.025em] text-gray-950 transition-all duration-200"
              onClick={() => navigate("/my?tab=info")}
            >
              정보 수정
            </button>
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="mt-[40px] flex w-full flex-col px-[30px] md:w-[450px] md:px-0 xl:mt-[60px] xl:w-[400px] xl:px-0">
        {/* 뒤로 가기 버튼 (모바일 전용) */}
        <div className="mb-6 w-full xl:hidden">
          <button
            onClick={() => navigate("/my?tab=info")}
            className="-ml-2 flex h-[40px] w-[40px] items-center justify-center"
          >
            <Icon name="arrow-back" className="h-[24px] w-[24px] text-gray-950" />
          </button>
        </div>

        {/* 타이틀 영역 */}
        <div className="mb-12 text-left">
          <h2 className="mb-2 text-[20px] font-bold leading-[24px] text-gray-950">비밀번호 변경</h2>
          <p className="text-[18px] font-medium leading-[25px] text-gray-600">
            기억하기 쉽고 안전한 비밀번호로 변경해 주세요
          </p>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col gap-6">
          {/* 현재 비밀번호 */}
          <div>
            <label
              htmlFor="current-password"
              className="mb-2 block text-[16px] font-medium leading-[1.18] text-gray-900"
            >
              현재 비밀번호
              <span className="text-error" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                placeholder="현재 비밀번호를 입력해주세요"
                value={passwordForm.current}
                onChange={(e) => handleChange("current", e.target.value)}
                className={`w-full rounded border p-3 text-xs focus:outline-none sm:text-sm ${
                  pwdErrors.current
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
              {passwordForm.current && (
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  {/* 눈 아이콘: 보기 */}
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      name={showCurrent ? "password-eye-off" : "password-eye"}
                      className="h-6 w-6"
                    />
                  </button>
                  {/* 전체 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleChange("current", "")}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="password-delete" className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            {pwdErrors.current && (
              <p className="mt-2 text-xs text-error sm:text-sm">{pwdErrors.current}</p>
            )}
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-[16px] font-medium leading-[1.18] text-gray-900"
            >
              새 비밀번호
              <span className="text-error" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? "text" : "password"}
                placeholder="새 비밀번호를 입력해주세요(대소문자, 숫자, 특수문자 포함 8자 이상)"
                value={passwordForm.new}
                onChange={(e) => handleChange("new", e.target.value)}
                className={`w-full rounded border p-3 text-xs focus:outline-none sm:text-sm ${
                  pwdErrors.new
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
              {passwordForm.new && (
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  {/* 눈 아이콘: 보기 */}
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      name={showNew ? "password-eye-off" : "password-eye"}
                      className="h-6 w-6"
                    />
                  </button>
                  {/* 전체 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleChange("new", "")}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="password-delete" className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            {pwdErrors.new && <p className="mt-2 text-xs text-error sm:text-sm">{pwdErrors.new}</p>}
          </div>

          {/* 새 비밀번호 확인 */}
          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-[16px] font-medium leading-[1.18] text-gray-900"
            >
              새 비밀번호 확인
              <span className="text-error" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="새 비밀번호를 다시 입력하세요"
                value={passwordForm.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                className={`w-full rounded border p-3 text-xs focus:outline-none sm:text-sm ${
                  pwdErrors.confirm
                    ? "border-error focus:border-error"
                    : "border-gray-200 focus:border-brand-primary"
                }`}
              />
              {passwordForm.confirm && (
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  {/* 눈 아이콘: 보기 */}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon
                      name={showConfirm ? "password-eye-off" : "password-eye"}
                      className="h-6 w-6"
                    />
                  </button>
                  {/* 전체 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleChange("confirm", "")}
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="password-delete" className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            {pwdErrors.confirm && (
              <p className="mt-2 text-xs text-error sm:text-sm">{pwdErrors.confirm}</p>
            )}
            {isMatchSuccess && (
              <div className="flex items-center gap-[5px] text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-brand-green">
                <span className="flex h-[22px] w-[22px] items-center justify-center px-[3px] py-2">
                  <Icon name="check" className="h-full w-full" />
                </span>
                <span>입력한 비밀번호가 서로 일치합니다</span>
              </div>
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="mb-[100px] mt-[60px] w-full">
            <Button onClick={handleSavePassword}>비밀번호 변경</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPasswordPage;
