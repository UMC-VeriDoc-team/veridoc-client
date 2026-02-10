import type { SymptomTag } from "@/pages/symptom/types/symptom";

type SymptomTagButtonProps = {
  tags: SymptomTag[];
  onClick?: (tagId: string) => void;
  selectedTag?: string;
};

const SymptomTagButton = ({ tags, onClick, selectedTag }: SymptomTagButtonProps) => {
  const handleClick = (tagId: string) => {
    if (onClick) {
      onClick(tagId);
    }
  };
  return (
    <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto sm:px-[30px] sm:pb-4 md:px-0">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleClick(tag.id)}
          className={`flex min-w-[85px] items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200 hover:opacity-80 sm:min-w-[90px] sm:text-lg ${
            selectedTag === tag.id ? "bg-brand-primary text-white" : "bg-gray-50 text-gray-600"
          } `}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};

export default SymptomTagButton;
