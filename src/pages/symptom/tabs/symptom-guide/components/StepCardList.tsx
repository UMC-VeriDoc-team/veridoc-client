// StepCardList.tsx
import StepCard from "./StepCard";
import type { SymptomGuideStep } from "@/pages/symptom/tabs/symptom-guide/SymptomGuideTab";
import img1 from "/images/test/symptom_test1.png";
import img2 from "/images/test/symptom_test2.jpg";
import img3 from "/images/test/symptom_test3.jpg";
import img4 from "/images/test/symptom_test4.png";

interface StepCardListProps {
  steps: SymptomGuideStep[];
  currentIndex: number;
  completed?: boolean;
}

const W = 255;
const GRID_W = 1020;
const HEADER_H = 72;

const BASE_CARD_H = 455;
const SELECT_CARD_H = 483;
const SELECT_RAISE = 14;

const images = [img1, img2, img3, img4];

const MOBILE_COMPLETED_CENTER_INDEX = 1;

const MOBILE_COMPLETED_GAP = 16;

const StepCardList = ({ steps, currentIndex, completed = false }: StepCardListProps) => {
  const getState = (idx: number) => {
    if (completed) return "done";
    if (idx < currentIndex) return "done";
    if (idx === currentIndex) return "active";
    return "idle";
  };

  const prevIdx = currentIndex - 1;
  const nextIdx = currentIndex + 1;

  const canPrev = prevIdx >= 0;
  const canNext = nextIdx <= steps.length - 1;

  const PEEK_W = 60;
  const PEEK_OFFSET = 16;

  const cur = steps[currentIndex];

  const completedTranslateX =
    typeof window !== "undefined"
      ? window.innerWidth / 2 - (MOBILE_COMPLETED_CENTER_INDEX * (W + MOBILE_COMPLETED_GAP) + W / 2)
      : 0;

  return (
    <div className="w-full overflow-visible">
      <div className="relative overflow-visible">
        {/* 데스크탑 헤더 라인 유지 */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 hidden rounded-[6px] border border-gray-200 bg-white md:block"
          style={{ width: GRID_W, height: HEADER_H }}
        />

        {/* ===================== 모바일 ===================== */}
        {completed ? (
          <div className="w-screen overflow-hidden md:hidden">
            <div
              className="flex items-start"
              style={{
                gap: MOBILE_COMPLETED_GAP,
                transform: `translateX(${completedTranslateX}px)`,
                willChange: "transform",
              }}
            >
              {steps.map((s, idx) => (
                <div key={s.step} className="shrink-0" style={{ width: W, height: BASE_CARD_H }}>
                  <StepCard
                    step={s.step}
                    title={s.title}
                    subtitle={s.subtitle}
                    caption={s.caption}
                    imageUrl={images[idx]}
                    state={getState(idx)}
                    selected={false}
                    completed={true}
                    className="pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto w-screen overflow-visible md:hidden"
            style={{ height: SELECT_CARD_H + SELECT_RAISE }}
          >
            {/* 가운데(현재) 카드 */}
            <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
              <StepCard
                step={cur.step}
                title={cur.title}
                subtitle={cur.subtitle}
                caption={cur.caption}
                imageUrl={images[currentIndex]}
                state={getState(currentIndex)}
                selected={true}
                completed={false}
                className="shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
              />
            </div>

            {/* 왼쪽 peek */}
            {canPrev && (
              <div
                className="absolute left-4 top-[14px] z-10 overflow-hidden"
                style={{
                  width: PEEK_W,
                  height: BASE_CARD_H,
                  transform: `translateX(-${PEEK_OFFSET}px)`,
                }}
              >
                <div style={{ width: W, transform: `translateX(-${W - PEEK_W}px)` }}>
                  <StepCard
                    step={steps[prevIdx].step}
                    title={steps[prevIdx].title}
                    subtitle={steps[prevIdx].subtitle}
                    caption={steps[prevIdx].caption}
                    imageUrl={images[prevIdx]}
                    state={getState(prevIdx)}
                    selected={false}
                    completed={false}
                    className="pointer-events-none"
                  />
                </div>
              </div>
            )}

            {/* 오른쪽 peek */}
            {canNext && (
              <div
                className="absolute right-4 top-[14px] z-10 overflow-hidden"
                style={{
                  width: PEEK_W,
                  height: BASE_CARD_H,
                  transform: `translateX(${PEEK_OFFSET}px)`,
                }}
              >
                <div style={{ width: W }}>
                  <StepCard
                    step={steps[nextIdx].step}
                    title={steps[nextIdx].title}
                    subtitle={steps[nextIdx].subtitle}
                    caption={steps[nextIdx].caption}
                    imageUrl={images[nextIdx]}
                    state={getState(nextIdx)}
                    selected={false}
                    completed={false}
                    className="pointer-events-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== 데스크탑 ===================== */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-0 md:overflow-visible">
          {steps.map((s, idx) => {
            const state = getState(idx);
            const isCurrent = !completed && idx === currentIndex;
            const wrapperH = isCurrent ? SELECT_CARD_H + SELECT_RAISE : BASE_CARD_H;

            return (
              <div
                key={s.step}
                className="relative overflow-visible"
                style={{ width: W, height: wrapperH }}
              >
                <StepCard
                  step={s.step}
                  title={s.title}
                  subtitle={s.subtitle}
                  caption={s.caption}
                  imageUrl={images[idx]}
                  state={state}
                  selected={isCurrent}
                  completed={completed}
                  className={
                    isCurrent
                      ? "absolute left-0 top-[-14px] z-40 cursor-pointer shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
                      : "cursor-default"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepCardList;
