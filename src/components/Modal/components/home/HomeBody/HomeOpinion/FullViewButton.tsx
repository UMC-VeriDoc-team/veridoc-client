import ArrowRight from "@/assets/icons/arrow-right.svg?react";
import type { ButtonHTMLAttributes } from "react";

export const FullViewButton = ({ onClick }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-[#2B7FFF] px-4 py-2"
    >
      <div className="font-['Pretendard'] text-[18px] font-semibold uppercase leading-[24px] tracking-[-0.045em] text-[#FFF]">
        전체 보기
      </div>
      <ArrowRight />
    </button>
  );
};
