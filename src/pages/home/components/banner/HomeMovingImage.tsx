import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import MovingDot from "./MovingDot";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";

const image1 = "/images/ShoulderBackGround1.png";
const image2 = "/images/ShoulderBackGround2.png";
const image3 = "/images/ShoulderBackGround3.png";

const HomeMovingImage = () => {
  const { openModal } = useBaseModal();
  const [num, setNum] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => (prevNum === 3 ? 1 : prevNum + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const index = num - 1;

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
        {/* 1 */}
        <div className="h-full w-full shrink-0">
          <img src={image1} alt="slide1" className="h-full w-full object-cover" />
        </div>

        {/* 2 */}
        <div className="h-full w-full shrink-0">
          <img src={image2} alt="slide2" className="h-full w-full object-cover" />
        </div>

        {/* 3 */}
        <div className="h-full w-full shrink-0">
          <img src={image3} alt="slide3" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* 텍스트 및 Dot 컨텐츠 (슬라이드 위로) */}
      <div className="pointer-events-none relative inset-0 z-10">
        <div className="absolute bottom-10 left-0 ml-[30px] md:ml-[90px]">
          <div className="mb-5 flex h-[66px] w-[70px] items-center justify-center rounded-[10px] sm:h-[95px] sm:w-[101px]">
            <Icon
              name="shoulder"
              className="h-full w-full rounded-[10px] shadow-[1px_2px_4px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="mb-[70px] flex flex-col text-xl font-bold leading-[1.4] tracking-[-0.5px] text-white md:mb-[151px] md:mt-[31px] md:text-[36px] md:font-extrabold md:not-italic md:leading-[140%] md:tracking-[-0.9px]">
            <div>어깨 통증은 잘못된자세,</div>
            <div>혹은 회전근개 염증이 주요 원인입니다.</div>
          </div>

          {/* dot은 클릭 가능할 수도 있으니 pointer-events 살리고 싶으면 아래처럼 */}
          <div className="pointer-events-auto">
            <MovingDot num={num} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMovingImage;
