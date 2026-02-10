import { create } from "zustand";
import type { GuideDetailType } from "@/components/Modal/types/usageGuideDetail";

// 범용 가이드 상세 모달 전용 상태 타입
interface GuideDetailModalState {
  guideType: GuideDetailType; // 현재 선택된 가이드 타입
  setGuideType: (type: GuideDetailType) => void; // 가이드 타입 설정
  resetGuideType: () => void; // 기본값으로 리셋
}

// 범용 가이드 상세 모달 전용 스토어
export const useGuideDetailModalStore = create<GuideDetailModalState>((set) => ({
  guideType: "COMMON_SYMPTOMS",
  setGuideType: (type) => set({ guideType: type }),
  resetGuideType: () => set({ guideType: "COMMON_SYMPTOMS" }),
}));
