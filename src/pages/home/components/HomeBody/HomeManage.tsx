import AlternativeCard from "./HomeAlternative/AlternativeCard";
import { useHomeStore } from "@/stores/home/useHomeStore";

const HomeManage = () => {
  const { temporaryGuides } = useHomeStore();

  return (
    <section className="flex w-full flex-col pl-[30px] text-left sm:px-0">
      <div className="flex flex-col">
        <span className="italic-normal text-xl font-bold leading-[140%] text-gray-950 sm:text-3xl">
          어깨 통증 임시 대처 방안
        </span>
        <div className="mt-[10px] flex items-center self-stretch">
          <span className="text-base font-semibold leading-[140%] text-gray-950 sm:text-xl">
            선택한 부위를 기준으로 임시 대처 방안을 확인하세요
          </span>
        </div>
      </div>

      <article className="mt-5 flex md:mt-[40px] md:overflow-x-hidden">
        <div className="flex flex-nowrap gap-x-5 overflow-x-scroll last:pr-[30px] md:grid md:grid-cols-3 md:gap-x-[30px] md:px-0">
          {temporaryGuides.map((guide) => (
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
        </div>
      </article>
    </section>
  );
};

export default HomeManage;
