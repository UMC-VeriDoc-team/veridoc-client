import confetti from "canvas-confetti";
import { useMemo, useRef, useEffect } from "react";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";
import StepCardList from "@/pages/symptom/components/tabs/symptom/fragments/StepCardList";
import StepDescription from "@/pages/symptom/components/tabs/symptom/fragments/StepDescription";
import Button from "@/components/Button/Button";
import { useBaseModal } from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import useIsMobile from "@/hooks/useIsMobile";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { useSymptomGuideStore } from "@/stores/symptom/useSymptomGuideStore";
import { useHomeStore } from "@/stores/home/useHomeStore";

export interface SymptomGuideStep {
  step: number;
  title: string;
  subtitle: string;
  caption: string;
  description: string;
  imageUrl?: string;
}

interface SymptomGuideTabProps {
  symptomName: string;
}

const CARD_W = 255;

// 말풍선(꼬리 제외)
const BUBBLE_W = 468;
const BUBBLE_H = 113;

// StepCardList 고정 높이
const LIST_FIXED_H = 483 + 14;

// completed일 때 가운데로 보여줄 카드(step2) index
const COMPLETED_CENTER_INDEX = 1;

const SymptomGuideTab = ({ symptomName }: SymptomGuideTabProps) => {
  const isMobile = useIsMobile();

  const { painAreaID } = useAuthStore();
  const { openModal } = useBaseModal();
  const { steps, currentIndex, completed, loading, fetchGuide, moveToNextStep, resetGuide } =
    useSymptomGuideStore();
  const { fetchHome } = useHomeStore();

  // 초기 데이터 패칭
  useEffect(() => {
    if (painAreaID) {
      fetchHome();
      fetchGuide(painAreaID);
    }
  }, [painAreaID, fetchGuide, fetchHome]);

  // 완료 시 컨페티 효과
  const didFireConfettiRef = useRef(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { x: 0.5, y: 0.6 },
    });
  };

  // 현재 step은 "버튼 흐름" 기준
  const currentStep = steps[currentIndex];

  const buttonText = useMemo(() => {
    if (completed) return "초기화";

    if (currentIndex === steps.length - 1) return `${symptomName} 가이드 확인 완료`;
    if (currentIndex === 0) return "이 증상에 대해 알아보고 싶어요";
    if (currentIndex === 1) return "이 증상에 대한 설명을 이해했어요";
    if (currentIndex === 2) return "대응 방법을 확인했어요";

    return `${symptomName} 가이드 확인 완료`;
  }, [completed, currentIndex, steps.length]);

  const onClickButton = async () => {
    if (!painAreaID) return;

    if (completed) {
      if (confirm("가이드 진행 상황을 초기화하시겠습니까?")) {
        await resetGuide(painAreaID);
        await fetchGuide(painAreaID);
        didFireConfettiRef.current = false;
      }
      return;
    }

    // 마지막 단계
    if (currentIndex === steps.length - 1) {
      useSymptomGuideStore.setState({ completed: true });

      if (!didFireConfettiRef.current) {
        didFireConfettiRef.current = true;
        fireConfetti();
      }
      return;
    }

    // 일반 단계 이동 (Step 1~3)
    const canMove = await moveToNextStep(painAreaID);

    // 이동 실패 시 (모달/페이지 트리거)
    if (!canMove) {
      if (currentIndex === 1) {
        openModal(ModalType.STEP_DOCTOR_OPINION_REQUIRED);
      } else if (currentIndex === 2) {
        openModal(ModalType.STEP_TREATMENT_INFO_REQUIRED);
      }
      return;
    }
  };

  // 데이터 로딩 중 방어 코드
  if (loading || steps.length === 0) return null;

  const displayIndex = completed ? COMPLETED_CENTER_INDEX : currentIndex;

  // 말풍선 내용
  const bubbleStep = completed ? "확인 완료" : `Step ${currentStep.step}`;
  const bubbleDescription = completed
    ? `${symptomName} 증상에 대한 확인할 수 있는 가이드를 모두 살펴봤어요.\n현재 상태를 지켜보며 필요하면 의료진 상담을 고려해 주세요.`
    : currentStep.description;

  // 데스크탑 말풍선 위치/꼬리 방향
  let bubbleLeft = 0;
  let bubbleSide: "left" | "right" | "center" = "left";

  if (completed) {
    bubbleLeft = (1020 - BUBBLE_W) / 2;
    bubbleSide = "center";
  } else {
    const cardLeftX = displayIndex * CARD_W;
    const cardRightX = (displayIndex + 1) * CARD_W;

    const isLeftGroup = displayIndex <= 1;
    bubbleSide = isLeftGroup ? "left" : "right";
    bubbleLeft = isLeftGroup ? cardLeftX : cardRightX - BUBBLE_W;
  }

  // 모바일: 말풍선은 왼쪽 꼬리 + left=0
  const finalBubbleLeft = isMobile ? 0 : bubbleLeft;
  const finalBubbleSide: "left" | "right" | "center" = isMobile ? "left" : bubbleSide;

  return (
    <section className="flex flex-col items-center">
      <SectionTitle
        title={`${symptomName} 증상 가이드`}
        description={<>일반적으로 알려진 증상에 대한 대응 과정을 설명해드릴게요</>}
        className="mb-12"
      />

      {/* 스텝 카드: 모바일 full-bleed / 데스크탑 max-w 유지 */}
      <div
        className={["w-screen overflow-visible", "md:w-full md:max-w-[1020px]"].join(" ")}
        style={{ height: LIST_FIXED_H }}
      >
        <StepCardList steps={steps} currentIndex={displayIndex} completed={completed} />
      </div>

      {/* 말풍선 */}
      <div
        className="relative w-[80%] max-w-[1020px] overflow-visible md:w-full"
        style={{ height: BUBBLE_H + 18 }}
      >
        <StepDescription
          step={currentStep.step}
          description={bubbleDescription}
          left={finalBubbleLeft}
          top={0}
          side={finalBubbleSide}
          headerText={bubbleStep}
        />
      </div>

      {/* 버튼 */}
      <div className="mt-8 flex w-full max-w-[1020px] justify-center px-[30px] pb-[40px]">
        <Button
          type="button"
          fullWidth={false}
          onClick={onClickButton}
          className="h-[48px] w-full rounded-[4px] text-[18px] font-medium leading-[140%] tracking-[-0.025em] md:w-[404px]"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default SymptomGuideTab;
