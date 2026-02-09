import Icon from "@/components/Icon/Icon";
import { GUIDE_DETAIL_CONTENTS } from "@/constants/guideDetailContents";
import useGuideDetailModalStore from "@/stores/modal/useGuideDetailModal";
import SharePost from "../../home/components/SharePost";

interface HashtagItem {
  content: string;
}

// 해시태그
const hashtags: HashtagItem[] = [{ content: "범용가이드" }];

const GuideDetailContent = () => {
  const { guideType } = useGuideDetailModalStore();
  const content = GUIDE_DETAIL_CONTENTS[guideType];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 헤더 이미지 */}
      <div className="relative">
        <img
          src={content.header.imageSrc}
          alt={content.header.title}
          className="h-[280px] w-full object-cover sm:h-[340px]"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
          <p className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            {content.header.title}
          </p>
          <p className="mt-1 text-sm font-medium text-white sm:text-base">
            {content.header.subtitle}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <Icon name="hospital-white" className="h-10 w-10 text-white sm:h-12 sm:w-12" />
            <p className="text-sm font-medium text-white sm:text-base">{content.source.name}</p>

            <button type="button" className="ml-auto flex items-center gap-2">
              <p className="text-sm font-medium text-white sm:text-base">원문 출처 보기</p>
              <Icon name="link" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="px-6 py-8 sm:px-7 md:px-9">
        <div className="flex flex-col gap-y-20">
          {/* 문단 */}
          <div className="flex flex-col gap-y-12">
            <p className="text-sm font-medium leading-7 text-gray-950 sm:text-base">
              {content.paragraphs}
            </p>

            {/* 번호 리스트 */}
            {(() => {
              if (!content.steps || content.steps.length === 0) return null;

              const steps = content.steps;

              return (
                <div className="w-full">
                  <ul className="space-y-10">
                    {steps.map((step, index) => {
                      const isLast = index === steps.length - 1;
                      const numIconName = `step-${index + 1}`;

                      return (
                        <li
                          key={`${step.title}-${index}`}
                          className="relative flex h-[100px] items-start gap-4 sm:h-16 sm:items-center sm:gap-7"
                        >
                          <div className="relative w-14 flex-shrink-0 sm:w-16">
                            {/* 아이콘 */}
                            <div className="z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7FFF1A] sm:h-16 sm:w-16">
                              <Icon name={numIconName} className="h-12 w-12" />
                            </div>

                            {!isLast && (
                              <div className="absolute bottom-[-40px] left-1/2 top-14 h-[85px] w-1 -translate-x-1/2 bg-brand-primary sm:top-16 sm:h-[41px]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="break-keep text-base font-medium text-gray-950">
                              {step.title}
                            </p>
                            <p className="mt-1 break-keep text-sm font-medium text-[#ABB7C2]">
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
                본 내용은 일반적인 건강 정보 안내이며, 개인의 상태에 따라 다르게 느껴질 수 있습니다.
              </p>
            </div>

            {/* 구분선 */}
            <div className="w-full border-b border-gray-100"></div>

            <div className="flex items-center justify-between gap-6 sm:pb-16">
              {/* 공유 */}
              <div className="flex gap-3 sm:items-center sm:gap-4">
                <p className="text-base font-medium text-gray-950">Share this</p>
                <SharePost title={content.header.title} subtitle={content.header.subtitle} />
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
  );
};

export default GuideDetailContent;
