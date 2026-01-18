import useBaseModal from "@/stores/modal/useBaseModal";
import GuideHeader from "./GuideHeader";
import RecommendEntry from "./RecommendEntry";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import { ModalType } from "@/components/Modal/types/modal";
import { SYMPTOMS } from "@/constants/symptoms";
import SymptomsItem from "./SymptomsItem";
import { Link } from "react-router-dom";

// 로그인 X
const HomePreview = () => {
  const { openModal } = useBaseModal();
  const { setGuideType } = useGuideDetailModalStore();

  // 더 알아보기 모달 열기
  const openAboutUsModal = () => {
    setGuideType("HOW_TO_USE");
    openModal(ModalType.HOME_GUIDE_DETAIL);
  };

  // 이미지 경로
  const images: { src: string; alt: string }[] = [
    {
      src: "/src/assets/images/home/previews/about-us.svg",
      alt: "진료하는 사진",
    },
    {
      src: "/src/assets/images/home/previews/doctor-1.svg",
      alt: "의료진 사진 1",
    },
    {
      src: "/src/assets/images/home/previews/doctor-2.svg",
      alt: "의료진 사진 2",
    },
    {
      src: "/src/assets/images/home/previews/doctor-3.svg",
      alt: "의료진 사진 3",
    },
    {
      src: "/src/assets/images/home/previews/doctor-4.svg",
      alt: "의료진 사진 4",
    },
  ];

  const aboutUs = images[0];
  const img1 = images[1];
  const img2 = images[2];
  const img3 = images[3];
  const img4 = images[4];

  return (
    <>
      <GuideHeader />
      {/* About US */}
      <section className="flex items-center justify-center gap-x-[130px] py-28">
        {/* 좌측: 사진 */}
        <div className="h-[442px] w-[574px] overflow-hidden rounded-[20px] transition-all duration-300 ease-out">
          <img
            src={aboutUs.src}
            alt={aboutUs.alt}
            className="w-full bg-gray-100 object-cover transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </div>
        {/* 우측: 콘텐츠 + 버튼 */}
        <div className="flex flex-col items-start gap-y-[26px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-left font-en text-lg font-semibold text-brand-primary">About Us</p>
            <div className="flex flex-col">
              <p className="text-left text-4xl font-extrabold text-gray-900">
                불편함을 느끼는 순간,
              </p>
              <p className="text-left text-4xl font-extrabold text-gray-900">
                가장 먼저 찾는 의료 가이드
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-left text-base font-medium text-gray-600">
              VeriDoc는 증상 선택을 통해 신뢰할 수 있는
            </p>
            <p className="text-left text-base font-medium text-gray-600">
              의료 정보와 전문의 답변을 연결하는 헬스케어 플랫폼입니다.
            </p>
            <p className="text-left text-base font-medium text-gray-600">
              넘쳐나는 의료 정보 속에서 신뢰할 수 있는 답변에 더 빠르게 닿을 수 있도록 돕습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={openAboutUsModal}
            className="rounded-[4px] bg-[#0086FF] px-[30px] py-[14px] text-center text-xl font-bold text-white hover:opacity-80"
          >
            더 알아보기
          </button>
        </div>
      </section>

      {/* Symptoms */}
      <section className="flex w-full flex-col items-center gap-y-16 bg-[#F8FBFF] pb-32 pt-[60px]">
        {/* 제목 */}
        <article className="flex flex-col gap-y-[10px]">
          <p className="text-center font-en text-lg font-semibold text-brand-primary">Symptoms</p>
          <div className="flex flex-col gap-y-[15px]">
            <div className="flex flex-col">
              <p className="text-center text-4xl font-extrabold text-gray-900">
                증상부터 정보까지,
              </p>
              <p className="text-center text-4xl font-extrabold text-gray-900">
                사용자에게 필요한 의료 가이드를 제공합니다
              </p>
            </div>
            <p className="text-center text-base font-medium text-gray-600">
              선택한 증상에 따라 전문의가 검토한 답변을 확인할 수 있어요.
            </p>
          </div>
        </article>
        {/* 증상 아이템 */}
        <article className="grid grid-cols-[280px_280px_280px] gap-x-20 gap-y-[50px]">
          {SYMPTOMS.map((symptom) => (
            <SymptomsItem
              key={symptom.key}
              iconName={symptom.iconName}
              symptomsName={symptom.label}
              description={symptom.description}
            />
          ))}
        </article>
      </section>

      {/* Hospital */}
      <section className="flex w-full items-center justify-center py-20 pb-10 pt-[136px]">
        <div className="grid grid-cols-1 items-center gap-x-[112px] lg:grid-cols-2">
          {/* 왼쪽: 콜라주 이미지 영역 */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[730px] w-[551px]">
              {/* 좌상 */}
              {img1 && (
                <div className="group absolute left-0 top-0 z-10 w-[260px]">
                  <div className="overflow-hidden rounded-[44px] transition-all duration-300 ease-out hover:-translate-y-2">
                    <img
                      src={img1.src}
                      alt={img1.alt}
                      className="h-[308px] w-full bg-gray-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 우상 */}
              {img2 && (
                <div className="group absolute right-0 top-16 z-20 w-[260px]">
                  <div className="overflow-hidden rounded-[44px] transition-all duration-300 ease-out hover:-translate-y-2">
                    <img
                      src={img2.src}
                      alt={img2.alt}
                      className="h-[308px] w-full bg-gray-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 좌하 */}
              {img3 && (
                <div className="group absolute bottom-20 left-0 z-20 w-[260px]">
                  <div className="overflow-hidden rounded-[44px] transition-all duration-300 ease-out hover:-translate-y-2">
                    <img
                      src={img3.src}
                      alt={img3.alt}
                      className="h-[308px] w-full bg-gray-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 우하 */}
              {img4 && (
                <div className="group absolute bottom-0 right-0 z-10 w-[260px]">
                  <div className="overflow-hidden rounded-[44px] transition-all duration-300 ease-out hover:-translate-y-2">
                    <img
                      src={img4.src}
                      alt={img4.alt}
                      className="h-[308px] w-full bg-gray-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 텍스트 + 버튼 */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start gap-y-[26px]">
              <div className="flex flex-col gap-y-[5px]">
                <p className="text-left font-en text-lg font-semibold text-brand-primary">
                  Hospital
                </p>
                <p className="text-left text-4xl font-extrabold text-gray-900">
                  가까운 병원을 찾아보세요
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-left text-base font-medium text-gray-600">
                  현재 위치를 기준으로 주변 병원 정보를 확인할 수 있습니다.
                </p>
                <p className="text-left text-base font-medium text-gray-600">
                  증상에 따라 참고할 수 있는 병원을 안내합니다.
                </p>
                <p className="text-left text-base font-medium text-gray-600">
                  필요한 경우 병원 방문을 고려해 보세요.
                </p>
              </div>
              {/* Buttons */}
              <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:gap-4">
                {/* 회원가입 */}
                <Link
                  to="/select-symptom"
                  className="inline-flex h-12 w-full items-center justify-center rounded-[4px] border border-brand-primary bg-white text-base font-semibold leading-none text-brand-primary transition-colors hover:bg-brand-primary/10 sm:w-48 sm:text-lg"
                >
                  회원가입
                </Link>
                {/* 로그인 */}
                <Link
                  to="/login"
                  className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-primary text-base font-semibold leading-none text-white transition-colors hover:opacity-90 sm:w-48 sm:text-lg"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendEntry showTitle={false} />
    </>
  );
};

export default HomePreview;
