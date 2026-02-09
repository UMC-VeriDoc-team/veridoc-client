import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/Icon/Icon";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import DoctorOpinionContent from "./components/DoctorOpinionContent";

const HomeDoctorOpinionPage = () => {
  const navigate = useNavigate();
  const { doctorOpinionId } = useDoctorOpinionModalStore();

  const handleBack = () => navigate(-1);

  useLayoutEffect(() => {
    const container = document.getElementById("app-scroll-container");
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [doctorOpinionId]);

  return (
    <div className="min-h-dvh bg-white p-[30px]">
      {/* 상단 바 */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로가기"
        className="z-10 bg-white pb-[40px]"
      >
        <Icon name="arrow-back" className="h-5 w-5" />
      </button>

      {/* 본문 */}
      <DoctorOpinionContent />
    </div>
  );
};

export default HomeDoctorOpinionPage;
