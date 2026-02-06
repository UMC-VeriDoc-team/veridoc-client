import Icon from "@/components/Icon/Icon";

export const OrangeBox = () => {
  return (
    <div className="flex min-h-fit w-full items-center gap-x-3 border border-brand-orange bg-white px-2.5 py-2.5 sm:h-auto sm:py-1">
      <Icon name="info" className="h-3 w-3 shrink-0" />
      <span className="text-[13px] font-medium leading-[140%] tracking-[-0.35px] text-brand-orange sm:text-sm">
        해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료 판단을
        대체하지 않습니다.
      </span>
    </div>
  );
};
