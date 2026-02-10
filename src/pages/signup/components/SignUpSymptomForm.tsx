import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import SymptomGrid from "@/components/Symptom/SymptomGrid";

import { useSignupStore } from "@/stores/signup/useSignupStore";
import { UNSELECTED_PAIN_AREA_ID, usePainAreas } from "@/hooks/usePainAreas";

type ErrorType = "multi" | null;

const SignUpSymptomForm = () => {
  const navigate = useNavigate();
  const { painAreaIdByKey } = usePainAreas();
  const { selectedKey, setSelectedSymptom } = useSignupStore();

  const [multiAttemptedKey, setMultiAttemptedKey] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);

  // 상단 에러 메시지 설정
  const errorConfig = useMemo(() => {
    if (errorType === "multi") {
      return {
        widthClass: "w-[232px]",
        message: "하나만 선택가능합니다",
      };
    }
    return null;
  }, [errorType]);

  // 스토어에 선택 정보 확정 저장
  const confirmSelect = (key: string | null) => {
    const painAreaID = key
      ? (painAreaIdByKey.get(key) ?? UNSELECTED_PAIN_AREA_ID)
      : UNSELECTED_PAIN_AREA_ID;

    setSelectedSymptom(key, painAreaID);

    setMultiAttemptedKey(null);
    setErrorType(null);
  };

  // 증상 선택 핸들러
  const handleSelect = (key: string) => {
    // 아무 것도 선택 안 된 상태
    if (selectedKey === null) {
      confirmSelect(key);
      return;
    }

    // 중복 선택 시도 중인 상태
    if (multiAttemptedKey) {
      // 현재 빨간색인 카드를 다시 누르면 -> 해당 카드로 교체 선택
      if (key === multiAttemptedKey) {
        confirmSelect(multiAttemptedKey);
        return;
      }

      // 이미 노란색(확정)인 카드를 누르면 -> 빨간색으로 떠있던 카드로 교체 선택
      if (key === selectedKey) {
        confirmSelect(multiAttemptedKey);
        return;
      }

      // 제3의 다른 카드를 누르면 -> 빨간색 대상만 바꿈
      setMultiAttemptedKey(key);
      setErrorType("multi");
      return;
    }

    // 중복 시도 상태가 아닌데, 이미 선택된 카드를 다시 클릭 -> 선택 해제
    if (selectedKey === key) {
      confirmSelect(null);
      return;
    }

    // 다른 카드 클릭 -> 중복 선택 시도 상태(에러 발생)로 전환
    setMultiAttemptedKey(key);
    setErrorType("multi");
  };

  const handleSubmit = () => {
    // 중복 선택 에러 상태라면 진행 불가
    if (multiAttemptedKey) {
      setErrorType("multi");
      return;
    }

    // 아무것도 선택하지 않았다면 기본 ID로 세팅
    if (selectedKey === null) {
      setSelectedSymptom(null, UNSELECTED_PAIN_AREA_ID);
    }

    // 다음 회원가입 정보 입력 단계로 이동
    navigate("/signup");
  };

  return (
    <div className="relative">
      {errorConfig && (
        <div className="-mt-[78px] mb-8 flex justify-center md:-mt-[60px]">
          <div
            className={[
              errorConfig.widthClass,
              "h-[45px]",
              "rounded-[6px]",
              "border",
              "border-error",
              "text-error",
              "flex items-center",
              "pl-[14px]",
              "bg-white",
            ].join(" ")}
          >
            <div className="flex h-[45px] w-[27px] items-center justify-center">
              <Icon name="info-circle" className="h-[18px] w-[18px]" />
            </div>

            <div className="flex h-[45px] flex-1 items-center px-2 py-[10px]">
              <span className="text-[18px] font-semibold leading-[1.4] tracking-[-0.025em]">
                {errorConfig.message}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 증상 그리드 */}
      <SymptomGrid
        selectedKey={selectedKey}
        multiAttemptedKey={multiAttemptedKey}
        onSelect={handleSelect}
      />

      {/* 하단 버튼 */}
      <div className="mt-[60px] flex w-full justify-center md:mt-[109px]">
        <Button
          type="button"
          onClick={handleSubmit}
          fullWidth={false}
          className="h-12 w-[380px] rounded md:w-[403px]"
        >
          계속하기
        </Button>
      </div>
    </div>
  );
};

export default SignUpSymptomForm;
