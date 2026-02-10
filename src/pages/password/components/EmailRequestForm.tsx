import Button from "@/components/Button/Button";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import { validateEmail } from "@/utils/validateEmail";
import { useState, useMemo } from "react";
import { useForgotPasswordStore } from "@/stores/password/useForgotPasswordStore";

const EmailRequestForm = () => {
  const { openModal } = useBaseModal();
  const { email, setEmail, sendMail, loading, error } = useForgotPasswordStore();

  const [touchedEmail, setTouchedEmail] = useState(false);

  const emailError = useMemo(() => {
    return touchedEmail ? validateEmail(email) : "";
  }, [touchedEmail, email]);

  // 폼 유효성 여부
  const isFormValid = useMemo(() => {
    return email.length > 0 && !validateEmail(email);
  }, [email]);

  const handleSubmit = async () => {
    setTouchedEmail(true);

    if (!isFormValid) return;

    const ok = await sendMail();
    // 메일 전송 성공 시 모달 오픈
    if (ok) {
      openModal(ModalType.AUTH_MAIL_SENT);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.025em] text-gray-950">
          비밀번호 재설정
        </h2>

        <p className="text-[18px] font-medium leading-[1.4] tracking-[-0.025em] text-gray-950">
          가입 시 사용한 이메일 주소를 입력해 주세요 <br />
          비밀번호 재설정 링크를 보내드릴게요
        </p>

        <div className="mt-[30px] flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="forgot-password-email"
              className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950"
            >
              이메일 <span className="text-error">*</span>
            </label>

            <EmailDomainInput
              id="forgot-password-email"
              value={email}
              onChange={(nextEmail) => {
                setEmail(nextEmail);
              }}
              onBlur={() => setTouchedEmail(true)}
              hasError={!!emailError}
            />

            {emailError && (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {emailError}
              </p>
            )}

            {!emailError && error && (
              <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[60px]">
        <Button onClick={handleSubmit} disabled={loading || (touchedEmail && !isFormValid)}>
          {loading ? "메일 발송 중..." : "비밀번호 재설정 메일 발송"}
        </Button>
      </div>
    </div>
  );
};

export default EmailRequestForm;
