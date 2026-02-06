import Icon from "@/components/Icon/Icon";

export const GreenBox = () => {
  return (
    <div className="flex min-h-fit items-center justify-center gap-1 border border-brand-green bg-white px-2 py-1 sm:px-2.5">
      <Icon name="check-fill-green" className="w-3" />
      <span className="font-en text-xs font-medium leading-[20px] tracking-[-0.35px] text-brand-green sm:text-sm">
        expert
      </span>
    </div>
  );
};
