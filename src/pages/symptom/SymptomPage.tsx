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
      {/* 모바일 */}
      <div className="flex h-[56px] items-center justify-center bg-white pt-10 md:hidden">
        <h1 className="text-[18px] font-semibold tracking-[-0.025em] text-gray-950">증상</h1>
      </div>

      {/* 데스크탑 */}
      <div className="hidden w-full items-center justify-center bg-white pt-[68px] md:flex">
        <img src={logo} alt="VeriDoc 로고" className="h-[85px] w-[285px]" draggable={false} />
      </div>

      {/* 공통 wrapper: life/guide 모두 여기 안에서 렌더 */}
      <div className="w-full bg-white px-[30px] py-10 md:pt-[29px]">
        {/* 탭 */}
        <div className="flex justify-center">
          <SymptomTabs value={tab} onChange={setTab} />
        </div>

        {/* 콘텐츠 */}
        <div className="mt-6 flex justify-center md:mt-[68px]">
          <div
            className={[
              // 모바일
              "mx-auto w-[354px]",
              // 데스크탑
              "md:mx-0 md:w-full md:max-w-[1020px] md:px-0",
            ].join(" ")}
          >
            {!symptomId ? (
              <SymptomEmptyState onClickSelectSymptom={onClickSelectSymptom} />
            ) : tab === "guide" ? (
              <SymptomGuideTab symptomName={symptomName} />
            ) : (
              <LifeGuideTab symptomName={symptomName} />
            )}
          </div>
        </div>

        {blockedMessage && <div className="sr-only">{blockedMessage}</div>}
      </div>
    </>
  );
};

export default SymptomPage;
