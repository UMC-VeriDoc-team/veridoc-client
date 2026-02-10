import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import BannerDot from "@/pages/home/components/banner/fragments/BannerDot";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { SYMPTOMS } from "@/constants/symptoms";
import { useHomeStore } from "@/stores/home/useHomeStore";

const HomeBanner = () => {
  const { openModal } = useBaseModal();
  const { banners, painAreaName } = useHomeStore();
  const [num, setNum] = useState(1);

  const imagesToUse = useMemo(() => {
    return banners.map((b) => b.imageUrl).filter((src): src is string => Boolean(src));
  }, [banners]);

  const totalSlides = imagesToUse.length;

  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = window.setInterval(() => {
      setNum((prevNum) => (prevNum >= totalSlides ? 1 : prevNum + 1));
    }, 3000);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  const index = num - 1;

  const iconName = useMemo(() => {
    const matched = SYMPTOMS.find((s) => s.label === painAreaName);
    return matched?.iconName ?? "";
  }, [painAreaName]);

  const bannerTitle = banners?.[0]?.title ?? "";
  const titleLine1 = bannerTitle.split("\n")[0] ?? "";
  const titleLine2 = bannerTitle.split("\n").slice(1).join(" ") ?? "";

  // 데이터가 아예 없을 때를 위한 방어 처리
  if (totalSlides === 0) return <div className="h-[420px] w-full bg-gray-200 sm:h-[578px]" />;

  return (
    <div className="relative h-[420px] w-full overflow-hidden sm:h-[578px]">
      {/* 모바일 로고 및 로그아웃 */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between px-6 pt-6 md:hidden">
        <img src="/images/responsive-logo.svg" alt="VeriDoc" className="mt-6 h-[40px] w-auto" />
        <button type="button" onClick={() => openModal(ModalType.AUTH_LOGOUT)} className="shrink-0">
          <img src="/images/logout-button.svg" alt="Logout" className="mt-6 h-[32px] w-auto" />
        </button>
      </div>

      <div
        className="flex h-full w-full brightness-50 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagesToUse.map((src, i) => (
          <div key={`${src}-${i}`} className="h-full w-full shrink-0">
            <img src={src} alt={`slide${i + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* 텍스트 컨텐츠 */}
      <div className="pointer-events-none relative inset-0 z-10">
        <div className="absolute bottom-10 left-0 ml-[30px] md:ml-[90px]">
          <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center">
            <Icon name={iconName} className="h-full w-full rounded-[10px] object-cover" />
          </div>

          <div className="mb-[70px] flex flex-col text-xl font-bold text-white md:mb-[151px] md:text-[36px]">
            <div>{titleLine1}</div>
            <div>{titleLine2}</div>
          </div>

          {totalSlides > 1 && (
            <div className="pointer-events-auto">
              <BannerDot num={num} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
