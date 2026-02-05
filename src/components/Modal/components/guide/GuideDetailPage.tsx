import GuideDetailContent from "./components/GuideDetailContent";

// 모바일: 모달 대신 전체 페이지로 범용 가이드 상세 렌더링
const GuideDetailPage = () => {
  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* 본문 */}
      <div className="min-h-0 flex-1">
        <GuideDetailContent />
      </div>
    </div>
  );
};

export default GuideDetailPage;
