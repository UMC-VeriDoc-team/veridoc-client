import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import SymptomGrid from "@/components/Symptom/SymptomGrid";

type ErrorType = "required" | "multi" | null;

const SignUpSymptomForm = () => {
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [multiAttemptedKey, setMultiAttemptedKey] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);

  const errorConfig = useMemo(() => {
    if (errorType === "required") {
      return {
        widthClass: "w-[376px]",
        message: "정확한 안내를 위해 증상 선택이 필요합니다",
      };
    }
    if (errorType === "multi") {
      return {
        widthClass: "w-[232px]",
        message: "하나만 선택가능합니다",
      };
    }
    return null;
  }, [errorType]);

  const handleSelect = (key: string) => {
    // 아무 것도 선택 안 된 상태
    if (selectedKey === null) {
      setSelectedKey(key);
      setMultiAttemptedKey(null);
      setErrorType(null);
      return;
    }

    // 중복 선택
    if (multiAttemptedKey) {
      // multiAttemptedKey를 누르면 -> 그걸 선택으로 "교체"
      if (key === multiAttemptedKey) {
        setSelectedKey(multiAttemptedKey);
        setMultiAttemptedKey(null);
        setErrorType(null);
        return;
      }

      // selectedKey를 누르면 -> 노란 해제 + 빨간을 선택으로 "교체"
      if (key === selectedKey) {
        setSelectedKey(multiAttemptedKey);
        setMultiAttemptedKey(null);
        setErrorType(null);
        return;
      }

      // 그 외 다른 카드를 누르면 -> 빨간 대상만 바뀌고 에러 유지
      setMultiAttemptedKey(key);
      setErrorType("multi");
      return;
    }

    // 중복 시도 상태가 아닌데, 같은 카드 다시 클릭
    if (selectedKey === key) {
      setSelectedKey(null);
      setMultiAttemptedKey(null);
      setErrorType(null);
      return;
    }

    // 다른 카드 클릭 -> 중복 선택 시도 상태로 전환(빨간 표시)
    setMultiAttemptedKey(key);
    setErrorType("multi");
  };

  const handleSubmit = () => {
    // 선택 안 함
    if (!selectedKey) {
      setErrorType("required");
      return;
    }

    // 중복 선택
    if (multiAttemptedKey) {
      setErrorType("multi");
      return;
    }

    navigate("/signup");
  };

  return (
    <>
      {errorConfig && (
        <div className="fixed left-1/2 top-[287px] z-50 -translate-x-1/2">
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

      <SymptomGrid
        selectedKey={selectedKey}
        multiAttemptedKey={multiAttemptedKey}
        onSelect={handleSelect}
      />

      <div className="mt-[109px] flex w-full justify-center">
        <Button
          type="button"
          onClick={handleSubmit}
          fullWidth={false}
          className="h-12 w-[403px] rounded"
        >
          계속하기
        </Button>
      </div>
    </>
  );
};

export default SignUpSymptomForm;
