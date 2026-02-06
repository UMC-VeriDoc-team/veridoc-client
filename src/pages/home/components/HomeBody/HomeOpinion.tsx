import { BlueBox } from "./HomeOpinion/BlueBox";
import { OrangeBox } from "./HomeOpinion/OrangeBox";
import { GreenBox } from "./HomeOpinion/GreenBox";
import { DoctorOpinion } from "./HomeOpinion/DoctorOpinion";
import { SYMPTOM_TEXT } from "@/constants/homeSelectButton";
import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";

type HomeOpinionProps = {
  symptom: string;
};

const HomeOpinion = ({ symptom }: HomeOpinionProps) => {
  const { openModal } = useBaseModal();
  const { setDoctorOpinionId } = useDoctorOpinionModalStore();

  const handleShowDoctorOpinion = () => {
    // setDoctorOpinionId(opinion.id);
    setDoctorOpinionId("1");
    openModal(ModalType.HOME_DOCTOR_OPINION);
  };

  return (
    <div className="flex w-full flex-col sm:px-[30px] md:px-0">
      <span className="mb-[10px] text-[20px] font-bold text-gray-950 sm:text-[28px] md:mb-10">
        어깨 통증 전문가 소견
      </span>
      <span className="mb-[20px] text-base font-semibold text-gray-950 sm:hidden">
        관련 전문의 답변
      </span>

      <div className="flex flex-col md:flex-row md:items-start md:gap-[30px]">
        <div className="relative mb-[10px] flex items-end justify-between sm:block sm:gap-x-4 md:mb-0">
          <Icon
            name="home-doctor-opinion"
            // 증상에 따라 배경색 분기처리
            className="w-[150px] rounded-full bg-brand-primary sm:min-h-[200px] sm:min-w-[200px]"
          />

          {/* 모바일: 파란박스, 초록박스 그룹 */}
          <div className="flex gap-x-2 pb-2 sm:hidden">
            <BlueBox />
            <GreenBox />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <span className="mb-[11px] hidden text-base font-semibold text-gray-950 md:block">
            관련 전문의 답변
          </span>

          {/* 데스크탑 */}
          <div className="hidden sm:mb-[30px] sm:flex sm:gap-2.5">
            <BlueBox />
            <GreenBox />
            <OrangeBox />
          </div>

          {/* 모바일 */}
          <div className="mb-[10px] sm:hidden">
            <OrangeBox />
          </div>

          <div className="mb-5 md:mb-[30px]">
            <DoctorOpinion text={SYMPTOM_TEXT[symptom]} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleShowDoctorOpinion}
              className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-brand-primary px-4 py-2 hover:opacity-80"
            >
              <p className="text-base font-semibold leading-[24px] text-white md:text-lg">
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
