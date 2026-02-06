import Icon from "@/components/Icon/Icon";

export const GreenBox = () => {
  return (
    <div className="flex h-fit shrink-0 items-center justify-center gap-1 border border-brand-green bg-white px-2.5 py-1">
      <Icon name="check-fill-green" className="w-3" />
      <span className="font-['Roboto'] text-[14px] font-medium leading-[20px] tracking-[-0.35px] text-[#33C894] md:font-medium md:leading-[20px] md:tracking-[-0.025em] md:text-brand-green">
        expert
      </span>
    </div>
  );
};
