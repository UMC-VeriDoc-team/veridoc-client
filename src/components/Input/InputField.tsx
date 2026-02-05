// InputField.tsx
import { useState } from "react";
import Input from "./Input";
import Icon from "@/components/Icon/Icon";
import { Eye, EyeOff } from "lucide-react";

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
  const showClear = clearable && value.length > 0;
  const showEye = isPassword && value.length > 0;

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const rightPadding = showEye && showClear ? "pr-20" : showEye || showClear ? "pr-14" : "";

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

      {showEye && (
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {showClear && (
        <button
          type="button"
          onClick={onClear ?? (() => onChange({ target: { value: "" } } as any))}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="입력 내용 삭제"
        >
          <Icon name="input-close" />
        </button>
      )}
    </div>
  );
};

export default InputField;
