import type { SymptomTag } from "@/types/symptom";

type HomeSelectButtonProps = {
  tags: SymptomTag[];
  onClick?: (tagId: string) => void;
  selectedTag?: string;
};

export const HomeSelectButton = ({ tags, onClick, selectedTag }: HomeSelectButtonProps) => {
  const handleClick = (tagId: string) => {
    if (onClick) {
      onClick(tagId);
    }
  };
  return (
    <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto pb-4">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleClick(tag.id)}
          className={`flex min-w-[90px] items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-lg font-semibold transition-colors duration-200 hover:opacity-80 ${
            selectedTag === tag.id ? "bg-brand-primary text-white" : "bg-gray-50 text-gray-600"
          } `}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};
