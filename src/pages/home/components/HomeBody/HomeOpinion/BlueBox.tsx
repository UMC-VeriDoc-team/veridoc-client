import Icon from "@/components/Icon/Icon";

export const BlueBox = () => {
  return (
    <div className="flex min-h-fit shrink-0 items-center justify-center gap-1 border border-brand-primary bg-white px-1 py-1 sm:px-2.5">
      <Icon name="medical-info" className="w-3" />
      <span className="text-xs font-medium leading-[20px] tracking-[-0.35px] text-brand-primary sm:text-sm">
        공개 의료 Q&A
      </span>
    </div>
  );
};
