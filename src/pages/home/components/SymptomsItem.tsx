import Icon from "@/components/Icon/Icon";

interface SymptomsItemProps {
  iconName: string;
  symptomsName: string;
  description: string;
}

// 프리뷰 증상 부위 소개
const SymptomsItem = ({ iconName, symptomsName, description }: SymptomsItemProps) => {
  return (
    <div className="flex h-[186px] flex-col items-center justify-center gap-y-3 rounded-[20px] bg-white px-4 shadow-[0_6.48px_54.9px_rgba(0,134,255,0.1)] md:h-[316px] md:gap-y-6 md:px-6 md:transition-all md:duration-300 md:ease-out md:hover:-translate-y-2 md:hover:shadow-[0_12px_70px_rgba(0,134,255,0.18)]">
      <Icon name={iconName} className="w-[70px] rounded-xl md:w-[113px]" />
      <div className="flex flex-col items-center gap-y-[6px]">
        <p className="text-center text-[20px] font-bold text-black md:text-[28px]">
          {symptomsName}
        </p>
        <p className="text-center text-[12px] font-medium text-gray-200 md:w-[78%] md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SymptomsItem;
