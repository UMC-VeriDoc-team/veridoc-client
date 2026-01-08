import React, { useMemo } from "react";

export interface DateOfBirthValue {
  year: string;
  month: string;
  day: string;
}

type DobErrorType = "required" | "invalid" | null;

interface DateOfBirthInputProps {
  value: DateOfBirthValue;
  onChange: (value: DateOfBirthValue) => void;
  touched?: boolean;
  required?: boolean; // 기본 true
  className?: string; // 필요하면 외부에서 추가
  onBlur?: () => void;
}

const isDigits = (v: string) => /^\d+$/.test(v);

const isValidDate = (year: number, month: number, day: number) => {
  if (month < 1 || month > 12) return false;
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
};

const getDobError = (value: DateOfBirthValue, required: boolean): DobErrorType => {
  const y = value.year.trim();
  const m = value.month.trim();
  const d = value.day.trim();

  const allEmpty = y === "" && m === "" && d === "";
  const anyFilled = y !== "" || m !== "" || d !== "";
  const allFilled = y !== "" && m !== "" && d !== "";

  // 아무것도 입력 안함(필수)
  if (required && allEmpty) return "required";
  // 하나라도 입력했는데 다 안 채웠을 때
  if (!allFilled) return null;

  // 일부라도 입력했는데 형식이 이상하면 invalid
  if (anyFilled) {
    if (y.length !== 4 || !isDigits(y)) return "invalid";
    if (m.length < 1 || m.length > 2 || !isDigits(m)) return "invalid";
    if (d.length < 1 || d.length > 2 || !isDigits(d)) return "invalid";

    const yn = Number(y);
    const mn = Number(m);
    const dn = Number(d);

    if (yn < 1900 || yn > 2100) return "invalid";
    if (!isValidDate(yn, mn, dn)) return "invalid";
  }

  return null;
};

const DateOfBirthInput = ({
  value,
  onChange,
  touched = false,
  required = true,
  className = "",
  onBlur,
}: DateOfBirthInputProps) => {
  const errorType = useMemo(() => {
    if (!touched) return null;
    return getDobError(value, required);
  }, [touched, value, required]);

  const errorMessage =
    errorType === "required"
      ? "필수 입력 사항입니다"
      : errorType === "invalid"
        ? "생년월일 형식이 올바르지 않습니다"
        : null;

  const containerClass = [
    "h-[46px] w-full rounded border px-4 text-sm font-normal text-gray-950 outline-none placeholder:text-gray-200",
    "flex items-center justify-between", // 레이아웃: space-between
    errorMessage ? "border-error focus:border-error" : "",
    className,
  ].join(" ");

  const innerInputClass = [
    "border-none bg-transparent outline-none",
    "placeholder:text-gray-200 text-center",
  ].join(" ");

  const slashClass = "text-gray-200";

  const handleChange =
    (key: keyof DateOfBirthValue) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value.replace(/[^\d]/g, ""); // 숫자만 허용
      onChange({ ...value, [key]: next });
    };

  return (
    <div>
      <div
        className={containerClass}
        onBlurCapture={(e) => {
          const next = (e.relatedTarget as Node) || null;
          // 다음 포커스가 이 컴포넌트 내부(year -> month 이동)면 blur X
          if (next && e.currentTarget.contains(next)) return;
          onBlur?.();
        }}
      >
        <input
          inputMode="numeric"
          pattern="\d*"
          maxLength={4}
          placeholder="YYYY"
          value={value.year}
          onChange={handleChange("year")}
          className={`${innerInputClass} w-[100px]`}
          onBlur={onBlur}
        />

        <span className={slashClass}>/</span>

        <input
          inputMode="numeric"
          pattern="\d*"
          maxLength={2}
          placeholder="MM"
          value={value.month}
          onChange={handleChange("month")}
          className={`${innerInputClass} w-[100px]`}
          onBlur={onBlur}
        />

        <span className={slashClass}>/</span>

        <input
          inputMode="numeric"
          pattern="\d*"
          maxLength={2}
          placeholder="DD"
          value={value.day}
          onChange={handleChange("day")}
          className={`${innerInputClass} w-[100px]`}
          onBlur={onBlur}
        />
      </div>

      {errorMessage && (
        <p className="mt-2 text-[14px] font-medium leading-[1.4] tracking-[-0.025em] text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DateOfBirthInput;
