import Icon from "@/components/Icon/Icon";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";

interface AlternativeCardProps {
  guideId: number;
  title: string;
  badges: string[];
  description: string;
  imageUrl: string;
  type: string;
  duration: string;
}

const AlternativeCard = ({
  guideId,
  title,
  badges,
  description,
  imageUrl,
  type,
  duration,
}: AlternativeCardProps) => {
  const { openModal } = useBaseModal();

  return (
    <div
      key={guideId}
      onClick={() => openModal(ModalType.HOME_TEMPORARY_MEASURE)}
      className="flex w-full cursor-pointer flex-col justify-between hover:opacity-80"
    >
      <div className="flex flex-col gap-y-5">
        <div className="relative">
          <img
            src={imageUrl}
            alt="임시 대처 방안 이미지"
            className="z-20 w-full rounded-[5px] object-cover brightness-50"
          />
          <div className="absolute left-5 top-5 z-30 flex gap-x-1">
            {badges.map((badge: string, idx) => (
              <div key={idx} className="rounded-[4px] bg-[#FFFFFF33] px-[10px] py-2 text-white">
                {badge}
              </div>
            ))}
          </div>
        </div>
        <p className="text-[28px] font-bold text-gray-950">{title}</p>
        <p className="h-36 text-xl text-[#6C757D]">{description}</p>
      </div>
      <div className="flex items-center gap-x-3">
        <p className="mt-1 text-base font-medium text-gray-950">{type}</p>
        <div className="h-1 w-5 border-b border-[#121416CF]" />
        <div className="flex items-center gap-x-1">
          <Icon name="clock" className="h-4 w-4" />
          <p className="mt-1 text-base font-medium text-brand-primary">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default AlternativeCard;
