interface StepDescriptionProps {
  step: number;
  description: string;
  top: number; // 말풍선 y좌표 (부모 기준)
  left: number; // 말풍선 x좌표 (부모 기준)
  side: "left" | "right" | "center"; // step1~2: left, step3~4: right
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
  // 꼬리 x (박스 기준)
  const tailLeft =
    side === "center" ? (BOX_W - TAIL_W) / 2 : side === "left" ? 18 : BOX_W - 18 - TAIL_W;

  const title = headerText ?? `Step ${step}`;

  return (
    <div
      className={[
        "absolute z-50 box-border bg-white",
        "border-[3px] border-solid border-brand-primary",
        "rounded-[12px]",
        "px-8 py-6",
        "h-[113px] w-[468px]",
      ].join(" ")}
      style={{ top, left }}
    >
      <div
        className="absolute mt-[-1px]"
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

      <div className="flex h-16 w-full max-w-[420px] flex-col gap-2">
        <div className="h-[21px] text-lg font-bold leading-none tracking-normal text-brand-primary">
          {title}
        </div>

        <p className="h-10 whitespace-pre-line text-[13px] font-medium leading-5 tracking-[-0.025em] text-brand-primary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepDescription;
