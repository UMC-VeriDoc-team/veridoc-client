import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import Input from "@/components/Input/Input";
import { useMemo, useState } from "react";

// 새 비밀번호 형식 검증: 미입력 / 8자 미만
const validateNewPassword = (password: string) => {
  if (!password.trim()) return "필수 입력 사항입니다";
  if (password.length < 8) return "새 비밀번호 형식이 올바르지 않습니다";
  return "";
};

const PasswordResetForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const setTouchedPassword = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const currentPasswordError = useMemo(() => {
    if (!touched.currentPassword) return "";
    if (!currentPassword.trim()) return "필수 입력 사항입니다";

    // TODO: 서버에서 현재 비밀번호 불일치 -> "기존 비밀번호를 입력해주세요"

    return "";
  }, [currentPassword, touched.currentPassword]);

  // 새 비밀번호: 미입력 / 형식 오류
  const newPasswordError = useMemo(() => {
    if (!touched.newPassword) return "";
    return validateNewPassword(newPassword);
  }, [newPassword, touched.newPassword]);

  // 새 비밀번호 확인: 미입력 / 불일치
  const confirmNewPasswordError = useMemo(() => {
    if (!touched.confirmNewPassword) return "";
    if (!confirmNewPassword.trim()) return "필수 입력 사항입니다";
    if (confirmNewPassword !== newPassword)
      return "입력한 비밀번호가 서로 일치하는지 확인해 주세요";
    return "";
  }, [confirmNewPassword, newPassword, touched.confirmNewPassword]);

  const isPasswordMatchSuccess =
    touched.confirmNewPassword &&
    confirmNewPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmNewPassword === newPassword &&
    !newPasswordError &&
    !confirmNewPasswordError;

  // 실제 제출 가능 여부 (touched와 무관하게 값으로만 판단)
  const isFormValid = useMemo(() => {
    const currentOk = currentPassword.trim() !== "";
    const newOk = validateNewPassword(newPassword) === "";
    const confirmOk = confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    return currentOk && newOk && confirmOk;
  }, [currentPassword, newPassword, confirmNewPassword]);

  const handleSubmit = () => {
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmNewPassword: true,
    });

    if (!isFormValid) return;

    // TODO: 비밀번호 변경 완료 -> 로그인 화면으로 이동
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.025em] text-gray-950">
          비밀번호 재설정
        </h2>

        <p className="text-[18px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-950">
          계정 보안을 위해 현재 비밀번호를 먼저 확인합니다
        </p>

        <div className="mt-[30px] flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
              현재 비밀번호 <span className="text-error">*</span>
            </label>

            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={() => setTouchedPassword("currentPassword")}
              hasError={!!currentPasswordError}
            />

            {currentPasswordError ? (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {currentPasswordError}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
              새 비밀번호 <span className="text-error">*</span>
            </label>

            <Input
              type="password"
              placeholder="새 비밀번호를 입력해주세요 (8자 이상)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => setTouchedPassword("newPassword")}
              hasError={!!newPasswordError}
            />

            {newPasswordError ? (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {newPasswordError}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
              새 비밀번호 확인 <span className="text-error">*</span>
            </label>

            <Input
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onBlur={() => setTouchedPassword("confirmNewPassword")}
              hasError={!!confirmNewPasswordError}
            />

            {confirmNewPasswordError ? (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {confirmNewPasswordError}
              </p>
            ) : null}

            {!confirmNewPasswordError && isPasswordMatchSuccess ? (
              <div className="flex items-center gap-[5px] text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-brand-green">
                <span className="flex h-[22px] w-[22px] items-center justify-center px-[3px] py-[5px]">
                  <Icon name="check" className="h-full w-full" />
                </span>

                <span>입력한 비밀번호가 서로 일치합니다</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-[60px]">
        <Button onClick={handleSubmit}>비밀번호 재설정</Button>
      </div>
    </div>
  );
};

export default PasswordResetForm;
