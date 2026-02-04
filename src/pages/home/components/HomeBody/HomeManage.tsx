import { COMMON_GUIDES_MOCK } from "@/constants/mock/home/mockHomeTemporaryMeasure";
import AlternativeCard from "./HomeAlternative/AlternativeCard";

const HomeManage = () => {
  return (
    <section className="flex w-full flex-col text-left">
      <div className="flex flex-col">
        <span className="text-[28px] font-[700] text-gray-950">어깨 통증 임시 대처 방안</span>
        <div className="mt-[10px] flex h-12 items-center self-stretch">
          <span className="text-[20px] font-bold text-gray-950">
            선택한 부위를 기준으로 임시 대처 방안을 확인하세요
          </span>
        </div>
      </div>

      <article className="mt-[40px] flex w-full grid-rows-3 gap-x-[30px]">
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
