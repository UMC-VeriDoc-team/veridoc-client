import HomeCheck from "@/assets/icons/home-check.svg?react";
export const GreenBox = () => {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-center gap-1 border border-[#33C894] bg-white px-2.5">
      <HomeCheck />
      <span className="font-['Pretendard'] text-[16px] font-medium leading-[20px] tracking-[-0.025em] text-[#33C894]">
        expert
      </span>
    </div>
  );
};
