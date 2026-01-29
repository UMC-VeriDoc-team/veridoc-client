import type { SymptomTag } from "@/types/syptom";
import { useState } from "react";

type HomeSelectButtonProps = {
  tags: SymptomTag[];
  onClick?: (tagId: string) => void;
};
export const HomeSelectButton = ({ tags, onClick }: HomeSelectButtonProps) => {
  const [selectedTag, setSelectedTag] = useState(tags[0]?.id || "");
  const handleClick = (tagId: string) => {
    setSelectedTag(tagId);
    if (onClick) {
      onClick(tagId);
    }
  };
  return (
    <div className="scrollbar-hide flex w-full gap-[10px] overflow-x-auto pb-4">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleClick(tag.id)}
          className={`flex h-[40px] items-center justify-center whitespace-nowrap rounded-full px-[28px] text-[15px] font-bold transition-colors duration-200 ${
            selectedTag === tag.id ? "bg-blue-500 text-white" : "bg-[#F7F7F8] text-[#8E9398]"
          } `}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};
