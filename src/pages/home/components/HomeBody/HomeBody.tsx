import { useEffect, useMemo, useState } from "react";

import { HomeSelectButton } from "./HomeSelectButton";
import HomeOpinion from "./HomeOpinion";
import { useHomeStore } from "@/stores/home/useHomeStore";

const HomeBody = () => {
  const { symptoms } = useHomeStore();

  const tags = useMemo(() => {
    return (symptoms ?? [])
      .filter((s) => s?.symptomId != null && s?.name)
      .map((s) => ({
        id: String(s.symptomId),
        label: s.name,
      }));
  }, [symptoms]);

  const [selectedTag, setSelectedTag] = useState<string>("");

  // symptoms가 로딩되면 첫 번째 항목을 기본 선택으로 세팅
  useEffect(() => {
    if (selectedTag) return;
    if (tags.length > 0) setSelectedTag(tags[0].id);
  }, [tags, selectedTag]);

  const handleSelectButtonClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex w-full flex-col gap-y-12 p-[30px] sm:gap-20 sm:p-0">
      <HomeSelectButton onClick={handleSelectButtonClick} tags={tags} selectedTag={selectedTag} />
      <HomeOpinion symptom={selectedTag} />
    </div>
  );
};

export default HomeBody;
