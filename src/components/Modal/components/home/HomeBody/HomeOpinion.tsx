import { BlueBox } from "./HomeOpinion/BlueBox";
import { FullViewButton } from "./HomeOpinion/FullViewButton";
import ExpertBlue from "@/assets/icons/expert-blue.svg?react";
import { OrangeBox } from "./HomeOpinion/OrangeBox";
import { GreenBox } from "./HomeOpinion/GreenBox";
import { DoctorOpinion } from "./HomeOpinion/DoctorOpinion";
import { SYMPTOM_TEXT } from "@/constants/homeSelectButton";

type HomeOpinionProps = {
  symptom: string;
};

export const HomeOpinion = ({ symptom }: HomeOpinionProps) => {
  return (
    <div className="flex flex-col">
      <span className="mb-10 font-['Pretendard'] text-[28px] font-bold leading-[140%] tracking-[-0.025em] text-[#171719]">
        어깨 통증 전문가 소견
      </span>
      <div className="flex gap-[30px]">
        <ExpertBlue />
        <div className="mb-[1px] flex flex-col">
          <span className="mb-[11px] font-['Pretendard'] text-[20px] font-bold leading-[140%] tracking-[-0.025em] text-[#171719]">
            관련 전문의 답변
          </span>
          <div className="mb-[30px] flex gap-2.5">
            <BlueBox />
            <GreenBox />
            <OrangeBox />
          </div>
          <div className="mb-[30px]">
            <DoctorOpinion text={SYMPTOM_TEXT[symptom]} />
          </div>
          <div className="flex justify-end">
            <FullViewButton onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};
