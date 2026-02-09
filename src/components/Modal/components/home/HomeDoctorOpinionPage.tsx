import Icon from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import DoctorOpinionContent from "./components/DoctorOpinionContent";

// 모바일: 전문의 소견 상세 페이지
const HomeDoctorOpinionPage = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-dvh bg-white p-[30px]">
      {/* 상단 바 */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로가기"
        className="flex w-full items-start bg-white pb-[40px]"
      >
        <Icon name="arrow-back" className="h-5 w-5" />
      </button>

      {/* 본문 */}
      <DoctorOpinionContent />
    </div>
  );
};

export default HomeDoctorOpinionPage;
