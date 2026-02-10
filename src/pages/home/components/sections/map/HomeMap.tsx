import { useHomeStore } from "@/stores/home/useHomeStore";
import HospitalMapSection from "./fragments/HospitalMapSection";

const HomeMap = () => {
  const { painAreaName } = useHomeStore();

  return (
    <section className="flex w-full flex-col gap-y-9 px-[30px] sm:px-0">
      <div className="flex flex-col gap-y-[10px]">
        <span className="text-xl font-bold text-gray-950 sm:text-3xl">
          {painAreaName} 통증, 가까운 병원부터 확인해보세요
        </span>
        <span className="text-base font-semibold text-gray-950 sm:text-xl">
          {painAreaName} 통증 관련 진료가 가능한 병원을 표시했어요
        </span>
      </div>
      <HospitalMapSection />
    </section>
  );
};

export default HomeMap;
