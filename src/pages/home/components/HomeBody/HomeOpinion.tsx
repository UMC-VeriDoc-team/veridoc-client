import { BlueBox } from "./HomeOpinion/BlueBox";
import { OrangeBox } from "./HomeOpinion/OrangeBox";
import { GreenBox } from "./HomeOpinion/GreenBox";
import { DoctorOpinion } from "./HomeOpinion/DoctorOpinion";
import { SYMPTOM_TEXT } from "@/constants/homeSelectButton";
import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";

type HomeOpinionProps = {
  symptom: string;
};

const HomeOpinion = ({ symptom }: HomeOpinionProps) => {
  const { openModal } = useBaseModal();

  return (
    // 전체 패딩은 유지 (화면 끝과 띄우기 위해)
    <div className="flex flex-col px-[30px] md:px-0">
      <span className="mb-[10px] text-[20px] font-bold text-gray-950 md:mb-10 md:text-[28px]">
        어깨 통증 전문가 소견
      </span>
      <span className="mb-[20px] text-[18px] font-bold text-gray-950 md:hidden">
        관련 전문의 답변
      </span>

      <div className="flex flex-col md:flex-row md:items-start md:gap-[30px]">
        {/* 1. 모바일에서 아래 박스와의 간격을 10px로 조정 */}
        <div className="relative mb-[10px] flex items-end gap-x-4 md:mb-0 md:block">
          <Icon
            name="home-doctor-opinion"
            className="ml-0 h-[200px] w-[200px] md:mx-0 md:h-[253px] md:w-[255px]"
          />

          {/* 파란박스, 초록박스 그룹 */}
          <div className="flex gap-x-2 pb-2 md:hidden">
            <BlueBox />
            <GreenBox />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <span className="mb-[11px] hidden text-[20px] font-bold text-gray-950 md:block">
            관련 전문의 답변
          </span>

          {/* PC 환경용 박스 그룹 - 세 박스를 한 줄로 배치 */}
          <div className="hidden md:mb-[30px] md:flex md:gap-2.5">
            <BlueBox />
            <GreenBox />
            <OrangeBox />
          </div>

          {/* 2. 모바일 환경용 오렌지 박스: 상단 파란박스 그룹과의 간격 10px는 위 mb-[10px]가 결정합니다. */}
          <div className="mb-[10px] md:hidden">
            <OrangeBox />
          </div>

          {/* 3. 답변 본문과 오렌지 박스 사이의 간격 */}
          <div className="mb-5 md:mb-[30px]">
            <DoctorOpinion text={SYMPTOM_TEXT[symptom]} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => openModal(ModalType.HOME_DOCTOR_OPINION)}
              className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-brand-primary px-4 py-2 hover:opacity-80"
            >
              <p className="text-[16px] font-semibold leading-[24px] text-white md:text-[18px]">
                전체 보기
              </p>
              <Icon name="chevron-right-white" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOpinion;
