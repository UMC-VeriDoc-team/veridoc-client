import Icon from "@/components/Icon/Icon";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { useGuideDetailModalStore } from "@/stores/modal/useGuideDetailModal";
import UsageGuideDetailContent from "@/components/Modal/components/usage/components/UsageGuideDetailContent";

// 범용 가이드 상세 모달
const UsageGuideDetailModal = () => {
  const { closeModal } = useBaseModal();
  const { resetGuideType } = useGuideDetailModalStore();

  // 모달 닫기 핸들러
  const handleClose = () => {
    closeModal();
    resetGuideType();
  };

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[726px] flex-col overflow-hidden rounded-xl bg-white">
      {/* 모달 닫기 */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 z-20"
        aria-label="닫기"
      >
        <Icon name="close-white" className="h-4 w-4 cursor-pointer fill-white" />
      </button>

      <UsageGuideDetailContent />
    </div>
  );
};

export default UsageGuideDetailModal;
