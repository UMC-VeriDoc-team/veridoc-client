type TabKey = "life" | "guide";

interface SymptomTabsProps {
  value: TabKey;
  onChange: (v: TabKey) => void;
}

export const SymptomTabs = ({ value, onChange }: SymptomTabsProps) => {
  return (
    <div
      className={[
        "flex h-[48px] w-[354px] rounded-[10px] bg-gray-50 p-[6px]",
        "md:h-[69px] md:w-full md:max-w-[777px] md:p-0 md:px-[11px] md:py-[10px]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onChange("life")}
        className={[
          "flex-1 rounded-[10px] text-[16px] font-bold leading-[140%] tracking-[-0.025em] transition",
          "md:h-[50px] md:w-[371px] md:text-xl",
          value === "life" ? "bg-white text-gray-950" : "text-gray-950",
        ].join(" ")}
      >
        생활 관리
      </button>

      <button
        type="button"
        onClick={() => onChange("guide")}
        className={[
          "ml-2 flex-1 rounded-[10px] text-[16px] font-bold leading-[140%] tracking-[-0.025em] transition",
          "md:ml-[13px] md:h-[50px] md:w-[371px] md:text-xl",
          value === "guide" ? "bg-white text-gray-950" : "text-gray-950",
        ].join(" ")}
      >
        증상 가이드
      </button>
    </div>
  );
};
