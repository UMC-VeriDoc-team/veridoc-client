import Icon from "@/components/Icon/Icon";
import { useNavigate } from "react-router-dom";

interface RecommendEntryProps {
  showTitle?: boolean;
}

const RecommendEntry = ({ showTitle = true }: RecommendEntryProps) => {
  const navigate = useNavigate();

  // 마이페이지로 이동
  const handleGoSymptom = () => {
    navigate("/my");
  };

  return (
    <div className="w-full bg-white">
      {/* 상단 CTA */}
      {showTitle && (
        <section className="mx-auto flex max-w-[960px] flex-col items-center px-6 pt-20 text-center">
          <h1 className="text-2xl font-extrabold text-gray-950 sm:text-3xl">
            나에게 해당되는 정보를 더 알고 싶다면?
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-950 sm:text-xl">
            Veridoc이 믿을 수 있는 건강 콘텐츠를 추천드려요!
          </p>

          <button
            type="button"
            onClick={handleGoSymptom}
            className="mt-8 rounded-[4px] bg-brand-primary px-8 py-3 text-sm font-bold text-white hover:opacity-90 sm:text-xl"
          >
            증상 선택하러 가기
          </button>
        </section>
      )}

      {/* 하단 */}
      <section className="relative mt-16 w-full overflow-hidden">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#2B7FFFB2]" />

        {/* 하단 배경 그래픽 */}
        <Icon
          name="guide-bg"
          className="pointer-events-none absolute bottom-[-90px] left-1/2 w-full -translate-x-1/2"
        />

        {/* 비주얼 컨테이너 */}
        <div className="relative mx-auto flex max-w-[960px] justify-center px-6 pb-16 pt-10">
          {/* 노트북 메인 */}
          <Icon name="laptop" className="w-full max-w-[860px] pb-20 sm:max-w-[920px]" />

          {/* 왼쪽 로고(파랑) */}
          <Icon
            name="logo-symbol-blue"
            className="absolute left-[15%] top-[52%] w-16 -translate-x-1/2 -translate-y-1/2 -rotate-45 sm:w-20 md:w-24"
          />

          {/* 오른쪽 로고(흰색) */}
          <Icon
            name="logo-symbol"
            className="absolute right-[15%] top-[40%] w-16 -translate-y-1/2 translate-x-1/2 rotate-45 rounded-full bg-white p-2 shadow-lg sm:w-20 md:w-24"
          />
        </div>
      </section>
    </div>
  );
};

export default RecommendEntry;
