import Icon from "@/components/Icon/Icon";

export const OrangeBox = () => {
  return (
    <div className="flex h-[55px] shrink-0 items-center gap-1 border border-brand-orange bg-white px-2.5 py-2.5 md:h-auto md:py-1">
      <Icon name="info" className="h-3 w-3 shrink-0" />
      <span className="font-['Pretendard'] text-[14px] font-medium leading-[140%] tracking-[-0.35px] text-[#F17148] md:leading-[20px] md:tracking-[-0.025em]">
        해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료 판단을
        대체하지 않습니다.
      </span>
    </div>
  );
};
