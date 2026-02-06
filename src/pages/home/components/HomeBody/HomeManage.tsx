import { COMMON_GUIDES_MOCK } from "@/constants/mock/home/mockHomeTemporaryMeasure";
import AlternativeCard from "./HomeAlternative/AlternativeCard";

const HomeManage = () => {
  return (
    <section className="flex w-full flex-col text-left">
      {/* 1. 제목 및 설명 영역: 모바일에서 왼쪽 여백 30px 적용 */}
      <div className="flex flex-col px-[30px] md:px-0">
        <span className="italic-normal font-['Pretendard'] text-[20px] font-[700] leading-[140%] tracking-[-0.5px] text-[#171719] md:text-[28px] md:font-[700] md:text-gray-950">
          어깨 통증 임시 대처 방안
        </span>
        <div className="mt-[10px] flex h-12 items-center self-stretch">
          <span className="italic-normal font-['Pretendard'] text-[18px] font-semibold leading-[140%] tracking-[-0.45px] text-[#171719] md:text-[20px] md:font-bold md:text-gray-950">
            선택한 부위를 기준으로 임시 대처 방안을 확인하세요
          </span>
        </div>
      </div>

      <article className="mt-[20px] flex w-full gap-x-[20px] overflow-x-auto px-[30px] pb-4 md:mt-[40px] md:gap-x-[30px] md:overflow-visible md:px-0">
        {COMMON_GUIDES_MOCK.map((guide) => (
          <AlternativeCard
            key={guide.guideId}
            guideId={guide.guideId}
            title={guide.title}
            badges={guide.badges}
            description={guide.description}
            imageUrl={guide.imageUrl}
            type={guide.type}
            duration={guide.duration}
          />
        ))}
      </article>
    </section>
  );
};

export default HomeManage;
