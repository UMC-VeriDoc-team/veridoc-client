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
    <div className="flex flex-col">
      <span className="mb-10 text-[28px] font-bold text-gray-950">어깨 통증 전문가 소견</span>
      <div className="flex items-start gap-[30px]">
        <Icon name="home-doctor-opinion" className="h-[200px] w-[200px]" />
        <div className="mb-[1px] flex w-full flex-col">
          <span className="mb-[11px] text-[20px] font-bold text-gray-950">관련 전문의 답변</span>
          <div className="mb-[30px] flex gap-2.5">
            <BlueBox />
            <GreenBox />
            <OrangeBox />
          </div>
          <div className="mb-[30px]">
            <DoctorOpinion text={SYMPTOM_TEXT[symptom]} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleShowDoctorOpinion}
              className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-brand-primary px-4 py-2 hover:opacity-80"
            >
              <p className="text-[18px] font-semibold leading-[24px] text-white">전체 보기</p>
              <Icon name="chevron-right-white" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOpinion;
