interface StepDescriptionProps {
  step: number;
  description: string;
  top: number;
  left: number;
  side: "left" | "right" | "center";
  headerText?: string;
}

const BOX_W = 468;
const TAIL_W = 18;
const TAIL_H = 8;

const StepDescription = ({
  step,
  description,
  top,
  left,
  side,
  headerText,
}: StepDescriptionProps) => {
  const title = headerText ?? `Step ${step}`;

  // 꼬리 위치
  // - 모바일: 항상 왼쪽(18px)
  // - md 이상: side 기준
  const tailLeft =
    typeof window !== "undefined" && window.innerWidth < 768
      ? 18
      : side === "center"
        ? (BOX_W - TAIL_W) / 2
        : side === "left"
          ? 18
          : BOX_W - 18 - TAIL_W;

  return (
    <div
      className={[
        "absolute z-50 box-border bg-white",
        "rounded-[12px] border-[3px] border-brand-primary",
        "px-4 py-5",
        // 모바일
        "w-[354px] max-w-full",
        // 데스크탑
        "md:h-[113px] md:w-[468px] md:px-8 md:py-4",
      ].join(" ")}
      style={{ top, left }}
    >
      <div
        className="absolute"
        style={{
          left: tailLeft,
          top: -TAIL_H,
          width: 0,
          height: 0,
          borderLeft: `${TAIL_W / 2}px solid transparent`,
          borderRight: `${TAIL_W / 2}px solid transparent`,
          borderBottom: `${TAIL_H}px solid #2B7FFF`,
        }}
      />

      <div className="flex w-full flex-col gap-2">
        <div className="text-[16px] font-bold leading-none text-brand-primary md:text-lg">
          {title}
        </div>

        <p className="whitespace-pre-line text-[13px] font-medium leading-5 tracking-[-0.025em] text-brand-primary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepDescription;
