import Icon from "@/components/Icon/Icon";

interface SourceButtonProps {
  url?: string | null;
  className?: string; // 전체 레이아웃용
  textClassName?: string; // 텍스트 색상 등
  iconBgClassName?: string; // 아이콘 배경색
}

const SourceButton = ({
  url,
  className = "",
  textClassName = "text-gray-200",
  iconBgClassName = "bg-gray-200",
}: SourceButtonProps) => {
  const handleOpenSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const isDisabled = !url;

  return (
    <button
      type="button"
      onClick={handleOpenSource}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 transition-all ${isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:opacity-80 active:scale-95"} ${className}`}
    >
      <p className={`text-center text-sm font-medium sm:text-base ${textClassName}`}>
        원문 출처 보기
      </p>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full sm:h-6 sm:w-6 ${iconBgClassName}`}
      >
        <Icon name="link" className="w-3 sm:w-[14px]" />
      </div>
    </button>
  );
};

export default SourceButton;
