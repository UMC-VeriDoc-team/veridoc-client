export interface GuideItemProps {
  id: string;
  title: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
}

const GuideItem = ({ id, title, description, icon }: GuideItemProps) => {
  return (
    <div id={id} className="flex h-24 w-full rounded-lg border-[3px] border-brand-primarySoft">
      <div className="h-full w-[180px] border-r-[3px] border-brand-primarySoft bg-[#F2F7FF]">
        <img src={icon.src} alt={icon.alt} />
      </div>
      <div className="flex flex-col gap-1 py-5 pl-5">
        <p className="text-base font-medium text-gray-950">{title}</p>
        <p className="text-sm font-medium text-[#ABB7C2]">{description}</p>
      </div>
    </div>
  );
};

export default GuideItem;
