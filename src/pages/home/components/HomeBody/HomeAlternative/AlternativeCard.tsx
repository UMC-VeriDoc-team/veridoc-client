import Icon from "@/components/Icon/Icon";
import { ModalType } from "@/components/Modal/types/modal";
import useIsMobile from "@/hooks/useIsMobile";
import useBaseModal from "@/stores/modal/useBaseModal";
import useTemporaryMeasureModalStore from "@/stores/modal/useTemporaryMeasureModalStore";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { openModal } = useBaseModal();
  const { setMeasureId } = useTemporaryMeasureModalStore();
  const isMobile = useIsMobile();

  const handleShowTemporaryMeasure = () => {
    if (isMobile) {
      navigate(`/symptom/measure/${guideId}`);
      return;
    }

    setMeasureId(String(guideId));
    openModal(ModalType.HOME_TEMPORARY_MEASURE);
  };

  return (
    <div
      onClick={handleShowTemporaryMeasure}
      className="flex w-full min-w-[220px] cursor-pointer flex-col justify-between hover:opacity-80 sm:min-w-[250px]"
    >
      <div className="flex flex-col gap-y-5">
        <div className="relative">
          <img
            src={imageUrl}
            alt="임시 대처 방안 이미지"
            className="h-[170px] w-full rounded-[5px] object-cover brightness-50 sm:h-[300px] md:z-20"
          />
          <div className="absolute left-3 top-3 z-30 flex gap-x-1 md:left-5 md:top-5">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="rounded-[4px] bg-[#FFFFFF33] px-2 py-1 text-xs text-white sm:py-2 sm:text-base md:px-[10px]"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xl font-bold tracking-[-0.45px] text-gray-950 md:text-3xl md:font-bold">
          {title}
        </p>
        <p className="text-lg text-[#6C757D] md:h-36 md:text-xl">{description}</p>
      </div>

      <div className="mt-4 flex items-center gap-x-2 sm:gap-x-3 md:mt-0">
        <p className="md:text-base-[#121416]/81 text-normal whitespace-nowrap text-sm font-medium leading-[40px] text-[#6C757D] md:text-base">
          {type}
        </p>
        <div className="h-[1px] w-4 bg-[#121416CF]" />
        <div className="flex shrink-0 items-center gap-x-1">
          <Icon name="clock" className="h-4 w-4" />
          <p className="whitespace-nowrap text-sm font-medium text-brand-primary md:text-base">
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlternativeCard;
