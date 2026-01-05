import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button = ({ fullWidth = true, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={[
        "h-12 rounded bg-brand-primary px-[10px] font-medium text-white transition hover:opacity-90",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    />
  );
};

export default Button;
