import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "/images/logo.svg";
import { SymptomTabs } from "@/pages/symptom/components/SymptomTabs";
import { SymptomEmptyState } from "@/pages/symptom/components/SymptomEmptyState";
import { LifeGuideTab } from "@/pages/symptom/tabs/life-guide/LifeGuideTab";
import SymptomGuideTab from "@/pages/symptom/tabs/symptom-guide/SymptomGuideTab";
import { useAuthStore } from "@/stores/login/useAuthStore";

type TabKey = "life" | "guide";

const SymptomPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { painAreaID } = useAuthStore();

  const tab = (searchParams.get("tab") as TabKey) ?? "life";

  const symptomName = useMemo(() => {
    if (!painAreaID) return "";
    const map: Record<string, string> = {
      "1": "어깨",
      "2": "허리",
      "3": "무릎",
      "4": "목",
      "5": "두통",
      "6": "복통",
    };
    return map[painAreaID] ?? "어깨";
  }, [painAreaID]);

  const setTab = (next: TabKey) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("tab", next);
      return nextParams;
    });
  };

  const [blockedMessage] = useState<string | null>(null);

  const onClickSelectSymptom = () => {
    navigate("/my?tab=symptom");
  };

  return (
    <>
      {/* 모바일 */}
      <div className="flex h-[56px] items-center justify-center bg-white pt-10 md:hidden">
        <h1 className="text-[18px] font-semibold tracking-[-0.025em] text-gray-950">증상</h1>
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:mb-8 md:mt-10 md:flex md:items-center md:justify-center">
        <div className="h-[85px]">
          <img src={logo} alt="VeriDoc Logo" className="h-full w-auto" />
        </div>
      </div>

      {/* 공통 wrapper: life/guide 모두 여기 안에서 렌더 */}
      <div className="flex w-full flex-col items-center bg-white px-[30px] pb-10">
        {/* 탭 */}
        <div className="mb-8 mt-[24px] flex w-full justify-center px-[30px] md:mt-0 md:w-[777px] md:px-0">
          <SymptomTabs value={tab} onChange={setTab} />
        </div>

        {/* 콘텐츠 */}
        <div className="mt-6 flex justify-center md:mt-[60px]">
          <div
            className={[
              // 모바일
              "mx-auto w-[354px]",
              // 데스크탑
              "md:mx-0 md:w-full md:max-w-[1020px] md:px-0",
            ].join(" ")}
          >
            {!painAreaID ? (
              <SymptomEmptyState onClickSelectSymptom={onClickSelectSymptom} />
            ) : tab === "guide" ? (
              <SymptomGuideTab symptomName={symptomName} />
            ) : (
              <LifeGuideTab />
            )}
          </div>
        </div>

        {blockedMessage && <div className="sr-only">{blockedMessage}</div>}
      </div>
    </>
  );
};

export default SymptomPage;
