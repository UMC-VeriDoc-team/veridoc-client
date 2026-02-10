import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import MeasureContent from "@/components/Modal/components/home/components//MeasureContent";
import { useLayoutEffect, useRef } from "react";
import { useTemporaryMeasureModalStore } from "@/stores/modal/useTemporaryMeasureModalStore";

// 데스크탑: 임시 대처 방안 상세 모달
const HomeTemporaryMeasureModal = () => {
  const { closeModal } = useBaseModal();
  const { measureId } = useTemporaryMeasureModalStore();

  // 스크롤 영역
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [measureId]);

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[726px] flex-col overflow-hidden rounded-xl bg-white px-4 py-10 sm:min-w-[380px]">
      {/* 모달 닫기 */}
      <button
        type="button"
        onClick={() => closeModal()}
        className="absolute right-4 top-4 z-10"
        aria-label="닫기"
      >
        <Icon name="close" className="h-3 w-3 cursor-pointer" />
      </button>

      <div ref={scrollRef} className="h-full overflow-y-auto">
        <MeasureContent />
      </div>
    </div>
  );
};

export default HomeTemporaryMeasureModal;
