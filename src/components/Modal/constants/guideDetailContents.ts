import type { GuideDetailContent, GuideDetailType } from "../types/guideDetail";

export const GUIDE_DETAIL_CONTENTS: Record<GuideDetailType, GuideDetailContent> = {
  COMMON_SYMPTOMS: {
    header: {
      title: "이런 증상은 흔해요",
      subtitle: "비슷한 증상들을 모아 원인을 분석해 드려요",
      imageSrc: "/src/assets/images/home/guides/modal/guide-common-symptoms.svg",
    },
    source: {
      name: "국민건강보험공단 건강정보",
      link: "https://naver.com",
    },
    paragraphs:
      "일상생활 속에서 나타나는 통증이나 불편함은 생각보다 많은 사람들이 경험합니다. 특히 장시간 같은 자세를 유지하거나 스마트폰·컴퓨터 사용이 잦은 경우, 목·어깨·허리 등 특정 부위에 뻐근함이나 불편함을 느끼는 일이 흔합니다. 이러한 증상은 대부분 생활 습관, 자세, 피로 누적과 같은 요인과 관련되어 나타나는 경우가 많으며, 반드시 특정 질환을 의미하지는 않습니다. 다만 증상이 반복되거나 점점 불편함이 커지는 경우에는 생활 패턴을 점검해보는 것이 도움이 될 수 있습니다.",
  },

  NEED_HOSPITAL: {
    header: {
      title: "당장 병원에 가야 하는 경우",
      subtitle: "방치하면 위험한 신호들, 놓치지 말고 확인하세요",
      imageSrc: "/src/assets/images/home/guides/modal/guide-need-hospital.svg",
    },
    source: {
      name: "국민건강보험공단 건강정보",
      link: "https://naver.com",
    },
    paragraphs:
      "일상적인 통증과 달리, 아래와 같은 경우에는 의료기관의 진료가 필요한 신호일 수 있습니다. 이러한 증상은 단순한 피로나 불편함을 넘어 전문적인 진료가 필요할 수 있으므로 주의가 필요합니다.",
    steps: [
      {
        title: "통증이 갑자기 심해지거나 점점 악화되는 경우",
        description: "단순 피로가 아닌 원인이 있을 수 있습니다.",
      },
      {
        title: "휴식을 취해도 통증이 줄어들지 않는 경우",
        description: "정확한 원인 확인과 적절한 치료를 위해 전문의 진료를 권장합니다.",
      },
      {
        title: "일상적인 움직임이 어려울 정도로 통증이 지속되는 경우",
        description: "무리하지 말고 의료진의 진단을 받아보는 것이 좋습니다.",
      },
      {
        title: "저림, 감각 이상, 힘 빠짐 등이 함께 나타나는 경우",
        description: "신경 자극이나 압박이 동반되었을 가능성이 있습니다.",
      },
      {
        title: "발열, 외상, 사고 이후 통증이 발생한 경우",
        description: "염증이나 조직 손상이 동반되었을 가능성이 있습니다.",
      },
    ],
  },

  DAILY_CARE: {
    header: {
      title: "일상에서 조심하면 좋은 점",
      subtitle: "작은 습관 하나로 내 몸을 더 건강하게 지켜요",
      imageSrc: "/src/assets/images/home/guides/modal/guide-daily-care.svg",
    },
    source: {
      name: "국민건강보험공단 건강정보",
      link: "https://naver.com",
    },
    paragraphs:
      "일상 속 작은 습관들이 통증이나 불편함에 영향을 줄 수 있습니다. 다음과 같은 점들을 의식하는 것만으로도 부담을 줄이는 데 도움이 될 수 있습니다. 이러한 습관은 특정 증상을 치료하기 위한 방법이라기보다, 일상에서 몸에 가해지는 부담을 줄이기 위한 기본적인 관리 방법입니다.",
    steps: [
      {
        title: "오랜 시간 같은 자세를 유지하지 않기",
        description: "정체된 혈류와 근육 긴장을 완화하는 데 도움이 됩니다.",
      },
      {
        title: "스마트폰이나 화면을 볼 때 고개를 과도하게 숙이지 않기",
        description: "목과 어깨에 집중되는 부담을 줄이는 데 도움이 됩니다.",
      },
      {
        title: "무거운 물건을 들 때 한쪽에만 부담을 주지 않기",
        description: "신체 균형이 무너지는 것을 예방하는 데 도움이 됩니다.",
      },
      {
        title: "충분한 휴식과 스트레칭을 통해 몸의 긴장을 완화하기",
        description: "과도한 긴장이 쌓이기 전에 몸을 회복시켜 주세요.",
      },
    ],
  },

  HOW_TO_USE: {
    header: {
      title: "VeriDoc 이렇게 사용하세요",
      subtitle: "베리닥의 기능을 200% 활용하는 스마트한 방법!",
      imageSrc: "/src/assets/images/home/guides/modal/guide-how-to-use.svg",
    },
    source: {
      name: "국민건강보험공단 건강정보",
      link: "https://naver.com",
    },
    paragraphs:
      "베리닥은 사용자가 느끼는 증상을 바탕으로 검증된 의료 정보와 공개된 전문의 답변을 정리해 제공하는 서비스입니다. 베리닥에서 제공하는 정보는 개인의 상태를 직접 판단하거나 진단을 내리기 위한 것이 아니라, 증상을 이해하는 데 도움을 주기 위한 참고 자료입니다.",
    steps: [
      {
        title: "불편함을 느끼는 증상이나 부위를 선택합니다",
        description: "현재 느끼는 증상을 기준으로 가장 가까운 항목을 골라 주세요.",
      },
      {
        title: "선택한 증상에 따라 관련 정보와 전문의 답변을 확인할 수 있습니다",
        description: "증상별로 정리된 정보를 단계별로 안내해 드립니다.",
      },
      {
        title: "필요에 따라 임시 대처 방법이나 병원 정보를 참고할 수 있습니다",
        description: "상황에 맞는 참고 정보를 선택적으로 확인해 보세요.",
      },
    ],
  },
};
