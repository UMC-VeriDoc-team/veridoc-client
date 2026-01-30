import Icon from "@/components/Icon/Icon";

export const GreenBox = () => {
  return (
    <div className="flex h-fit shrink-0 items-center justify-center gap-1 border border-brand-green bg-white px-2.5 py-1">
      <Icon name="check-fill-green" className="w-3" />
      <span className="text-base font-medium leading-[20px] tracking-[-0.025em] text-brand-green">
        expert
      </span>
    </div>
  );
};
