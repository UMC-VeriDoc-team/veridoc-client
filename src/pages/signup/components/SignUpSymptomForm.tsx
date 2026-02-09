import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import SymptomGrid from "@/components/Symptom/SymptomGrid";
import useSignupSymptomStore from "@/stores/signup/useSignupSymptomStore";
import { getPainAreas, type PainArea } from "../services/getPainAreas";
import { SYMPTOMS } from "@/constants/symptoms";

type ErrorType = "multi" | null;

const SignUpSymptomForm = () => {
  const navigate = useNavigate();

  const { selectedKey, setSelectedSymptom } = useSignupSymptomStore();

  const [multiAttemptedKey, setMultiAttemptedKey] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);

  // 서버 painAreas 로딩
  const [painAreas, setPainAreas] = useState<PainArea[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getPainAreas();
        setPainAreas(res?.data.painAreas);
      } catch (err) {
        void err;
      }
    };
    run();
  }, []);

  // key -> painAreaID 매칭 (SYMPTOMS.label(한글) <-> 서버 name(한글) 기준)
  const painAreaIdByKey = useMemo(() => {
    const mapByName = new Map(painAreas.map((p) => [p.name, p.painAreaID]));
    const mapByKey = new Map<string, number>();

    for (const s of SYMPTOMS) {
      const id = mapByName.get(s.label);
      if (id != null) mapByKey.set(s.key, id);
    }

    return mapByKey;
  }, [painAreas]);

  const errorConfig = useMemo(() => {
    if (errorType === "multi") {
      return {
        widthClass: "w-[232px]",
        message: "하나만 선택가능합니다",
      };
    }
    return null;
  }, [errorType]);

  // 선택 확정: key + painAreaID를 store에 함께 저장
  const confirmSelect = (key: string | null) => {
    // 미선택(null)이면 8로 저장
    const painAreaID = key ? (painAreaIdByKey.get(key) ?? 8) : 8;

    setSelectedSymptom(key, painAreaID);

    setMultiAttemptedKey(null);
    setErrorType(null);
  };

  const handleSelect = (key: string) => {
    // 아무 것도 선택 안 된 상태
    if (selectedKey === null) {
      confirmSelect(key);
      return;
    }

    // 중복 선택
    if (multiAttemptedKey) {
      // multiAttemptedKey를 누르면 -> 그걸 선택으로 "교체"
      if (key === multiAttemptedKey) {
        confirmSelect(multiAttemptedKey);
        return;
      }

      // selectedKey를 누르면 -> 노란 해제 + 빨간을 선택으로 "교체"
      if (key === selectedKey) {
        confirmSelect(multiAttemptedKey);
        return;
      }

      // 그 외 다른 카드를 누르면 -> 빨간 대상만 바뀌고 에러 유지
      setMultiAttemptedKey(key);
      setErrorType("multi");
      return;
    }

    // 중복 시도 상태가 아닌데, 같은 카드 다시 클릭
    if (selectedKey === key) {
      confirmSelect(null);
      return;
    }

    // 다른 카드 클릭 -> 중복 선택 시도 상태로 전환(빨간 표시)
    setMultiAttemptedKey(key);
    setErrorType("multi");
  };

  const handleSubmit = () => {
    // 중복 선택
    if (multiAttemptedKey) {
      setErrorType("multi");
      return;
    }

    // 아무 것도 선택 안 한 상태면(selectedKey == null) 8로 저장하고 진행
    if (selectedKey === null) {
      setSelectedSymptom(null, 8);
    }

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

      <SymptomGrid
        selectedKey={selectedKey}
        multiAttemptedKey={multiAttemptedKey}
        onSelect={handleSelect}
      />

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
