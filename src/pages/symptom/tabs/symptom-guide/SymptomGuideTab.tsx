import { useEffect, useMemo, useState } from "react";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";
import StepCardList from "@/pages/symptom/tabs/symptom-guide/components/StepCardList";
import StepDescription from "@/pages/symptom/tabs/symptom-guide/components/StepDescription";
import Button from "@/components/Button/Button";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";

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
  const { openModal } = useBaseModal(); // 모달 다시 쓸 거면 유지, 아니면 지워도 됨

  const steps: SymptomGuideStep[] = useMemo(
    () => [
      {
        step: 1,
        title: "불편함을 느낌",
        subtitle: "어깨 통증을 인식함",
        caption: "이 단계는 어깨에 불편함이나 통증이 있다는 것을 스스로 인식하는 단계예요.",
        description:
          "이 단계는 어깨에 불편함이나 통증이 있다는 것을 스스로 인식하는 단계예요. 많은 사람들이 이 시점에서 왜 이런 증상이 생겼는지 궁금해해요.",
      },
      {
        step: 2,
        title: "정보를 찾는 단계",
        subtitle: "증상 원인을 이해함",
        caption: "증상을 이해하는 것이 불안을 줄이는 데 도움이 될 수 있어요.",
        description:
          "이 단계에서는 어깨 통증이 어떤 이유로 생길 수 있는지 전문의 설명을 통해 알아볼 수 있어요. 증상을 이해하는 것이 불안을 줄이는 데 도움이 될 수 있어요.",
      },
      {
        step: 3,
        title: "대처 방법 참고하는 단계",
        subtitle: "생활 관리/병원 고려",
        caption: "일상에서 참고할 수 있는 관리 방법이나,병원 방문을 고려해볼 수 있어요!",
        description:
          "이 단계에서는 일상에서 참고할 수 있는 관리 방법이나, 병원 방문을 고려할 수 있어요.",
      },
      {
        step: 4,
        title: "상태를 안정적으로 인지",
        subtitle: "증상 변화를 스스로 느끼고 판단",
        caption: "증상에 대해 알고 있어\n이전보다 덜 불안하게 느껴질 수 있어요.",
        description:
          "증상에 대해 알고 있어 이전보다 덜 불안하게 느껴질 수 있어요. 현재 상태를 지켜보면서, 필요한 경우 병원을 고려할 수 있어요.",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  // 모바일 여부
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 현재 step은 "버튼 흐름" 기준
  const currentStep = steps[currentIndex];

  const buttonText = useMemo(() => {
    if (completed) return "초기화";
    if (currentIndex === 0) return "이 증상에 대해 알아보고 싶어요";
    if (currentIndex === 1) return "이 증상에 대한 설명을 이해했어요";
    if (currentIndex === 2) return "대응 방법을 확인했어";
    return "어깨 증상 가이드 확인 완료";
  }, [completed, currentIndex]);

  const onClickButton = () => {
    if (completed) {
      setCompleted(false);
      setCurrentIndex(0);
      return;
    }

    // step4에서 누르면 완료 상태로 전환
    if (currentIndex === steps.length - 1) {
      setCompleted(true);
      return;
    }

    // 2단계 -> 3단계: 전문의 소견 모달
    if (currentIndex === 1) {
      openModal(ModalType.STEP_DOCTOR_OPINION_REQUIRED);
      return;
    }
    // 3단계 -> 4단계: 대처방안/병원 모달
    if (currentIndex === 2) {
      openModal(ModalType.STEP_TREATMENT_INFO_REQUIRED);
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // 카드 표시용 index (완료 시 2단계를 중앙)
  const displayIndex = completed ? COMPLETED_CENTER_INDEX : currentIndex;

  // 말풍선 내용
  const bubbleStep = completed ? "확인 완료" : `Step ${currentStep.step}`;
  const bubbleDescription = completed
    ? "어깨 증상에 대한 확인할 수 있는 가이드를 모두 살펴봤어요.\n현재 상태를 지켜보며 필요하면 의료진 상담을 고려해 주세요."
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
        className="relative w-full max-w-[1020px] overflow-visible"
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
      <div className="mt-8 flex w-full max-w-[1020px] justify-center pb-[40px]">
        <Button
          type="button"
          fullWidth={false}
          onClick={onClickButton}
          className="h-[48px] w-[404px] rounded-[4px] px-[10px] text-[18px] font-medium leading-[140%] tracking-[-0.025em]"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default SymptomGuideTab;
