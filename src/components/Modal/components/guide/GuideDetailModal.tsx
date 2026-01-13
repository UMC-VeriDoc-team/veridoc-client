import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import { GUIDE_DETAIL_CONTENTS } from "../../constants/guideDetailContents";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";

interface ShareItem {
  iconName: string;
}

const shares: ShareItem[] = [
  { iconName: "facebook-fill" },
  { iconName: "kakao-fill" },
  { iconName: "instagram-fill" },
];

interface HashtagItem {
  content: string;
}

// 해시태그
const hashtags: HashtagItem[] = [{ content: "범용가이드" }];

// 범용 가이드 상세 모달
const GuideDetailModal = () => {
  const { closeModal } = useBaseModal();
  const { guideType, resetGuideType } = useGuideDetailModalStore();

  const content = GUIDE_DETAIL_CONTENTS[guideType];

  // 모달 닫기 핸들러
  const handleClose = () => {
    closeModal();
    resetGuideType();
  };

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[726px] flex-col overflow-hidden rounded-xl bg-white">
      {/* 모달 닫기 */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 z-20"
        aria-label="닫기"
      >
        <Icon name="close-white" className="h-4 w-4 cursor-pointer fill-white" />
      </button>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 헤더 이미지 */}
        <div className="relative">
          <img
            src={content.header.imageSrc}
            alt={content.header.title}
            className="h-[280px] w-full object-cover sm:h-[340px]"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-6 left-10 right-10">
            <p className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              {content.header.title}
            </p>
            <p className="mt-1 text-sm font-medium text-white sm:text-base">
              {content.header.subtitle}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Icon name="hospital-white" className="h-12 w-12 text-white" />
              <p className="text-base font-medium text-white">{content.source.name}</p>

              <button type="button" className="ml-auto flex items-center gap-2">
                <p className="text-base font-medium text-white">원문 출처 보기</p>
                <Icon name="link" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="px-4 py-8 sm:px-7 md:px-9">
          <div className="flex flex-col gap-y-20">
            {/* 문단 */}
            <div className="flex flex-col gap-y-12">
              <p className="text-sm font-medium leading-7 text-gray-950 sm:text-base">
                {content.paragraphs}
              </p>

              {/* 번호 리스트 */}
              {(() => {
                // steps가 없으면 렌더링하지 않음
                if (!content.steps || content.steps.length === 0) return null;

                const steps = content.steps;

                return (
                  <div className="w-full">
                    <ul className="space-y-10">
                      {steps.map((step, index) => {
                        // 마지막 항목 여부
                        const isLast = index === steps.length - 1;

                        // 번호 아이콘 이름
                        const numIconName = `step-${index + 1}`;

                        return (
                          <li key={`${step.title}-${index}`} className="relative flex gap-7">
                            {/* 왼쪽 번호 아이콘 + 세로 라인 */}
                            <div className="relative flex w-16 justify-center">
                              {/* 번호 아이콘 원 */}
                              <div className="flex items-center justify-center rounded-full bg-[#2B7FFF1A] p-1">
                                <Icon name={numIconName} className="h-10 w-10" />
                              </div>

                              {/* 세로 라인 */}
                              {!isLast && (
                                <div className="absolute left-1/2 top-12 h-[40px] w-1 -translate-x-1/2 bg-brand-primary" />
                              )}
                            </div>

                            {/* 텍스트 영역 */}
                            <div className="min-w-0">
                              <p className="text-base font-medium text-gray-950">{step.title}</p>
                              <p className="text-sm font-medium text-[#ABB7C2]">
                                {step.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-col gap-10">
              {/* 경고문 */}
              <div className="flex w-full items-center gap-4 rounded-md border border-brand-orange px-5 py-[10px] sm:items-center sm:gap-5">
                <Icon name="info" className="h-5 w-5" />
                <p className="text-sm font-medium text-brand-orange">
                  본 내용은 일반적인 건강 정보 안내이며, 개인의 상태에 따라 다르게 느껴질 수
                  있습니다.
                </p>
              </div>

              {/* 구분선 */}
              <div className="w-full border-b border-gray-100"></div>

              <div className="flex flex-col gap-6 pb-16 sm:flex-row sm:items-center sm:justify-between">
                {/* 공유 */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <p className="text-base font-medium text-gray-950">Share this</p>
                  <div className="flex gap-2">
                    {shares.map((item) => (
                      <button key={item.iconName} type="button">
                        <Icon name={item.iconName} className="h-6 w-6" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 해시태그 */}
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((hashtag) => (
                    <div
                      key={hashtag.content}
                      className="rounded-full border border-brand-primary px-2 pt-[2px] text-center text-sm font-medium text-brand-primary"
                    >
                      {hashtag.content}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetailModal;
