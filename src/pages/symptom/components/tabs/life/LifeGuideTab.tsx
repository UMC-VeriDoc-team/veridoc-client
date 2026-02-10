import Icon from "@/components/Icon/Icon";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { getLifeStyleGuide } from "@/pages/symptom/services/getLifeStyleGuide";
import type { LifeStyleGuideData } from "@/pages/symptom/types/symptom";
import SourceButton from "@/components/Button/SourceButton";

export const LifeGuideTab = () => {
  const { painAreaID } = useAuthStore();

  const [guideData, setGuideData] = useState<LifeStyleGuideData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!painAreaID || painAreaID === 8) return;
      setLoading(true);
      try {
        const res = await getLifeStyleGuide(painAreaID);
        if (res && res.data) {
          setGuideData(res.data);
        }
      } catch (error) {
        console.error("가이드 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [painAreaID]);

  // 유튜브 링크 변환 함수 개선
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // 11자리의 유튜브 비디오 ID를 찾는 정규식
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    const videoId = match && match[7].length === 11 ? match[7] : null;

    // 만약 ID를 찾지 못했다면 빈 문자열이나 기본 에러 화면을 반환
    if (!videoId) {
      return "";
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  // 로딩 중이거나 데이터가 없을 때 방어 코드
  if (loading) return <div className="py-20 text-center">로딩 중...</div>;
  if (!guideData) return <div className="py-20 text-center">데이터가 없습니다.</div>;

  const mainVideo = guideData.videos[0];

  return (
    <section>
      <SectionTitle
        title={guideData.title}
        description={
          <>
            {/* 모바일 */}
            <span className="block whitespace-pre-line md:hidden">{guideData.subtitle}</span>

            {/* 데스크탑 */}
            <span className="hidden md:block">{guideData.subtitle}</span>
          </>
        }
      />

      {/* 콘텐츠 카드 */}
      <div className="flex w-full flex-col items-center rounded bg-white md:mt-12">
        {/* 유튜브 영상 */}
        <div className="mt-3 w-full overflow-hidden rounded-[18px] md:max-w-[777px] md:rounded-[30px]">
          {/* 유튜브 영상 영역 수정 예시 */}
          <div className="aspect-video w-full md:aspect-auto md:h-[448px]">
            {getEmbedUrl(mainVideo.youtubeUrl) ? (
              <iframe
                src={getEmbedUrl(mainVideo.youtubeUrl)}
                title={mainVideo.youtubeTitle}
                className="h-full w-full border-0 md:h-[443px] md:w-[789px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                유효하지 않은 영상 주소입니다.
              </div>
            )}
          </div>
        </div>

        {/* 영상 제목 */}
        <div className="mt-[30px] w-full max-w-[777px] text-left text-[28px] font-bold leading-[100%] tracking-[-0.025em] text-gray-950">
          <>
            {/* 모바일 */}
            <span className="block whitespace-pre-line md:hidden">{mainVideo.youtubeTitle}</span>

            {/* 데스크탑 */}
            <span className="hidden md:block">{mainVideo.youtubeTitle}</span>
          </>
        </div>

        <div className="mt-[30px] flex w-full max-w-[777px] items-center justify-between">
          {/* 채널명 */}
          <div className="flex items-center gap-3">
            <Icon name="doctor" className="h-10 w-10 rounded-full" />
            <span className="text-sm font-medium leading-[16px] tracking-[-0.025em] text-brand-primary">
              {mainVideo.source.name}
            </span>
          </div>

          {/* 출처 */}
          <div className="flex items-center gap-[10px] text-[16px] font-medium leading-[140%] tracking-[-0.025em] text-gray-200">
            {mainVideo?.youtubeUrl && <SourceButton url={mainVideo.youtubeUrl} />}
          </div>
        </div>

        <div className="mb:mb-[10px] mt-[15px] h-[1px] w-full max-w-[777px] bg-[#1B1B1B]/[0.04]" />

        <div className="mt-[30px] h-[84px] w-full max-w-[777px] rounded-[6px] border border-brand-primary bg-white px-2 md:px-6">
          <div className="flex h-full items-center gap-3 md:gap-4">
            <div className="flex h-[30px] w-[30px] items-center justify-center">
              <Icon name="channel-home" className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]" />
            </div>

            <div className="flex flex-col justify-center">
              {/* 제목 */}
              <p className="font-semibold tracking-[-0.025em] text-brand-primary">
                {/* 모바일 */}
                <span className="block whitespace-pre-line text-[16px] leading-[140%] md:hidden">
                  대한민국 면허를 소지한 보건 전문가의 채널
                </span>

                {/* 데스크탑 */}
                <span className="hidden text-lg leading-[140%] md:block">
                  대한민국 면허를 소지한 보건 전문가의 채널
                </span>
              </p>

              {/* 설명 */}
              <p className="font-medium tracking-[-0.025em] text-brand-primary">
                {/* 모바일 */}
                <span className="block whitespace-pre-line text-[13px] leading-[140%] md:hidden">
                  전문가들이 보건 정보 출처를 어떻게{"\n"}
                  정의하는지 알아보세요
                </span>

                {/* 데스크탑 */}
                <span className="hidden text-sm leading-[140%] md:block">
                  전문가들이 보건 정보 출처를 어떻게 정의하는지 알아보세요
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-[777px]">
          <p className="text-lg font-semibold leading-[21px] tracking-[-0.025em] text-gray-950">
            About Course
          </p>

          <div className="mt-5 text-base font-medium leading-[160%] text-gray-600">
            <p className="whitespace-pre-line">{mainVideo?.description}</p>
          </div>
        </div>
      </div>

      <div className="mb-28 mt-20 w-full max-w-[778px] rounded-[6px] border border-brand-orange px-2 py-2 md:mx-auto">
        <div className="flex h-full items-center gap-x-3">
          <div className="flex h-full w-[45px] items-center justify-center">
            <Icon name="info" className="h-[20px] w-[20px] text-brand-orange" />
          </div>

          <div className="flex h-full items-center">
            <p className="font-medium tracking-[-0.025em] text-brand-orange">
              <span className="text-[13px] leading-[140%] sm:text-sm">
                해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료
                판단을 대체하지 않습니다.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
