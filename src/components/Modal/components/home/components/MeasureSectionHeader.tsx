import Icon from "@/components/Icon/Icon";

interface SectionHeaderProps {
  iconName: string; // 헤더 아이콘 이름
  title: string; // 헤더 타이틀
}

// 섹션 헤더 컴포넌트
const MeasureSectionHeader = ({ iconName, title }: SectionHeaderProps) => {
  return (
    <div className="mb-[8px] flex items-center gap-2 bg-[#EBF3FF]">
      <Icon name={iconName} className="h-6 w-6" />
      <p className="text-gray-95 text-lg font-bold sm:text-xl">{title}</p>
    </div>
  );
};

export default MeasureSectionHeader;
