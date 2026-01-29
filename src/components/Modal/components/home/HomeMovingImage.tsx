import { useEffect, useState } from "react";
import clsx from "clsx";
import MovingDot from "./HomeMovingImage/MovingDot";

import image1 from "@/assets/images/ShoulderBackGround1.png";
import image2 from "@/assets/images/ShoulderBackGround2.png";
import image3 from "@/assets/images/ShoulderBackGround3.png";
import ShoulderLogo from "@/assets/images/ShoulderLogo.svg";

const HomeMovingImage = () => {
  const [num, setNum] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => (prevNum === 3 ? 1 : prevNum + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // overflow-hidden을 추가하여 옆으로 넘어간 이미지가 보이지 않게 처리
    <div className="relative flex h-[578px] w-[1440px] flex-col overflow-hidden bg-amber-400">
      {/* 첫 번째 이미지 */}
      <div
        className={clsx("absolute top-0 h-[578px] w-[1440px] transition-all duration-1000", {
          "left-0": num === 1,
          "-left-[1440px]": num === 2,
          "-left-[2880px]": num === 3,
        })}
      >
        <img src={image1} alt="slide1" className="h-full w-full object-cover" />
      </div>

      {/* 두 번째 이미지 */}
      <div
        className={clsx("absolute top-0 h-[578px] w-[1440px] transition-all duration-1000", {
          "left-[1440px]": num === 1,
          "left-0": num === 2,
          "-left-[1440px]": num === 3,
        })}
      >
        <img src={image2} alt="slide2" className="h-full w-full object-cover" />
      </div>

      {/* 세 번째 이미지 */}
      <div
        className={clsx("absolute top-0 h-[578px] w-[1440px] transition-all duration-1000", {
          "left-[2880px]": num === 1,
          "left-[1440px]": num === 2,
          "left-0": num === 3,
        })}
      >
        <img src={image3} alt="slide3" className="h-full w-full object-cover" />
      </div>

      {/* 텍스트 및 Dot 컨텐츠 (z-index 유지) */}
      <div className="relative z-[10] ml-[90px]">
        <div className="mt-[113px] flex h-[95px] w-[101px] items-center justify-center rounded-[10px]">
          <img src={ShoulderLogo} alt="Shoulder Logo" className="rounded-[10px] bg-[#2B7FFF]" />
        </div>
        <div className="mb-[151px] mt-[31px] flex flex-col font-['Pretendard'] text-[36px] font-extrabold not-italic leading-[140%] tracking-[-0.9px] text-white">
          <div>어깨 통증은 잘못된자세,</div>
          <div>혹은 회전근개 염증이 주요 원인입니다.</div>
        </div>
        <MovingDot num={num} />
      </div>
    </div>
  );
};

export default HomeMovingImage;
