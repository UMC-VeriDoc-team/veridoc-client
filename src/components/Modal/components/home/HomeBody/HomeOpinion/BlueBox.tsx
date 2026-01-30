import Icon from "@/components/Icon/Icon";

export const BlueBox = () => {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1 border border-brand-primary bg-white px-2.5 py-1">
      <Icon name="medical-info" className="w-3" />
      <span className="text-base font-medium leading-[20px] tracking-[-0.025em] text-brand-primary">
        공개 의료 Q&A
      </span>
    </div>
  );
};
