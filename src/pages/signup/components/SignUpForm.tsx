import { useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import DateOfBirthInput from "@/components/Input/DateOfBirthInput";
import EmailDomainInput from "@/components/Input/EmailDomainInput";
import InputField from "@/components/Input/InputField";
import type { Gender } from "@/components/Select/GenderSelect";
import GenderSelect from "@/components/Select/GenderSelect";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { validateEmail } from "@/utils/validateEmail";
import useSignupSymptomStore from "@/stores/signup/useSignupSymptomStore";
import { useSignup } from "../hooks/useSignup";
import { PASSWORD_REGEX } from "@/utils/vaildatePassword";
import type { SignupPayload } from "../services/postSignup";

type TouchedState = {
  name: boolean;
  email: boolean;
  password: boolean;
  dob: boolean;
};

const SignUpForm = () => {
  const { openModal } = useBaseModal();
  const { loading, fieldErrors, formError, clearFieldError, signup } = useSignup();

  // 서버로 보낼 painAreaID를 store에서 바로 가져오기(선택->ID매칭 다시 안해도 됨)
  const painAreaID = useSignupSymptomStore((s) => s.selectedPainAreaID);

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

  const nameClientError = useMemo(() => {
    if (!shouldShowError("name")) return null;
    return name.trim().length === 0 ? "필수 입력 사항입니다" : null;
  }, [name, touched.name, submitted]);

  const emailClientError = useMemo(() => {
    if (!shouldShowError("email")) return null;
    return validateEmail(email) || null;
  }, [email, touched.email, submitted]);

  const passwordClientError = useMemo(() => {
    if (!shouldShowError("password")) return null;
    if (!password.trim()) return "필수 입력 사항입니다";
    if (!PASSWORD_REGEX.test(password))
      return "비밀번호는 8자 이상이며 대문자/소문자/특수문자를 각각 1개 이상 포함해야 합니다";
    return null;
  }, [password, touched.password, submitted]);

  const genderClientError = useMemo(() => {
    if (!submitted) return null;
    return gender ? null : "필수 선택 사항입니다";
  }, [gender, submitted]);

  const dobIsFilled = Boolean(dob.year.trim() && dob.month.trim() && dob.day.trim());

  const nameError = nameClientError ?? fieldErrors.name ?? null;
  const emailError = emailClientError ?? fieldErrors.email ?? null;
  const passwordError = passwordClientError ?? fieldErrors.password ?? null;
  const dobError = fieldErrors.birth ?? null;
  const genderError = genderClientError ?? fieldErrors.gender ?? null;

  const isFormValid =
    !nameClientError && !emailClientError && !passwordClientError && dobIsFilled && !!gender;

  const handleBlur = (field: keyof TouchedState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setTouched({ name: true, email: true, password: true, dob: true });

    if (!isFormValid) return;

    const birth = `${dob.year}-${dob.month.padStart(2, "0")}-${dob.day.padStart(2, "0")}`;

    const payload: SignupPayload = {
      name: name.trim(),
      email: email.trim(),
      password,
      birth,
      gender: gender as Gender,
      painAreaID: painAreaID ?? null,
    };

    try {
      await signup(payload);
      openModal(ModalType.AUTH_SIGNUP_SUCCESS);
    } catch {
      // useSignup에서 fieldErrors/formError 세팅
    }
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
            <InputField
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              onBlur={() => handleBlur("name")}
              hasError={!!nameError}
              clearable
              onClear={() => setName("")}
            />,
            nameError
          )}

          {renderField(
            "이메일",
            <EmailDomainInput
              value={email}
              onChange={(next) => {
                setEmail(next);
                clearFieldError("email");
              }}
              onBlur={() => handleBlur("email")}
              hasError={!!emailError}
            />,
            emailError
          )}

          {renderField(
            "비밀번호",
            <InputField
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              onBlur={() => handleBlur("password")}
              hasError={!!passwordError}
              passwordToggle
              clearable
              onClear={() => setPassword("")}
            />,
            passwordError
          )}

          {renderField(
            "생년월일",
            <DateOfBirthInput
              value={dob}
              onChange={(next) => {
                setDob(next);
                clearFieldError("birth");
              }}
              touched={shouldShowError("dob")}
              onBlur={() => handleBlur("dob")}
            />,
            dobError
          )}

          {renderField(
            "성별",
            <GenderSelect
              value={gender}
              onChange={(next) => {
                setGender(next);
                clearFieldError("gender");
              }}
              touched={submitted}
            />,
            genderError
          )}
        </div>

        {formError && (
          <p className="mt-4 text-[14px] font-medium leading-[1.18] tracking-[-0.025em] text-error">
            {formError}
          </p>
        )}
      </div>

      <div className="mt-[60px]">
        <Button type="button" onClick={handleSubmit} disabled={loading}>
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
