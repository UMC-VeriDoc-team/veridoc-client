import Button from "@/components/Button/Button";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import Input from "@/components/Input/Input";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import { validateEmail } from "@/utils/validateEmail";
import { useMemo, useState } from "react";

const LoginForm = () => {
  const { openModal } = useBaseModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    return validateEmail(email);
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password) return "필수 입력 사항입니다";
    if (password.length < 8) return "비밀번호 형식이 올바르지 않습니다";
    return "";
  }, [password, touched.password]);

  const isFormValid =
    !emailError && !passwordError && email.trim() !== "" && password.trim() !== "";

  const handleSubmit = () => {
    setTouched({ email: true, password: true });
    if (!isFormValid) return; // 폼이 유효하지 않으면 제출하지 않음

    // TODO(feature/login): 로그인 API 연동 후 처리

    // 로그인 실패 모달
    openModal(ModalType.AUTH_LOGIN_FAILED);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[24px] text-gray-950">로그인</h2>

        <div className="mt-[30px] flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
              이메일 <span className="text-error">*</span>
            </label>

            <EmailDomainInput
              value={email}
              onChange={(nextEmail) => setEmail(nextEmail)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              hasError={!!emailError}
            />

            {emailError ? (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
              비밀번호 <span className="text-error">*</span>
            </label>

            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              hasError={!!passwordError}
            />

            {passwordError ? (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {passwordError}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-[60px]">
        <Button onClick={handleSubmit}>로그인</Button>
      </div>
    </div>
  );
};

export default LoginForm;
