import Icon from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import DoctorOpinionContent from "./components/DoctorOpinionContent";

// 모바일: 전문의 소견 상세 페이지
const HomeDoctorOpinionPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
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
        <Icon name="arrow-back" className="h-5 w-5" />
      </button>

      {/* 본문 */}
      <div className="min-h-0 flex-1">
        <DoctorOpinionContent />
      </div>
    </div>
  );
};

export default HomeDoctorOpinionPage;
