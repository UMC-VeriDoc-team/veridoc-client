import Button from "@/components/Button/Button";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import InputField from "@/components/Input/InputField";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import { validateEmail } from "@/utils/validateEmail";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();
  const { loading, login } = useLogin();

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
    if (!password.trim()) return "필수 입력 사항입니다";
    if (password.length < 8) return "비밀번호 형식이 올바르지 않습니다";
    return "";
  }, [password, touched.password]);

  const isFormValid =
    !emailError && !passwordError && email.trim() !== "" && password.trim() !== "";

  const [serverError, setServerError] = useState("");

  const handleSubmit = async () => {
    setTouched({ email: true, password: true });
    setServerError("");
    if (!isFormValid) return;

    const result = await login({ email: email.trim(), password });

    if (result.ok) {
      navigate("/");
      return;
    }

    if (result.reason === "INVALID") {
      openModal(ModalType.AUTH_LOGIN_FAILED);
    } else {
      setServerError("잠시 후 다시 시도해주세요.");
    }
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
              onChange={setEmail}
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

            <InputField
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              hasError={!!passwordError}
              passwordToggle
              clearable
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
        {/* 서버 에러 메시지 */}
        {serverError ? (
          <p className="-mt-8 pb-3 text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
            {serverError}
          </p>
        ) : null}

        <Button onClick={handleSubmit} disabled={loading}>
          로그인
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
