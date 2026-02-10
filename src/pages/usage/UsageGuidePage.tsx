import { USAGE_GUIDE_CARDS } from "@/constants/usage/usageGuideCards";
import { ModalType } from "@/components/Modal/types/modal";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { useGuideDetailModalStore } from "@/stores/modal/useGuideDetailModal";
import type { GuideDetailType } from "@/components/Modal/types/usageGuideDetail";
import Icon from "@/components/Icon/Icon";
import GuideHeader from "@/components/Header/GuideHeader";
import SymptomVisualBanner from "@/components/Banner/SymptomVisualBanner";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/user/useAuthStore";

// 로그인 O, 증상 미선택
const UsageGuidePage = () => {
  const { openModal } = useBaseModal();
  const { setGuideType } = useGuideDetailModalStore();
  const { initAuth, needsAgreementModal } = useAuthStore();

  const onClickOpenGuideDetail = (guideType: GuideDetailType) => {
    setGuideType(guideType);
    openModal(ModalType.HOME_GUIDE_DETAIL);
  };

  useEffect(() => {
    void initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (needsAgreementModal) {
      openModal(ModalType.HOME_TERMS_AGREEMENT);
    }
  }, [needsAgreementModal, openModal]);

  return (
    <>
      <GuideHeader />

      <div className="flex items-center justify-center pb-28 pt-[25px] md:pt-28">
        <div className="w-full bg-white">
          {/* 상단 문구 */}
          <div className="flex flex-col items-center justify-center gap-y-2 pt-10 text-center md:gap-y-3 md:pt-20">
            <div className="flex flex-col items-center">
              <p className="text-[28px] font-extrabold leading-[130%] text-gray-950 md:text-4xl">
                <span className="font-fredoka text-brand-primary">Veridoc</span>이 믿을 수 있는
              </p>
              <p className="text-[28px] font-extrabold leading-[130%] text-gray-950 md:text-4xl">
                건강 콘텐츠를 추천드려요!
              </p>
            </div>

            <p className="text-[18px] font-bold leading-[140%] text-gray-950 md:text-xl">
              Veridoc이 믿을 수 있는 건강 콘텐츠를 추천드려요!
            </p>
          </div>

          {/* 카드 영역 */}
          <section className="mt-10 flex w-full items-center justify-center px-5 pb-16 md:mt-16 md:px-6 md:pb-20">
            <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:w-fit sm:grid-cols-2 md:gap-6">
              {USAGE_GUIDE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="group relative h-[260px] w-full overflow-hidden rounded-[12px] text-left sm:w-[380px] md:h-auto md:w-auto md:rounded-[4px]"
                  onClick={() => onClickOpenGuideDetail(card.id)}
                >
                  {/* 이미지 */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-9 left-8 right-5 text-white md:bottom-12 md:left-12 md:right-6">
                    <p className="text-[16px] font-bold leading-[140%] md:text-[28px]">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[12px] font-medium leading-[140%] md:mt-0 md:text-base">
                      {card.description}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-white px-3 py-2 text-[12px] font-medium md:mt-4 md:px-3 md:py-2 md:text-base">
                      자세히 보기
                      <Icon name="arrow-right" className="w-[18px] md:w-[22px]" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <SymptomVisualBanner />
    </>
  );
};

export default UsageGuidePage;
