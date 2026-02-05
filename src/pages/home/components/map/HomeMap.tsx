import HospitalMapSection from "./HospitalMapSection";

const HomeMap = () => {
  return (
    <section className="flex w-full flex-col gap-y-9">
      <div className="flex flex-col gap-y-[10px]">
        <span className="text-[28px] font-bold text-gray-950">
          어깨 통증, 가까운 병원부터 확인해보세요
        </span>
        <span className="text-xl font-bold text-gray-950">
          어깨 통증 관련 진료가 가능한 병원을 표시했어요
        </span>
      </div>
      <HospitalMapSection />
    </section>
  );
};

export default HomeMap;
