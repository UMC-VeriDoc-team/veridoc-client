interface StepDescriptionProps {
  step: number;
  description: string;
  top: number; // 말풍선 y좌표 (부모 기준)
  left: number; // 말풍선 x좌표 (부모 기준)
  side: "left" | "right" | "center"; // step1~2: left, step3~4: right
  headerText?: string;
}

const BOX_W = 468;
const BOX_H = 113;

const BORDER = 3;
const RADIUS = 12;

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
      className="absolute z-50 bg-white"
      style={{
        top,
        left,
        width: BOX_W,
        height: BOX_H,
        borderRadius: RADIUS,
        borderWidth: BORDER,
        borderStyle: "solid",
        borderColor: "#2B7FFF",
        padding: "24px 32px",
        boxSizing: "border-box",
      }}
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

      <div
        className="flex flex-col"
        style={{
          width: "100%",
          maxWidth: 420,
          height: 64,
          gap: 8,
        }}
      >
        <div
          style={{
            height: 21,
            fontFamily: "Roboto",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: "100%",
            letterSpacing: "0",
            color: "#2B7FFF",
          }}
        >
          {title}
        </div>

        <p
          className="whitespace-pre-line"
          style={{
            height: 40,
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: 13,
            lineHeight: "20px",
            letterSpacing: "-0.025em",
            color: "#2B7FFF",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepDescription;
