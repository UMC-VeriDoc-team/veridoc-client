import { GUIDE_CARDS } from "@/constants/guideCards";
import { ModalType } from "@/components/Modal/types/modal";
import useBaseModal from "@/stores/modal/useBaseModal";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import type { GuideDetailType } from "@/components/Modal/types/guideDetail";
import Icon from "@/components/Icon/Icon";
import GuideHeader from "./GuideHeader";
import RecommendEntry from "./RecommendEntry";

// 로그인 O, 증상 미선택
const HomeSymptomOnboarding = () => {
  const { openModal } = useBaseModal();
  const { setGuideType } = useGuideDetailModalStore();

  const onClickOpenGuideDetail = (guideType: GuideDetailType) => {
    setGuideType(guideType);
    openModal(ModalType.HOME_GUIDE_DETAIL);
  };

  return (
    <>
      <GuideHeader />
      <div className="flex items-center justify-center py-28">
        <div className="w-full bg-white">
          {/* 상단 문구 */}
          <div className="flex flex-col items-center justify-center gap-y-3 pt-20 text-center">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-extrabold text-gray-950">
                <span className="text-brand-primary">Veridoc</span>이 믿을 수 있는
              </p>
              <p className="text-4xl font-extrabold text-gray-950">건강 콘텐츠를 추천드려요!</p>
            </div>

            <p className="text-xl font-bold text-gray-950">
              Veridoc이 믿을 수 있는 건강 콘텐츠를 추천드려요!
            </p>
          </div>

          {/* 카드 영역 */}
          <section className="mt-16 flex w-full items-center justify-center px-6 pb-20">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {GUIDE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="group relative overflow-hidden rounded-[4px] text-left"
                  onClick={() => {
                    onClickOpenGuideDetail(card.id);
                  }}
                >
                  {/* 이미지 */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* 텍스트 */}
                  <div className="absolute bottom-12 left-12 right-6 text-white">
                    <p className="text-[28px] font-bold">{card.title}</p>
                    <p className="text-base font-medium">{card.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-white px-3 py-2 text-base font-medium">
                      자세히 보기
                      <Icon name="arrow-right" className="w-[22px]" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
      <RecommendEntry />
    </>
  );
};

export default HomeSymptomOnboarding;
