import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import MovingDot from "./MovingDot";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { SYMPTOMS } from "@/constants/symptoms";
import { useHomeStore } from "@/stores/home/useHomeStore";

const fallbackImages = [
  "/images/ShoulderBackGround1.png",
  "/images/ShoulderBackGround2.png",
  "/images/ShoulderBackGround3.png",
];

const HomeMovingImage = () => {
  const { openModal } = useBaseModal();
  const [num, setNum] = useState(1);

  const { banners, painAreaName } = useHomeStore();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNum((prevNum) => (prevNum === 3 ? 1 : prevNum + 1));
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const index = num - 1;

  // refactoring 고려
  const iconName = useMemo(() => {
    const matched = SYMPTOMS.find((s) => s.label === painAreaName);
    return matched?.iconName ?? "";
  }, [painAreaName]);

  // banners 중 title 있는 것 사용
  const bannerTitle = banners?.[0]?.title ?? "";

  // banners 중 imageUrl만 골라서 슬라이드 이미지로 사용
  const bannerImages = useMemo(() => {
    return banners
      .slice(1)
      .map((b) => b.imageUrl)
      .filter((src): src is string => Boolean(src));
  }, [banners]);

  // 이미지가 3장 미만이면 fallback으로 채우기 (UI 유지용)
  const imagesToUse = useMemo(() => {
    const srcs = bannerImages.length > 0 ? bannerImages : fallbackImages;

    if (srcs.length >= 3) return srcs.slice(0, 3);

    const filled = [...srcs];
    while (filled.length < 3) filled.push(fallbackImages[filled.length]);
    return filled;
  }, [bannerImages]);

  const titleLine1 = bannerTitle.split("\n")[0] ?? "";
  const titleLine2 = bannerTitle.split("\n").slice(1).join(" ") ?? "";

  return (
    <div className="relative h-[420px] w-full overflow-hidden sm:h-[578px]">
      {/* 모바일 */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between px-6 pt-6 md:hidden">
        <img
          src="/images/responsive-logo.svg"
          alt="VeriDoc"
          className="mt-6 h-[40px] w-auto"
          draggable={false}
        />
        <button type="button" aria-label="Logout" className="shrink-0">
          <img
            src="/images/logout-button.svg"
            alt="Logout"
            className="mt-6 h-[32px] w-auto"
            draggable={false}
            onClick={() => openModal(ModalType.AUTH_LOGOUT)}
          />
        </button>
      </div>

      {/* 슬라이드 트랙 */}
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

      {/* 텍스트 및 Dot 컨텐츠 (슬라이드 위로) */}
      <div className="pointer-events-none relative inset-0 z-10">
        <div className="absolute bottom-10 left-0 ml-[30px] md:ml-[90px]">
          <div className="mb-5 flex h-[66px] w-[70px] items-center justify-center rounded-[10px] sm:h-[95px] sm:w-[101px]">
            <Icon
              name={iconName}
              className="h-full w-full rounded-[10px] shadow-[1px_2px_4px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="mb-[70px] flex flex-col text-xl font-bold leading-[1.4] tracking-[-0.5px] text-white md:mb-[151px] md:mt-[31px] md:text-[36px] md:font-extrabold md:not-italic md:leading-[140%] md:tracking-[-0.9px]">
            <div>{titleLine1}</div>
            <div>{titleLine2}</div>
          </div>

          <div className="pointer-events-auto">
            <MovingDot num={num} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMovingImage;
