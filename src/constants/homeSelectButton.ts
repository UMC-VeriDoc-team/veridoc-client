import type { SymptomTag } from "@/types/syptom";
export const SHOULDER_SYMPTOM: SymptomTag[] = [
  { id: "shoulder_stiff", label: "뻐근함" },
  { id: "shoulder_tingling", label: "찌릿함" },
  { id: "shoulder_pain", label: "움직일 때 통증" },
];

export const WAIST_SYMPTOM: SymptomTag[] = [
  { id: "waist_stiff", label: "뻐근함" },
  { id: "waist_tingling", label: "찌릿함" },
  { id: "waist_pain", label: "움직일 때 통증" },
];

export const KNEE_SYMPTOM: SymptomTag[] = [
  { id: "knee_stiff", label: "뻐근함" },
  { id: "knee_tingling", label: "찌릿함" },
  { id: "knee_pain", label: "움직일 때 통증" },
];

export const NECK_SYMPTOM: SymptomTag[] = [
  { id: "neck_stiff", label: "뻐근함" },
  { id: "neck_tingling", label: "찌릿함" },
  { id: "neck_pain", label: "움직일 때 통증" },
];

export const HEAD_SYMPTOM: SymptomTag[] = [
  { id: "headache", label: "조이는 듯한 두통" },
  { id: "dizziness", label: "욱신거리는 두통" },
  { id: "nausea", label: "한쪽으로 심한 두통" },
];

export const STOMACH_SYMPTOM: SymptomTag[] = [
  { id: "bloating", label: "쥐어짜는 듯한 복통" },
  { id: "cramps", label: "콕콕 찌르는 복통" },
  { id: "indigestion", label: "더부룩한 복통" },
];

export const SYMPTOM_TEXT = {
  [SHOULDER_SYMPTOM[0].id]:
    "말씀하신 목과 어깨의 뻐근함과 두통은 거북목증후군에서 흔히 나타나는 특징일 수 있습니다.\n거북목증후군은 목이 정상적인 위치보다 앞으로 돌출되면서 척추 그자체와 해당부분과 이어지는 날개뼈 및 어깨까지\n 영향을 끼칠 수 있는 만성적 질환입니다. ",
  [WAIST_SYMPTOM[0].id]:
    "허리 뻐근함 증상의 원인은 잘못된 자세인 경우가 많고 외부 충격에 의해서도 생길 수 있습니다.\n그러니 너무 오래 앉아 있거나 바르지 못한 자세인 경우라면 개선을 해서 관리를 해줘야 합니다.",
  [KNEE_SYMPTOM[0].id]: "대기 중입니다",
  [NECK_SYMPTOM[0].id]: "대기 중입니다",
  [HEAD_SYMPTOM[0].id]: "대기 중입니다",
  [STOMACH_SYMPTOM[0].id]: "대기 중입니다",

  [SHOULDER_SYMPTOM[1].id]:
    "팔을 들어올릴 때 통증이 생기거나, 어깨가 걸리는 듯한 느낌이 든다면 어깨충돌증후군 가능성을 고려할 수 있습니다.\n이 질환은 어깨를 감싸는 뼈와 힘줄 사이 공간이 좁아지면서 팔을 움직일 때 힘줄이 반복적으로 마찰되어 통증이 발생하는 상태입니다. 초기에는 단\n순한 근육통처럼 느껴지지만, 반복될수록 염증이 심해지고 어깨 움직임이 제한될 수 있습니다.",
  [WAIST_SYMPTOM[1].id]:
    "말씀해주신 증상만으로 판단하자면, 디스크(추간판 탈출증)와 관련된 문제일 가능성이 있어 보입니다.\n특히 다음과 같은 점들이 그런 의심을 강하게 합니다.\n기침할때 통증은 복압이 올라갈 때 통증이 심해진다는 건 디스크 탈출이 신경을 누르고 있을 수 있다는 신호입니다.",
  [KNEE_SYMPTOM[1].id]: "대기 중입니다",
  [NECK_SYMPTOM[1].id]: "대기 중입니다",
  [HEAD_SYMPTOM[1].id]: "대기 중입니다",
  [STOMACH_SYMPTOM[1].id]: "대기 중입니다",

  [SHOULDER_SYMPTOM[2].id]:
    "어깨 통증은 단순한 근육 피로부터 어깨충돌증후군, 회전근개 질환, 오십견 등 다양한 원인으로 발생할 수 있습니다.\n특히 팔을 들어올릴 때 통증이 심하고 걸리는 느낌이 든다면, 어깨 주변 힘줄이 좁은 공간 안에서 마찰되며\n염증이 생긴  ‘어깨충돌증후군’일 가능성이 높습니다.",
  [WAIST_SYMPTOM[2].id]:
    `우선 질문자님의 현재 상태를 직접 보고 진단한 것이 아니기에, 구체적인 답변드리기 어려운 점 양해 바랍니다.\n질문글을 보면 '척추분리증', '후관절증후군' 같은 척추 질환으로 인해 허리통증 증상이 생기는 것으로 보입니다.`,
  [KNEE_SYMPTOM[2].id]: "대기 중입니다",
  [NECK_SYMPTOM[2].id]: "대기 중입니다",
  [HEAD_SYMPTOM[2].id]: "대기 중입니다",
  [STOMACH_SYMPTOM[2].id]: "대기 중입니다",
};
