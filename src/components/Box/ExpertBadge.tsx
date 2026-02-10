import Icon from "@/components/Icon/Icon";

interface ExpertBadgeProps {
  text?: string;
  className?: string;
}

const ExpertBadge = ({ text = "expert", className = "" }: ExpertBadgeProps) => {
  return (
    <div
      className={`flex min-h-fit items-center justify-center gap-1 border border-brand-green px-2 py-1 ${className} `}
    >
      <Icon name="check-fill-green" className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span className="font-en text-xs font-medium leading-[20px] tracking-[-0.35px] text-brand-green sm:text-sm md:text-base">
        {text}
      </span>
    </div>
  );
};

export default ExpertBadge;
