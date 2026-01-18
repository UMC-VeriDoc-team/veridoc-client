import Icon from "@/components/Icon/Icon";

interface SymptomsItemProps {
  key: string;
  iconName: string;
  symptomsName: string;
  description: string;
}

const SymptomsItem = ({ key, iconName, symptomsName, description }: SymptomsItemProps) => {
  return (
    <div
      id={key}
      className="flex h-[316px] flex-col items-center justify-center gap-y-6 rounded-[20px] bg-white px-6 shadow-[0_6.48px_54.9px_rgba(0,134,255,0.1)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_70px_rgba(0,134,255,0.18)]"
    >
      <Icon name={iconName} className="w-[113px] rounded-xl" />
      <div className="flex flex-col gap-y-[6px]">
        <p className="text-center text-[28px] font-bold text-black">{symptomsName}</p>
        <p className="text-center text-base font-medium text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default SymptomsItem;
