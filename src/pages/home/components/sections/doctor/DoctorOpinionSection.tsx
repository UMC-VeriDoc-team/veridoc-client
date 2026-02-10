import { useEffect, useMemo, useState } from "react";

// 공통 컴포넌트 및 아이콘
import { BlueBox } from "@/components/Box/BlueBox";
import { OrangeBox } from "@/components/Box/OrangeBox";
import { GreenBox } from "@/components/Box/GreenBox";
import Icon from "@/components/Icon/Icon";

// 내부 fragments 및 로직
import SymptomTagButton from "./fragments/SymptomTagButton";
import { DoctorOpinion } from "./fragments/DoctorOpinion";

// 상태 및 API
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import { useHomeStore } from "@/stores/home/useHomeStore";
import type { GetDoctorOpinionSummaryResponse } from "@/pages/home/services/getDoctorOpinionSummary";
import getDoctorOpinionSummary from "@/pages/home/services/getDoctorOpinionSummary";

const PRIMARY_AREAS = ["어깨", "무릎", "복통"];

const DoctorOpinionSection = () => {
  const { openModal } = useBaseModal();
  const { setDoctorOpinionId } = useDoctorOpinionModalStore();
  const { symptoms, painAreaName } = useHomeStore();

  // 태그(증상) 데이터 가공 로직
  const tags = useMemo(() => {
    return (symptoms ?? [])
      .filter((s) => s?.answerId != null && s?.name)
      .map((s) => ({
        id: String(s.symptomId),
        label: s.name,
        answerId: String(s.answerId),
      }));
  }, [symptoms]);

  // 선택된 태그 및 answerId 관리
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const selectedTagId = selectedTag ?? tags[0]?.id ?? "";
  const selectedAnswerId = useMemo(() => {
    return tags.find((t) => t.id === selectedTagId)?.answerId ?? "";
  }, [tags, selectedTagId]);

  // 전문의 요약 데이터 상태
  const [summaryData, setSummaryData] = useState<GetDoctorOpinionSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // 증상 부위에 따른 배경색
  const bgColorClass = PRIMARY_AREAS.includes(painAreaName ?? "")
    ? "bg-brand-primary"
    : "bg-brand-orange";

  // 4. answerId 변경 시 데이터 패칭
  useEffect(() => {
    if (!selectedAnswerId) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await getDoctorOpinionSummary(selectedAnswerId);
        setSummaryData(data);
      } catch {
        setSummaryData(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchSummary();
  }, [selectedAnswerId]);

  const handleShowDoctorOpinion = () => {
    if (selectedAnswerId) {
      setDoctorOpinionId(Number(selectedAnswerId));
      openModal(ModalType.HOME_DOCTOR_OPINION);
    }
  };

  if (tags.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-y-12 p-[30px] sm:gap-20 sm:p-0 md:px-0">
      {/* 상단 증상 탭 버튼 */}
      <SymptomTagButton
        onClick={(tagId) => setSelectedTag(tagId)}
        tags={tags}
        selectedTag={selectedTagId}
      />

      <div className="flex w-full flex-col sm:px-[30px] md:px-0">
        {/* 제목 섹션 */}
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
            {/* 모바일 전용 박스 */}
            <div className="flex gap-x-2 pb-2 sm:hidden">
              <BlueBox />
              <GreenBox />
            </div>
          </div>

          {/* 오른쪽 상세 내용 영역 */}
          <div className="flex w-full flex-col">
            <span className="mb-[11px] hidden text-base font-semibold text-gray-950 md:block">
              관련 전문의 답변
            </span>

            {/* 데스크탑 전용 박스 */}
            <div className="hidden sm:mb-[30px] sm:flex sm:gap-2.5">
              <BlueBox />
              <GreenBox />
              <OrangeBox />
            </div>

            {/* 모바일 전용 박스 */}
            <div className="mb-[10px] sm:hidden">
              <OrangeBox />
            </div>

            {/* 전문의 요약 텍스트 영역 */}
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
                className="flex shrink-0 items-center justify-end gap-2 rounded-[5px] bg-brand-primary px-4 py-2 transition-opacity hover:opacity-80"
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
    </div>
  );
};

export default DoctorOpinionSection;
