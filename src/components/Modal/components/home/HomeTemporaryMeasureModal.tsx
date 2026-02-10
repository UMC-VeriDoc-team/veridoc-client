import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import MeasureContent from "./components/MeasureContent";

// 데스크탑: 임시 대처 방안 상세 모달
const HomeTemporaryMeasureModal = () => {
  const { closeModal } = useBaseModal();

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

      <MeasureContent />
    </div>
  );
};

export default HomeTemporaryMeasureModal;
