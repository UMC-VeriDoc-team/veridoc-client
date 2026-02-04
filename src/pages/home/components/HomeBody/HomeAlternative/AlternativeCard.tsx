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
      className="flex w-[200px] shrink-0 cursor-pointer flex-col justify-between hover:opacity-80 md:w-[380px]"
    >
      <div className="flex flex-col gap-y-5">
        <div className="relative">
          <img
            src={imageUrl}
            alt="임시 대처 방안 이미지"
            /* 모바일: w-[200px] h-[170px] (피그마 레이아웃 반영)
               데스크탑: md:w-full(부모인 380px에 맞춤) md:h-[395px](기존 스타일 반영)
            */
            className="h-[170px] w-[200px] rounded-[5px] object-cover md:z-20 md:h-[395px] md:w-full md:brightness-50"
          />
          <div className="absolute left-3 top-3 z-30 flex gap-x-1 md:left-5 md:top-5">
            {badges.map((badge: string, idx) => (
              <div
                key={idx}
                className="rounded-[4px] bg-[#FFFFFF33] px-2 py-1 text-xs text-white md:px-[10px] md:py-2 md:text-base"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* 제목: 모바일 20px -> 데스크탑 28px */}
        <p className="text-[20px] font-semibold tracking-[-0.45px] text-[#171719] md:text-[28px] md:font-bold md:text-gray-950">
          {title}
        </p>

        {/* 설명: 데스크탑에서만 표시 */}
        <p className="hidden text-[#6C757D] md:block md:h-36 md:text-xl">{description}</p>
      </div>

      <div className="mt-4 flex items-center gap-x-3 md:mt-0">
        <p className="md:text-base-[#121416]/81 text-normal whitespace-nowrap font-['Pretendard'] text-[14px] font-medium leading-[40px] text-[#6C757D] md:text-base">
          {type}
        </p>
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
