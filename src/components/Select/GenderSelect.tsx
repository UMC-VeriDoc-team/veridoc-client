import { useMemo } from "react";

export type Gender = "MALE" | "FEMALE";

interface GenderSelectProps {
  value: Gender | null;
  onChange: (value: Gender) => void;
  touched?: boolean;
  required?: boolean;
  className?: string;
}

const GenderSelect = ({
  value,
  onChange,
  touched = false,
  required = true,
  className = "",
}: GenderSelectProps) => {
  const errorMessage = useMemo(() => {
    if (!touched || !required || value !== null) return null;
    return "필수 선택 사항입니다";
  }, [touched, required, value]);

  const isError = !!errorMessage;

  const getButtonClass = (isSelected: boolean) => {
    const base =
      "flex h-[36px] w-[73px] items-center justify-center rounded-[5px] border px-[10px] text-[14px] font-medium leading-[1.4] tracking-[-0.025em] transition";

    if (isError) return `${base} border-error bg-gray-50 text-gray-600 text-medium`;
    if (isSelected) return `${base} border-brand-primary bg-white text-brand-primary`;
    return `${base} border-gray-50 bg-gray-50 text-gray-100`;
  };

  return (
    <div className={`flex h-[36px] w-[404px] gap-[7px] ${className}`}>
      <button
        type="button"
        className={getButtonClass(value === "MALE")}
        onClick={() => onChange("MALE")}
        aria-pressed={value === "MALE"}
      >
        남성
      </button>

      <button
        type="button"
        className={getButtonClass(value === "FEMALE")}
        onClick={() => onChange("FEMALE")}
        aria-pressed={value === "FEMALE"}
      >
        여성
      </button>
    </div>
  );
};

export default GenderSelect;
