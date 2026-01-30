import Info from "@/assets/icons/info.svg?react";
export const OrangeBox = () => {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-center gap-1 border border-[#F17148] bg-white px-2.5">
      <Info height={12} width={12} />
      <span className="font-['Pretendard'] text-[16px] font-medium leading-[20px] tracking-[-0.025em] text-[#F17148]">
        해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료 판단을
        대체하지 않습니다.
      </span>
    </div>
  );
};
