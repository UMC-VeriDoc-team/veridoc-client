import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import MovingDot from "./MovingDot";

const image1 = "/images/ShoulderBackGround1.png";
const image2 = "/images/ShoulderBackGround2.png";
const image3 = "/images/ShoulderBackGround3.png";

const HomeMovingImage = () => {
  const [num, setNum] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => (prevNum === 3 ? 1 : prevNum + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const index = num - 1;

  return (
    <div className="relative h-[578px] w-full overflow-hidden">
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
      <div className="pointer-events-none absolute inset-0 z-[10]">
        <div className="ml-[30px] md:ml-[90px]">
          <div className="mt-[150px] flex h-[95px] w-[101px] items-center justify-center rounded-[10px] md:mt-[113px]">
            <Icon
              name="shoulder"
              className="h-[66px] w-[70px] rounded-[10px] shadow-[1px_2px_4px_rgba(0,0,0,0.25)] md:w-[100px]"
            />
          </div>

          <div className="mt-[90px]md:mt-[20px] mb-[70px] flex flex-col font-['Pretendard'] text-[20px] font-bold leading-[1.4] tracking-[-0.5px] text-white md:mb-[151px] md:mt-[31px] md:text-[36px] md:font-extrabold md:not-italic md:leading-[140%] md:tracking-[-0.9px]">
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
