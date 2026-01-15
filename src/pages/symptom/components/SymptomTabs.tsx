type TabKey = "life" | "guide";

interface SymptomTabsProps {
  value: TabKey;
  onChange: (v: TabKey) => void;
}

export const SymptomTabs = ({ value, onChange }: SymptomTabsProps) => {
  return (
    <div className="flex h-[69px] w-full max-w-[777px] rounded-[10px] bg-gray-50 px-[11px] py-[10px]">
      <button
        type="button"
        onClick={() => onChange("life")}
        className={[
          "h-[50px] w-[371px] rounded-[10px] text-[20px] font-bold leading-[140%] tracking-[-0.025em] transition",
          value === "life" ? "bg-white text-[#000000]" : "text-gray-400",
        ].join(" ")}
      >
        생활 관리
      </button>

      <button
        type="button"
        onClick={() => onChange("guide")}
        className={[
          "ml-[13px] h-[50px] w-[371px] rounded-[10px] text-[20px] font-bold leading-[140%] tracking-[-0.025em] transition",
          value === "guide" ? "bg-white text-[#000000]" : "text-gray-400",
        ].join(" ")}
      >
        증상 가이드
      </button>
    </div>
  );
};
