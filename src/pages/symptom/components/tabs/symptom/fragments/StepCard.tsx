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
  const dimmed = !completed && !selected;
  const cardH = selected ? SELECT_H : BASE_H;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative block text-left",
        // 모바일: 미선택은 각지게 / 선택은 라운드 유지
        selected ? "rounded-[6px]" : "rounded-none md:rounded-[6px]",
        "overflow-hidden md:overflow-visible",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: W, height: cardH }}
    >
      {/* 모바일 미선택 */}
      {!selected && (
        <>
          <div className="absolute inset-0 z-0 bg-white md:hidden" />

          <div
            className="absolute left-0 top-0 z-[5] border border-gray-400 bg-white md:hidden"
            style={{ width: W, height: BASE_HEADER_H }}
          />
        </>
      )}

      {selected ? (
        <>
          {/* 선택: 사진 */}
          <div
            className={[
              "absolute left-0 z-0 overflow-hidden",
              "rounded-b-[6px] rounded-t-none",
              "border-[4px] border-brand-primary",
            ].join(" ")}
            style={{ top: SELECT_PHOTO_TOP, width: W, height: SELECT_PHOTO_H }}
          >
            <div
              className={[
                "absolute inset-0",
                imageUrl ? "bg-cover bg-center" : "bg-[#D9D9D9]",
              ].join(" ")}
              style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
            />

            <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-brand-primary/90 via-brand-primary/45 to-transparent" />

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
                <div className="line-clamp-2 text-[14px] font-medium leading-[18px] tracking-[-0.025em] text-white">
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 미선택: 사진 (모바일은 각지게) */}
          <div
            className={[
              "absolute left-0 z-0 overflow-hidden",
              "rounded-none md:rounded-t-none",
            ].join(" ")}
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

            {dimmed && <div className="absolute inset-0 bg-black/30" />}

            {completed && (
              <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-brand-primary/90 via-brand-primary/45 to-transparent" />
            )}
          </div>

          {BASE_BOTTOM_GAP > 0 && (
            <div
              className="absolute bottom-0 left-0"
              style={{ width: W, height: BASE_BOTTOM_GAP }}
            />
          )}

          {/* 미선택 헤더: 모바일에서만 border 추가 + 각지게 */}
          <div
            className={[
              "absolute left-0 top-0 z-10 flex items-center gap-3 px-5",
              "md:bg-transparent",
              "rounded-none",
            ].join(" ")}
            style={{ width: W, height: BASE_HEADER_H }}
          >
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-[16px] font-extrabold",
                isDone
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-300 bg-white text-gray-200",
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
