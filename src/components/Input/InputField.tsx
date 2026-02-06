import { useMemo, useState } from "react";
import Input from "./Input";
import Icon from "@/components/Icon/Icon";

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: "text" | "password";
  hasError?: boolean;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const InputField = ({
  value,
  onChange,
  onClear,
  onBlur,
  placeholder,
  type = "text",
  hasError,
  clearable,
  passwordToggle,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = passwordToggle && type === "password";
  const showEye = isPassword && value.length > 0;
  const showClear = clearable && value.length > 0 && !!onClear;

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const rightPadding = useMemo(() => {
    if (showEye && showClear) return "pr-[85px]";
    if (showEye || showClear) return "pr-10";
    return "";
  }, [showEye, showClear]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type={inputType}
        hasError={hasError}
        className={rightPadding}
      />

      {(showEye || showClear) && (
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {showEye && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="flex h-[20px] w-[20px] items-center justify-center text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              <Icon name={showPassword ? "password-eye-off" : "password-eye"} className="h-6 w-6" />
            </button>
          )}

          {showClear && (
            <button
              type="button"
              onClick={onClear}
              className="flex h-[14px] w-[14px] items-center justify-center text-gray-400 hover:text-gray-600"
              aria-label="입력 내용 삭제"
            >
              <Icon name="input-close" className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
