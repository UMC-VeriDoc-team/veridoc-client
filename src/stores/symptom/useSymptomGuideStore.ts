import type { StepData, SymptomGuideData } from "@/pages/symptom/services/getSymptomGuide";
import getSymptomGuide from "@/pages/symptom/services/getSymptomGuide";
import type { GuideEventType } from "@/pages/symptom/services/postGuideStepEvent";
import postGuideStepEvent from "@/pages/symptom/services/postGuideStepEvent";
import postGuideStepReset from "@/pages/symptom/services/postGuideStepReset";
import postGuideStepValidate from "@/pages/symptom/services/postGuideStepValidate";
import { create } from "zustand";

interface SymptomGuideState {
  steps: StepData[];
  currentIndex: number;
  completed: boolean;
  loading: boolean;

  fetchGuide: (painAreaId: number | string) => Promise<void>;
  recordEvent: (painAreaId: number | string, event: GuideEventType) => Promise<boolean>;
  moveToNextStep: (painAreaId: number | string) => Promise<boolean>;
  resetGuide: (painAreaId: number | string) => Promise<void>;
  setIndex: (index: number) => void;
}

export const useSymptomGuideStore = create<SymptomGuideState>((set, get) => ({
  steps: [],
  currentIndex: 0,
  completed: false,
  loading: false,

  fetchGuide: async (painAreaId) => {
    set({ loading: true });
    try {
      const data: SymptomGuideData = await getSymptomGuide(painAreaId);
      const userStep = data.userProgress?.currentStep || 1;
      set({
        steps: data.steps,
        currentIndex: userStep > 4 ? 3 : userStep - 1,
        completed: userStep > 4,
      });
    } finally {
      set({ loading: false });
    }
  },

  // 트리거 해제용
  recordEvent: async (painAreaId, event) => {
    try {
      await postGuideStepEvent(painAreaId, event);
      return true; // 기록 성공 시 true 반환
    } catch (error) {
      console.error("이벤트 기록 실패:", error);
      return false;
    }
  },

  moveToNextStep: async (painAreaId) => {
    const { currentIndex, steps } = get();
    const fromStep = currentIndex + 1;
    const toStep = fromStep + 1;

    try {
      // 다음 단계 이동 가능 여부 체크
      const { canMove } = await postGuideStepValidate(painAreaId, { fromStep, toStep });

      if (canMove) {
        if (currentIndex === steps.length - 1) {
          set({ completed: true });
        } else {
          set({ currentIndex: currentIndex + 1 });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Step 이동 실패", error);
      return false;
    }
  },

  resetGuide: async (painAreaId) => {
    try {
      await postGuideStepReset(painAreaId);
      set({ currentIndex: 0, completed: false });
    } catch (error) {
      console.error("초기화 실패", error);
    }
  },

  setIndex: (index) => set({ currentIndex: index }),
}));
