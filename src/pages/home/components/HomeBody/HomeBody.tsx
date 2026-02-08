import { useEffect, useMemo, useState } from "react";

import { HomeSelectButton } from "./HomeSelectButton";
import HomeOpinion from "./HomeOpinion";
import { useHomeStore } from "@/stores/home/useHomeStore";

const HomeBody = () => {
  const { symptoms } = useHomeStore();

  const tags = useMemo(() => {
    return (symptoms ?? [])
      .filter((s) => s?.answerId != null && s?.name)
      .map((s) => ({
        id: String(s.symptomId),
        label: s.name,
        answerId: String(s.answerId),
      }));
  }, [symptoms]);

  const [selectedTag, setSelectedTag] = useState<string>("");

  // symptoms가 로딩되면 첫 번째 항목을 기본 선택으로 세팅
  useEffect(() => {
    if (selectedTag) return;
    if (tags.length > 0) setSelectedTag(tags[0].id);
  }, [tags, selectedTag]);

  // 선택된 symptomId(selectedTag) -> answerId 매칭
  const selectedAnswerId = useMemo(() => {
    return tags.find((t) => t.id === selectedTag)?.answerId ?? "";
  }, [tags, selectedTag]);

  return (
    <div className="flex w-full flex-col gap-y-12 p-[30px] sm:gap-20 sm:p-0">
      <HomeSelectButton onClick={setSelectedTag} tags={tags} selectedTag={selectedTag} />
      <HomeOpinion answerId={selectedAnswerId} />
    </div>
  );
};

export default HomeBody;
