import { useEffect, useState } from "react";

import { BlueBox } from "./HomeOpinion/BlueBox";
import { OrangeBox } from "./HomeOpinion/OrangeBox";
import { GreenBox } from "./HomeOpinion/GreenBox";
import { DoctorOpinion } from "./HomeOpinion/DoctorOpinion";

import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import { useHomeStore } from "@/stores/home/useHomeStore";
import type { GetDoctorOpinionSummaryResponse } from "../../services/getDoctorOpinionSummary";
import getDoctorOpinionSummary from "../../services/getDoctorOpinionSummary";

type HomeOpinionProps = {
  answerId: string;
};

const PRIMARY_AREAS = ["어깨", "무릎", "복통"];

const HomeOpinion = ({ answerId }: HomeOpinionProps) => {
  const { openModal } = useBaseModal();
  const { setDoctorOpinionId } = useDoctorOpinionModalStore();
  const { painAreaName } = useHomeStore();

  // 전문의 요약 데이터
  const [summaryData, setSummaryData] = useState<GetDoctorOpinionSummaryResponse | null>(null);

  const [loading, setLoading] = useState(false);

  // 증상 부위에 따른 배경색 분기
  const bgColorClass = PRIMARY_AREAS.includes(painAreaName ?? "")
    ? "bg-brand-primary"
    : "bg-brand-orange";

  //  answerId 변경 시 전문의 요약 조회
  useEffect(() => {
    if (!answerId) return;

    const run = async () => {
      try {
        setLoading(true);
        const data = await getDoctorOpinionSummary(answerId);
        setSummaryData(data);
      } catch {
        setSummaryData(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [answerId]);

  // 전문의 소견 전체 보기 모달 오픈
  const handleShowDoctorOpinion = () => {
    setDoctorOpinionId(answerId);
    openModal(ModalType.HOME_DOCTOR_OPINION);
  };

  return (
    <div className="flex w-full flex-col sm:px-[30px] md:px-0">
      {/* 제목 */}
      <span className="mb-[10px] text-[20px] font-bold text-gray-950 sm:text-[28px] md:mb-10">
        {painAreaName} 통증 전문가 소견
      </span>

      <span className="mb-[20px] text-base font-semibold text-gray-950 sm:hidden">
        관련 전문의 답변
      </span>

      <div className="flex flex-col md:flex-row md:items-start md:gap-[30px]">
        {/* 왼쪽 아이콘 영역 */}
        <div className="relative mb-[10px] flex items-end justify-between sm:block sm:gap-x-4 md:mb-0">
          <Icon
            name="home-doctor-opinion"
            className={`w-[150px] rounded-full sm:min-h-[200px] sm:min-w-[200px] ${bgColorClass}`}
          />

          {/* 모바일: 파란박스, 초록박스 */}
          <div className="flex gap-x-2 pb-2 sm:hidden">
            <BlueBox />
            <GreenBox />
          </div>
        </div>

        {/* 오른쪽 내용 영역 */}
        <div className="flex w-full flex-col">
          <span className="mb-[11px] hidden text-base font-semibold text-gray-950 md:block">
            관련 전문의 답변
          </span>

          {/* 데스크탑 */}
          <div className="hidden sm:mb-[30px] sm:flex sm:gap-2.5">
            <BlueBox />
            <GreenBox />
            <OrangeBox />
          </div>

          {/* 모바일 */}
          <div className="mb-[10px] sm:hidden">
            <OrangeBox />
          </div>

          {/* 전문의 요약 */}
          <div className="mb-5 md:mb-[30px]">
            <DoctorOpinion
              text={
                loading
                  ? "전문의 소견을 불러오는 중입니다..."
                  : (summaryData?.summary ?? "전문의 소견이 아직 없습니다.")
              }
            />
          </div>

          {/* 전체 보기 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={handleShowDoctorOpinion}
              className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-brand-primary px-4 py-2 hover:opacity-80"
            >
              <p className="text-base font-semibold leading-[24px] text-white md:text-lg">
                전체 보기
              </p>
              <Icon name="chevron-right-white" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOpinion;
