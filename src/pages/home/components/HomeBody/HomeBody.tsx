import { useState } from "react";
import { SHOULDER_SYMPTOM } from "@/constants/homeSelectButton";
import { HomeSelectButton } from "./HomeSelectButton";
import HomeOpinion from "./HomeOpinion";

const HomeBody = () => {
  //TODO: SHOULDER_SYMPTOM 같은 경우는 Zustand로 상태관리 예정
  const [selectedTag, setSelectedTag] = useState(SHOULDER_SYMPTOM[0]?.id || "");

  const handleSelectButtonClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex w-full flex-col gap-20">
      <HomeSelectButton
        onClick={handleSelectButtonClick}
        tags={SHOULDER_SYMPTOM}
        selectedTag={selectedTag}
      />
      <HomeOpinion symptom={selectedTag} />
    </div>
  );
};

export default HomeBody;
