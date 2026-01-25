import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { SymptomTabs } from "@/pages/symptom/components/SymptomTabs";
import { SymptomEmptyState } from "@/pages/symptom/components/SymptomEmptyState";
import { LifeGuideTab } from "@/pages/symptom/tabs/life-guide/LifeGuideTab";
import SymptomGuideTab from "@/pages/symptom/tabs/symptom-guide/SymptomGuideTab";

type TabKey = "life" | "guide";

const SymptomPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const symptomId = searchParams.get("symptomId");
  const tab = (searchParams.get("tab") as TabKey) ?? "life";

  const symptomName = useMemo(() => {
    if (!symptomId) return "";
    const map: Record<string, string> = {
      "1": "어깨",
      "2": "허리",
      "3": "무릎",
      "4": "목",
      "5": "두통",
      "6": "복통",
    };
    return map[symptomId] ?? "어깨";
  }, [symptomId]);

  const setTab = (next: TabKey) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("tab", next);
      return nextParams;
    });
  };

  // blocked 처리: guide 탭에서 막을 때
  // 체크사항: 사용되지 않은 변수나 함수는 CI 검사에서 실패를 유도합니다. 따라서 임시 방편으로 검증 통과되도록 해두었으니 이후 개발 시에 체크바랍니다:)
  // const [blockedMessage, setBlockedMessage] = useState<string | null>(null);
  const [blockedMessage] = useState<string | null>(null);

  // const onBlocked = (message: string) => {
  //   setBlockedMessage(message);
  //   window.alert(message); // TODO: 모달로 교체
  // };

  const onClickSelectSymptom = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("symptomId", "1"); // 기본 선택(임시)
      nextParams.set("tab", "life");
      return nextParams;
    });
  };

  return (
    <>
      {/* 증상 페이지 전용 로고 영역 */}
      <div className="flex w-full items-center justify-center bg-white pt-[68px]">
        <img src={logo} alt="VeriDoc 로고" className="h-[85px] w-[285px]" draggable={false} />
      </div>

      {tab === "guide" ? (
        <div className="w-full py-10 pt-[29px]">
          <div className="flex justify-center">
            <SymptomTabs value={tab} onChange={setTab} />
          </div>

          <div className="mt-[68px] flex justify-center">
            <div className="w-full max-w-[1020px]">
              {!symptomId ? (
                <SymptomEmptyState onClickSelectSymptom={onClickSelectSymptom} />
              ) : (
                <SymptomGuideTab symptomName={symptomName} />
              )}
            </div>
          </div>

          {blockedMessage && <div className="sr-only">{blockedMessage}</div>}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[960px] px-4 py-10 pt-[29px]">
          <div className="flex justify-center">
            <SymptomTabs value={tab} onChange={setTab} />
          </div>

          <div className="mt-[68px] flex justify-center">
            <div className="w-full max-w-[760px]">
              {!symptomId ? (
                <SymptomEmptyState onClickSelectSymptom={onClickSelectSymptom} />
              ) : (
                <LifeGuideTab symptomName={symptomName} />
              )}
            </div>
          </div>

          {blockedMessage && <div className="sr-only">{blockedMessage}</div>}
        </div>
      )}
    </>
  );
};

export default SymptomPage;
