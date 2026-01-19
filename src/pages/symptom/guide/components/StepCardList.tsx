import StepCard from "./StepCard";
import type { SymptomGuideStep } from "../SymptomGuideTab";

import img1 from "@/assets/images/test/symptom_test1.png";
import img2 from "@/assets/images/test/symptom_test2.jpg";
import img3 from "@/assets/images/test/symptom_test3.jpg";
import img4 from "@/assets/images/test/symptom_test4.png";

interface StepCardListProps {
  steps: SymptomGuideStep[];
  currentIndex: number;
  completed?: boolean;
}

const W = 255;
const GRID_W = 1020;

const BASE_CARD_H = 455;
const SELECT_CARD_H = 483;
const SELECT_RAISE = 14;

const HEADER_H = 72;

const images = [img1, img2, img3, img4];

const StepCardList = ({ steps, currentIndex, completed = false }: StepCardListProps) => {
  return (
    <div className="w-[1020px] overflow-visible">
      <div className="relative overflow-visible">
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 rounded-[6px] border border-gray-200 bg-white"
          style={{ width: GRID_W, height: HEADER_H }}
        />

        <div className="grid grid-cols-4 gap-0 overflow-visible">
          {steps.map((s, idx) => {
            const state = completed
              ? "done"
              : idx < currentIndex
                ? "done"
                : idx === currentIndex
                  ? "active"
                  : "idle";

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
