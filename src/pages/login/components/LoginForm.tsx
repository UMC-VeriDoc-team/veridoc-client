import Button from "@/components/Button/Button";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import InputField from "@/components/Input/InputField";
import { ModalType } from "@/components/Modal/types/modal";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { validateEmail } from "@/utils/validateEmail";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PASSWORD_REGEX } from "@/utils/validatePassword";

const LoginForm = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();
  const { loading, login, painAreaID } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const [serverError, setServerError] = useState("");

  const emailError = useMemo(() => {
    if (!touched.email) return "";
    return validateEmail(email);
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return "";
    if (!password.trim()) return "필수 입력 사항입니다";
    if (!PASSWORD_REGEX.test(password)) return "비밀번호 형식이 올바르지 않습니다";
    return "";
  }, [password, touched.password]);

  const isFormValid =
    !emailError && !passwordError && email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError("");

    if (!isFormValid) return;

    const result = await login({ email: email.trim(), password });

    if (result.ok) {
      if (painAreaID !== 8) {
        navigate("/home");
      } else {
        navigate("/usage");
      }
      return;
    }

    if (result.reason === "INVALID") {
      openModal(ModalType.AUTH_LOGIN_FAILED);
    } else {
      setServerError("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[24px] text-gray-950">로그인</h2>

        <div className="mt-[30px] flex flex-col gap-[30px]">
          {/* 이메일 입력 섹션 */}
          <div className="flex flex-col gap-2">
            {/* id="email-input"과 연결 */}
            <label
              htmlFor="email-input"
              className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950"
            >
              이메일{" "}
              <span className="text-error" aria-hidden="true">
                *
              </span>
            </label>

            <EmailDomainInput
              id="email-input"
              value={email}
              onChange={setEmail}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              hasError={!!emailError}
            />

            {emailError && (
              <p className="text-xs font-medium leading-[1.18] tracking-[-0.025em] text-error sm:text-sm">
                {emailError}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 섹션 */}
          <div className="flex flex-col gap-2">
            {/* id="password-input"과 연결 */}
            <label
              htmlFor="password-input"
              className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950"
            >
              비밀번호{" "}
              <span className="text-error" aria-hidden="true">
                *
              </span>
            </label>

            <InputField
              id="password-input"
              type="password"
              placeholder="비밀번호를 입력해주세요(대소문자, 숫자, 특수문자 포함 8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              hasError={!!passwordError}
              passwordToggle
              clearable
              onClear={() => setPassword("")}
            />

            {passwordError && (
              <p className="text-xs font-medium leading-[1.18] tracking-[-0.025em] text-error sm:text-sm">
                {passwordError}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[60px]">
        {serverError && (
          <p className="-mt-8 pb-3 text-xs font-medium leading-[1.18] tracking-[-0.025em] text-error sm:text-sm">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          로그인
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
