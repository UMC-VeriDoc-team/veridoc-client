import { useLayoutEffect, useRef } from "react";
import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { useDoctorOpinionModalStore } from "@/stores/modal/useDoctorOpinionModalStore";
import DoctorOpinionDetailContent from "@/components/Modal/components/home/components/DoctorOpinionContent";

// 데스크탑: 전문의 소견 상세 모달
const HomeDoctorOpinionModal = () => {
  const { closeModal } = useBaseModal();
  const { doctorOpinionId } = useDoctorOpinionModalStore();

  // 스크롤 영역
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [doctorOpinionId]);

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[700px] flex-col overflow-hidden rounded-xl bg-white px-4 py-10 sm:min-w-[380px]">
      {/* 모달 닫기 */}
      <button
        type="button"
        onClick={closeModal}
        className="absolute right-4 top-4 z-10"
        aria-label="닫기"
      >
        <Icon name="close" className="h-3 w-3 cursor-pointer" />
      </button>

      <div ref={scrollRef} className="h-full overflow-y-auto">
        <DoctorOpinionDetailContent />
      </div>
    </div>
  );
};

export default HomeDoctorOpinionModal;
