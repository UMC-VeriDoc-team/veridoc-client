import Icon from "@/components/Icon/Icon";

interface MedicalInfoBadgeProps {
  hasBg?: boolean;
  className?: string;
}

const MedicalInfoBadge = ({ hasBg = false, className = "" }: MedicalInfoBadgeProps) => {
  return (
    <div
      className={`flex min-h-fit items-center justify-center gap-1 border border-brand-primary px-2 py-1 ${hasBg ? "bg-white px-1 sm:px-2.5" : "shrink-0"} ${className} `}
    >
      <Icon name="medical-info" className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span className="text-center text-xs font-medium leading-[20px] tracking-[-0.35px] text-brand-primary sm:text-sm md:text-base">
        공개 의료 Q&A
      </span>
    </div>
  );
};

export default MedicalInfoBadge;
