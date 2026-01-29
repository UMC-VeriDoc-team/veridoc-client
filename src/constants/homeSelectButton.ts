import type { SymptomTag } from "@/types/syptom";
export const DEFUALT_SYMPTOM: SymptomTag[] = [
  { id: "stiff", label: "뻐근함" },
  { id: "tingling", label: "찌릿함" },
  { id: "pain", label: "움직일 때 통증" },
];

export const Head_SYMPTOM: SymptomTag[] = [
  { id: "headache", label: "조이는 듯한 두통" },
  { id: "dizziness", label: "욱신거리는 두통" },
  { id: "nausea", label: "한쪽으로 심한 두통" },
];

export const STOMACH_SYMPTOM: SymptomTag[] = [
  { id: "bloating", label: "쥐어짜는 듯한 복통" },
  { id: "cramps", label: "콕콕 찌르는 복통" },
  { id: "indigestion", label: "더부룩한 복통" },
];
