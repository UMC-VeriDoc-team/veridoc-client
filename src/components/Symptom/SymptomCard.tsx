import Icon from "@/components/Icon/Icon";

interface SymptomCardProps {
  label: string;
  iconName: string;
  selected?: boolean;
  multiAttempted?: boolean;
  onClick?: () => void;
}

const SymptomCard = ({
  label,
  iconName,
  selected = false,
  multiAttempted = false,
  onClick,
}: SymptomCardProps) => {
  const borderClass = multiAttempted
    ? "border-[2px] border-[#FF3939]"
    : selected
      ? "border-[2px] border-[#FAE164]"
      : "";

  const labelOverlayClass = multiAttempted
    ? "bg-[#FF393980] backdrop-blur-sm"
    : selected
      ? "bg-[#FAE16480] backdrop-blur-sm"
      : "";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col overflow-hidden",
        "h-[163px] w-[137px]",
        "bg-white",
        "shadow-[1px_2px_6px_0px_rgba(0,0,0,0.25)]",
        "focus:outline-none",
        borderClass,
      ].join(" ")}
    >
      <div className="h-[127px] w-[137px]">
        <Icon name={iconName} className="h-full w-full object-cover" />
      </div>

      <div className="relative h-[36px] w-full">
        {(selected || multiAttempted) && (
          <div className={`absolute inset-0 ${labelOverlayClass}`} />
        )}

        <div className="relative flex h-full w-full items-center justify-center">
          <span className="text-[18px] font-semibold leading-[1] tracking-[-0.025em] text-gray-950">
            {label}
          </span>
        </div>
      </div>
    </button>
  );
};

export default SymptomCard;
