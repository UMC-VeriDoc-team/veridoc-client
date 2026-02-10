import { useNavigate } from "react-router-dom";

import Icon from "@/components/Icon/Icon";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import UsageGuideDetailContent from "./components/UsageGuideDetailContent";

// 모바일: 모달 대신 전체 페이지로 범용 가이드 상세 렌더링
const UsageGuideDetailPage = () => {
  const navigate = useNavigate();
  const { resetGuideType } = useGuideDetailModalStore();

  const handleBack = () => {
    resetGuideType();
    navigate(-1);
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* 상단 바 */}
      <button
        className="absolute left-6 top-6 z-50 sm:left-11 sm:top-11"
        type="button"
        onClick={handleBack}
        aria-label="뒤로가기"
      >
        <Icon name="arrow-back-white" className="h-5 w-5" />
      </button>

      {/* 본문 */}
      <div className="min-h-0 flex-1">
        <UsageGuideDetailContent />
      </div>
    </div>
  );
};

export default UsageGuideDetailPage;
