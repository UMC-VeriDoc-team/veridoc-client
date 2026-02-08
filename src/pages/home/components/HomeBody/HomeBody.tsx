import { useMemo, useState } from "react";

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

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const selectedTagId = selectedTag ?? tags[0]?.id ?? "";
  const selectedAnswerId = useMemo(() => {
    return tags.find((t) => t.id === selectedTagId)?.answerId ?? "";
  }, [tags, selectedTagId]);

  const handleSelectButtonClick = (tagId: string) => {
    setSelectedTag(tagId);
  };

  return (
    <div className="flex w-full flex-col gap-y-12 p-[30px] sm:gap-20 sm:p-0">
      <HomeSelectButton onClick={handleSelectButtonClick} tags={tags} selectedTag={selectedTagId} />

      {/* answerId가 준비됐을 때만 렌더링 */}
      {selectedAnswerId ? <HomeOpinion answerId={selectedAnswerId} /> : null}
    </div>
  );
};

export default HomeBody;
