import type { ConsultationGuideItem } from "../components/home/components/MedicalConsultationGuide";

// 진료 권유 목데이터
export const MOCK_MEDICAL_CONSULTATION_GUIDE: ConsultationGuideItem[] = [
  {
    id: "pain_persistent",
    title: "통증이 지속되거나 심해질 때",
    description: "단순 근육 피로가 아닌 원인이 있을 수 있습니다.",
  },
  {
    id: "weak_arm",
    title: "팔을 들기 어렵거나 힘이 빠질 때",
    description: "어깨 관절이나 힘줄 기능 저하가 의심될 수 있습니다.",
  },
  {
    id: "sleep_disturbed",
    title: "야간 통증으로 수면이 자주 깰 때",
    description: "염증이나 구조적 문제로 통증이 심해졌을 가능성이 있습니다.",
  },
];
