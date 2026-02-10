import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import Input from "@/components/Input/Input";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import { useMemo, useState } from "react";
import postResetPassword from "../services/postResetPassword";
import { useSearchParams } from "react-router-dom";

// 새 비밀번호 형식 검증: 미입력 / 8자 미만
const validateNewPassword = (password: string) => {
  if (!password.trim()) return "필수 입력 사항입니다";
  if (password.length < 8) return "새 비밀번호 형식이 올바르지 않습니다";
  return "";
};

const PasswordResetForm = () => {
  const { openModal } = useBaseModal();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [touched, setTouched] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });

  const setTouchedPassword = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

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
    const newOk = validateNewPassword(newPassword) === "";
    const confirmOk = confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    return newOk && confirmOk;
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async () => {
    setTouched({
      newPassword: true,
      confirmNewPassword: true,
    });

    if (!isFormValid || !token) return;

    await postResetPassword({ token, newPassword: confirmNewPassword });

    openModal(ModalType.AUTH_PASSWORD_CHANGED);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.025em] text-gray-950">
          비밀번호 재설정
        </h2>

        <p className="text-[18px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-950">
          기억하기 쉽고 안전한 비밀번호로 변경해 주세요
        </p>

        <div className="mt-[30px] flex flex-col gap-[30px]">
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
