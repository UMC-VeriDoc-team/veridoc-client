import { DEFUALT_SYMPTOM } from "@/constants/homeSelectButton";
import { HomeOpinion } from "./HomeBody/HomeOpinion";
import { HomeSelectButton } from "./HomeBody/HomeSelectButton";

export const HomeBody = () => {
  return (
    <div>
      <HomeSelectButton tags={DEFUALT_SYMPTOM} />
      <HomeOpinion />
    </div>
  );
};
