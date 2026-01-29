import { FullViewButton } from "./HomeOpinion/FullViewButton";
import ExpertBlue from "@/assets/icons/expert-blue.svg?react";
export const HomeOpinion = () => {
  return (
    <div>
      <div className="font-['Pretendard'] text-[28px] font-bold leading-[140%] tracking-[-0.025em] text-[#171719]">
        어깨 통증 전문가 소견
      </div>
      <div className="aspect-[141/142] h-[285px] w-[283px]">
        <ExpertBlue />
      </div>
      <FullViewButton
        onClick={() => {
          console.log("clicked");
        }}
      />
    </div>
  );
};
