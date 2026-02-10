import { useEffect } from "react";
import { useHomeStore } from "@/stores/home/useHomeStore";
import HomeBanner from "@/pages/home/components/banner/HomeBanner";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import DoctorOpinionSection from "@/pages/home/components/sections/doctor/DoctorOpinionSection";
import TemporaryMeasureSection from "@/pages/home/components/sections/temporary/TemporaryMeasureSection";
import HomeMap from "@/pages/home/components/sections/map/HomeMap";

const MainPage = () => {
  const { needsAgreementModal } = useAuthStore();
  const { fetchHome } = useHomeStore();
  const { openModal } = useBaseModal();

  useEffect(() => {
    void fetchHome();
  }, [fetchHome]);

  useEffect(() => {
    if (needsAgreementModal) {
      openModal(ModalType.HOME_TERMS_AGREEMENT);
    }
  }, [needsAgreementModal, openModal]);

  return (
    <div className="w-full">
      <HomeBanner />

      <div className="pb-24 pt-0 sm:pb-32 sm:pt-[69px]">
        <div className="mx-auto w-full max-w-[1360px] sm:px-8">
          <div className="flex flex-col gap-y-24 sm:gap-y-[140px]">
            <DoctorOpinionSection />
            <TemporaryMeasureSection />
            <HomeMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
