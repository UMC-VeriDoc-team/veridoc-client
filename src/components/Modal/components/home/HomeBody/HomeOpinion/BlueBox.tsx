import PlusChat from "@/assets/icons/plus-chatting.svg?react";
export const BlueBox = () => {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-center gap-1 border border-[#2B7FFF] bg-white px-2.5">
      <PlusChat />
      <span className="font-['Pretendard'] text-[16px] font-medium leading-[20px] tracking-[-0.025em] text-[#2B7FFF]">
        공개 의료 Q&A
      </span>
    </div>
  );
};
