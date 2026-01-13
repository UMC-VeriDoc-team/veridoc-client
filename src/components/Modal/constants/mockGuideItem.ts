import type { GuideItemProps } from "../components/home/components/GuideItem";

// 임시 데이터
export const MOCK_GUIDE_ITEMS: GuideItemProps[] = [
  {
    id: "SHOULDER_ROTATE",
    title: "어깨를 천천히 앞뒤로 돌려줍니다.",
    description: "처음에는 작은 범위로 시작해 점차 늘려보세요.",
    icon: {
      src: "https://cdn.example.com/guide/shoulder_rotate_v3.png",
      alt: "어깨를 앞뒤로 돌리는 동작 아이콘",
    },
  },
  {
    id: "DONT_PULL_PAIN",
    title: "통증이 느껴지는 방향으로는 과도하게 당기지 않습니다.",
    description: "통증이 생기면 동작을 멈추고 휴식을 취하세요.",
    icon: {
      src: "https://cdn.example.com/guide/no_pain_pull_v2.png",
      alt: "통증 유발 동작 금지 아이콘",
    },
  },
  {
    id: "NECK_SHOULDER_STRETCH",
    title: "목과 어깨를 부드럽게 늘려주는 동작을 짧은 시간 반복합니다.",
    description: "반동을 주지 말고 천천히 유지하는 것이 중요합니다.",
    icon: {
      src: "https://cdn.example.com/guide/neck_shoulder_stretch_v4.png",
      alt: "목과 어깨를 스트레칭하는 동작 아이콘",
    },
  },
];
