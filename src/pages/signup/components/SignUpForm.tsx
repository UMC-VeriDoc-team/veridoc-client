import Button from "@/components/Button/Button";
import DateOfBirthInput from "@/components/Input/DateOfBirthInput";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import Input from "@/components/Input/Input";
import type { Gender } from "@/components/Select/GenderSelect";
import GenderSelect from "@/components/Select/GenderSelect";
import useBaseModal from "@/stores/modal/useBaseModal";
import { validateEmail } from "@/utils/validateEmail";
import { useMemo, useState } from "react";

type TouchedState = {
  name: boolean;
  email: boolean;
  password: boolean;
  dob: boolean;
};

const SignUpForm = () => {
  const { openModal } = useBaseModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState({ year: "", month: "", day: "" });
  const [gender, setGender] = useState<Gender | null>(null);
  const [touched, setTouched] = useState<TouchedState>({
    name: false,
    email: false,
    password: false,
    dob: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const shouldShowError = (key: keyof TouchedState) => touched[key] || submitted;

  const nameError = useMemo(() => {
    if (!shouldShowError("name")) return null;
    return name.trim().length === 0 ? "필수 입력 사항입니다" : null;
  }, [name, touched.name, submitted]);

  const emailError = useMemo(() => {
    if (!shouldShowError("email")) return null;
    return validateEmail(email) || null;
  }, [email, touched.email, submitted]);

  const passwordError = useMemo(() => {
    if (!shouldShowError("password")) return null;
    if (!password.trim()) return "필수 입력 사항입니다";
    if (password.length < 8) return "비밀번호 형식이 올바르지 않습니다";
    return null;
  }, [password, touched.password, submitted]);

  const genderError = useMemo(() => {
    if (!submitted) return null;
    return gender ? null : "필수 선택 사항입니다";
  }, [gender, submitted]);

  const dobIsFilled = dob.year.trim() && dob.month.trim() && dob.day.trim();
  const isFormValid = !nameError && !emailError && !passwordError && dobIsFilled && !!gender;

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTouched({ name: true, email: true, password: true, dob: true });

    if (!isFormValid) return;

    // TODO: API 연동

    // 회원가입 완료 모달 오픈
    openModal("AUTH_SIGNUP_SUCCESS");
  };

  const renderField = (label: string, children: React.ReactNode, error: string | null) => (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-[1px] text-[16px] font-medium leading-[1.18] text-gray-950">
        {label} <span className="text-error">*</span>
      </label>
      {children}
      {error && (
        <p className="text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold leading-[24px] text-gray-950">회원가입</h2>

        <div className="mt-[30px] flex flex-col gap-[30px]">
          {renderField(
            "이름",
            <Input
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              hasError={!!nameError}
            />,
            nameError
          )}

          {renderField(
            "이메일",
            <EmailDomainInput
              value={email}
              onChange={setEmail}
              onBlur={() => handleBlur("email")}
              hasError={!!emailError}
            />,
            emailError
          )}

          {renderField(
            "비밀번호",
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              hasError={!!passwordError}
            />,
            passwordError
          )}

          {renderField(
            "생년월일",
            <DateOfBirthInput
              value={dob}
              onChange={setDob}
              touched={shouldShowError("dob")}
              onBlur={() => handleBlur("dob")}
            />,
            null
          )}

          {renderField(
            "성별",
            <GenderSelect value={gender} onChange={setGender} touched={submitted} />,
            genderError
          )}
        </div>
      </div>

      <div className="mt-[60px]">
        <Button onClick={handleSubmit}>회원가입</Button>
      </div>
    </div>
  );
};

export default SignUpForm;
