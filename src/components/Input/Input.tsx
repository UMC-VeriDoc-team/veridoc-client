import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = ({ hasError = false, className = "", ...props }: InputProps) => {
  return (
    <input
      className={[
        "h-[46px] w-full rounded border px-4 text-xs font-normal text-gray-950 outline-none placeholder:text-gray-200 sm:text-sm",
        "focus:border-brand-primary",
        hasError ? "border-error focus:border-error" : "",
        className,
      ].join(" ")}
      {...props}
    />
  );
};

export default Input;
