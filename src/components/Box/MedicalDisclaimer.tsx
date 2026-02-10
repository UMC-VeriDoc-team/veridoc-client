import Icon from "@/components/Icon/Icon";

interface MedicalDisclaimerProps {
  type?: "default" | "summary" | "measure" | "life" | "usage";
  text?: string;
  className?: string;
}

const TEXTS = {
  default:
    "본 내용은 공개된 의료 상담을 바탕으로 정리된 정보이며, 개인의 상태에 따라 다를 수 있습니다. 통증이 지속되거나 심해질 경우 의료기관 방문이 필요할 수 있습니다.",
  summary:
    "해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다.  개인 진단이나 치료 판단을 대체하지 않습니다.",
  measure:
    "본 콘텐츠는 의료기관에서 제공하는 건강 정보 콘텐츠를 기준으로 베리닥 내부 검토 및 정제 과정을 거쳐 구성되었습니다. 본 내용은 의료 진단이나 치료를 대체하지 않습니다.",
  life: "해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료 판단을 대체하지 않습니다.",
  usage: "본 내용은 일반적인 건강 정보 안내이며, 개인의 상태에 따라 다르게 느껴질 수 있습니다.",
};

const MedicalDisclaimer = ({ type = "default", text, className = "" }: MedicalDisclaimerProps) => {
  return (
    <div
      className={`flex w-full items-center gap-4 border border-brand-orange px-5 sm:gap-5 ${className}`}
    >
      <Icon name="info" className="h-5 w-5 shrink-0 text-brand-orange" />
      <p className="text-sm font-medium text-brand-orange sm:text-base">{text || TEXTS[type]}</p>
    </div>
  );
};

export default MedicalDisclaimer;
