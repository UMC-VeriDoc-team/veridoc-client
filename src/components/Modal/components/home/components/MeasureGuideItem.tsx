export interface GuideItemProps {
  id: string;
  bold: string;
  text: string;
  icon: {
    src: string;
    alt: string;
  };
}

const TemporaryMeasureGuideItem = ({ id, bold, text, icon }: GuideItemProps) => {
  return (
    <div
      id={id}
      className="flex h-[130px] w-full rounded-lg border-[3px] border-brand-primarySoft sm:h-24 sm:max-h-[140px]"
    >
      <div className="h-full min-w-[144px] max-w-[144px] border-r-[3px] border-brand-primarySoft bg-[#F2F7FF] sm:min-w-[186px] sm:max-w-[186px]">
        <img src={icon.src} alt={icon.alt} className="h-full w-full" />
      </div>
      <div className="flex flex-col justify-center p-2 sm:gap-1 sm:py-5 sm:pl-5">
        <p className="text-sm font-medium text-gray-950 sm:text-base">{bold}</p>
        <p className="text-xs font-medium text-[#ABB7C2] sm:text-sm">{text}</p>
      </div>
    </div>
  );
};

export default TemporaryMeasureGuideItem;
