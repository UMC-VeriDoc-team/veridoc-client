import { AlternativeCard } from "./HomeBody/HomeAlternative/AlternativeCard";

export const HomeManage = () => {
  return (
    <section className="flex flex-col text-left">
      <div className="flex flex-col">
        <span className="font-['Pretendard'] text-[28px] font-[700] leading-[140%] tracking-[-0.7px] text-[#171719]">
          어깨 통증 임시 대처 방안
        </span>
        <div className="mt-[10px] flex h-12 items-center self-stretch">
          <span className="font-['Pretendard'] text-[20px] font-bold leading-[1.4] tracking-[-0.5px] text-[#171719]">
            선택한 부위를 기준으로 임시 대처 방안을 확인하세요
          </span>
        </div>
      </div>

      <div className="mt-[40px]">
        <AlternativeCard />
      </div>
    </section>
  );
};
