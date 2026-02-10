import Icon from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import MeasureContent from "@/components/Modal/components/home/components/MeasureContent";

// 데스크탑: 임시 대처 방안 상세 모달
const HomeTemporaryMeasurePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white p-[30px]">
      {/* 상단 바 */}
      <button className="pb-[40px]" type="button" onClick={handleBack} aria-label="뒤로가기">
        <Icon name="arrow-back" className="h-5 w-5" />
      </button>

      {/* 본문 */}
      <div className="min-h-0 flex-1">
        <MeasureContent />
      </div>
    </div>
  );
};

export default HomeTemporaryMeasurePage;
