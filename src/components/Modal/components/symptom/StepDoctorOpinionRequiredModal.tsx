import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { useNavigate } from "react-router-dom";
import { ModalType } from "../../types/modal";

// 전문의 답변 미확인 모달 (2 → 3단계)
const StepDoctorOpinionRequiredModal = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useBaseModal();

  // 전문의 답변 상세 보기 모달 조회
  const handleOpenDoctorOpinion = () => {
    navigate("/home");
    openModal(ModalType.HOME_DOCTOR_OPINION);
  };

  return (
    <div className="flex w-[92vw] max-w-[420px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-5 py-7 sm:min-w-[380px] sm:gap-8 sm:px-7 sm:py-8">
      <div className="rounded-lg bg-[#2B7FFF1F] p-2">
        <Icon name="warning" className="h-5 w-5" />
      </div>

      <div className="flex w-full flex-col gap-8 sm:gap-12">
        <div className="flex flex-col items-center gap-1">
          <p className="text-center text-lg font-bold text-gray-950 sm:text-xl">
            전문의 답변을 먼저 확인해 주세요
          </p>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              증상에 대한 전문의 소견을 아직 확인하지 않았어요
            </p>
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              전문의 답변 상세보기를 한 번 이상 열어야
            </p>
            <p className="text-center text-sm font-normal text-[#4E5876] sm:text-base">
              다음 단계로 이동할 수 있어요
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-gray-50 text-center text-base font-semibold leading-none text-gray-600 transition-colors hover:bg-gray-100 sm:text-lg"
          >
            나중에 할게요
          </button>
          <button
            type="button"
            onClick={handleOpenDoctorOpinion}
            className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-center text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:text-lg"
          >
            전문의 답변 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepDoctorOpinionRequiredModal;
