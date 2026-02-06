import Icon from "@/components/Icon/Icon";

export const BlueBox = () => {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1 border border-brand-primary bg-white px-2.5 py-1">
      <Icon name="medical-info" className="w-3" />
      <span className="font-['Pretendard'] text-[14px] font-medium leading-[20px] tracking-[-0.35px] text-[#2B7FFF] md:font-medium md:leading-[20px] md:tracking-[-0.025em] md:text-brand-primary">
        공개 의료 Q&A
      </span>
    </div>
  );
};
