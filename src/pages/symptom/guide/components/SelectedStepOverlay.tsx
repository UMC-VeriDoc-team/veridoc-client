interface SelectedStepOverlayProps {
  step: number;
  title: string;
  subtitle?: string;
  caption: string;
  imageUrl?: string;
  radius: "left" | "middle" | "right";
}

const CARD_W = 255;
const TOTAL_H = 455;

const HEADER_H = 100;
const OVERLAP = 16;
const PHOTO_TOP = HEADER_H - OVERLAP;
const PHOTO_H = TOTAL_H - PHOTO_TOP;

const SelectedStepOverlay = ({
  step,
  title,
  subtitle,
  caption,
  imageUrl,
  radius,
}: SelectedStepOverlayProps) => {
  const radiusClass =
    radius === "left"
      ? "rounded-l-[6px] rounded-r-none"
      : radius === "right"
        ? "rounded-r-[6px] rounded-l-none"
        : "rounded-none";

  return (
    <div className="relative" style={{ width: CARD_W, height: TOTAL_H }}>
      <div
        className={[
          "absolute left-0 overflow-hidden",
          "border-[4px] border-[#2B7FFF]",
          radiusClass,
        ].join(" ")}
        style={{ top: PHOTO_TOP, width: CARD_W, height: PHOTO_H }}
      >
        <div
          className={["absolute inset-0", imageUrl ? "bg-cover bg-center" : "bg-[#D9D9D9]"].join(
            " "
          )}
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        />

        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-brand-primary/90 via-brand-primary/45 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-7">
          <p className="whitespace-pre-line text-[16px] font-extrabold leading-[1.35] tracking-[-0.02em] text-white">
            {caption}
          </p>
        </div>
      </div>

      <div
        className={[
          "absolute left-0 top-0 z-20",
          "flex items-center gap-[10px]",
          "bg-brand-primary text-white",
          "px-[24px] py-[16px]",
          "border-[4px] border-[#2B7FFF]",
          radiusClass,
          "shadow-[0_2px_16px_rgba(0,0,0,0.25)]",
        ].join(" ")}
        style={{ width: CARD_W, height: HEADER_H }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[16px] font-extrabold">
          {step}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[16px] font-extrabold leading-[1.1] tracking-[-0.02em]">
            {title}
          </div>
          {subtitle && (
            <div className="truncate text-[12px] font-semibold tracking-[-0.02em] text-white/90">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedStepOverlay;
