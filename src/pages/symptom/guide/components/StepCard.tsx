import Icon from "@/components/Icon/Icon";

type StepState = "idle" | "done" | "active";

interface StepCardProps {
  step: number;
  title: string;
  subtitle?: string;
  caption?: string;
  imageUrl?: string;
  state: StepState;
  selected?: boolean;
  completed?: boolean;
  onClick?: () => void;
  className?: string;
}

const W = 255;

const BASE_H = 455;
const BASE_HEADER_H = 72;
const OVERLAP = 16;
const PHOTO_VISIBLE_H = 393;

const BASE_PHOTO_TOP = BASE_HEADER_H - OVERLAP;
const BASE_BOTTOM_GAP = BASE_H - (BASE_PHOTO_TOP + PHOTO_VISIBLE_H);

const SELECT_EXTRA = 22;
const SELECT_H = BASE_H + SELECT_EXTRA;
const SELECT_HEADER_H = 100;

const SELECT_PHOTO_TOP = BASE_PHOTO_TOP + 28;
const SELECT_PHOTO_H = PHOTO_VISIBLE_H;

const StepCard = ({
  step,
  title,
  subtitle,
  caption,
  imageUrl,
  state,
  selected = false,
  completed = false,
  onClick,
  className,
}: StepCardProps) => {
  const isDone = state === "done";

  // 완료 전에는 선택된 카드만 컬러, 나머지는 전부 흑백
  // 완료 후에는 전부 컬러
  const dimmed = !completed && !selected;

  const cardH = selected ? SELECT_H : BASE_H;

  return (
    <button
      type="button"
      onClick={onClick}
      className={["relative block overflow-visible rounded-[6px] text-left", className]
        .filter(Boolean)
        .join(" ")}
      style={{ width: W, height: cardH }}
    >
      {selected ? (
        <>
          {/* 선택: 사진 */}
          <div
            className="absolute left-0 z-0 overflow-hidden rounded-b-[6px] rounded-t-none border-[4px] border-brand-primary"
            style={{ top: SELECT_PHOTO_TOP, width: W, height: SELECT_PHOTO_H }}
          >
            <div
              className={[
                "absolute inset-0",
                imageUrl ? "bg-cover bg-center" : "bg-[#D9D9D9]",
              ].join(" ")}
              style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
            />

            {/* 선택 상태는 그라데이션 항상 */}
            <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-brand-primary/90 via-brand-primary/45 to-transparent" />

            {/* 완료 전에서만 선택 카드 caption 표시 / 완료 후엔 caption 없음 */}
            {!completed && caption && (
              <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-7">
                <div
                  className="flex items-center justify-center whitespace-pre-line text-center"
                  style={{
                    width: 219,
                    height: 73,
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: "120%",
                    letterSpacing: "-0.025em",
                  }}
                >
                  <span className="text-white">{caption}</span>
                </div>
              </div>
            )}
          </div>

          {/* 선택된 파란 헤더 */}
          <div
            className={[
              "absolute left-0 top-0 z-10",
              "flex items-center gap-[10px]",
              "border-[4px] border-brand-primary",
              "bg-brand-primary text-white",
              "px-[10px] py-[16px]",
              "rounded-[6px]",
            ].join(" ")}
            style={{ width: W, height: SELECT_HEADER_H }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-[18px] font-semibold leading-none">
              {step}
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="line-clamp-2 text-[18px] font-medium leading-[20px] tracking-[-0.025em]">
                {title}
              </div>

              {subtitle && (
                <div className="line-clamp-2 text-[14px] font-medium leading-[18px] tracking-[-0.025em] text-white/90">
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 미선택: 사진 */}
          <div
            className="absolute left-0 z-0 overflow-hidden rounded-t-none"
            style={{ top: BASE_PHOTO_TOP, width: W, height: PHOTO_VISIBLE_H }}
          >
            <div
              className={[
                "absolute inset-0",
                imageUrl ? "bg-cover bg-center" : "bg-[#D9D9D9]",
                dimmed ? "grayscale" : "",
              ].join(" ")}
              style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
            />

            {/* 완료 후(completed=true)일 때만 전체 그라데이션 */}
            {completed && (
              <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-brand-primary/90 via-brand-primary/45 to-transparent" />
            )}

            {/* 완료 후에는 caption 없음 */}
          </div>

          {BASE_BOTTOM_GAP > 0 && (
            <div
              className="absolute bottom-0 left-0"
              style={{ width: W, height: BASE_BOTTOM_GAP }}
            />
          )}

          {/* 미선택 헤더 */}
          <div
            className={[
              "absolute left-0 top-0 z-10 flex items-center gap-3 px-5",
              "bg-transparent",
              "rounded-none",
            ].join(" ")}
            style={{ width: W, height: BASE_HEADER_H }}
          >
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-[16px] font-extrabold",
                isDone
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-300 bg-white text-gray-500",
              ].join(" ")}
            >
              {isDone ? <Icon name="check-white" className="h-5 w-5" /> : step}
            </div>

            <div className="min-w-0">
              <div
                className={[
                  "whitespace-normal break-keep text-[16px] font-medium leading-[20px] tracking-[-0.025em]",
                  isDone ? "text-brand-primary" : "text-gray-600",
                ].join(" ")}
              >
                {title}
              </div>

              {subtitle && (
                <div className="whitespace-normal break-keep text-[13px] font-medium leading-[20px] tracking-[-0.025em] text-gray-200">
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </button>
  );
};

export default StepCard;
