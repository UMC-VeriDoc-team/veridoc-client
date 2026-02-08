import Icon from "@/components/Icon/Icon";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/login/useAuthStore";
import { getLifeStyleGuide } from "@/pages/symptom/services/getLifeStyleGuide";
import type { LifeStyleGuideData } from "@/types/symptom";

export const LifeGuideTab = () => {
  //console.log("🔥 LifeGuideTab 컴포넌트 렌더링됨!");

  const { painAreaID } = useAuthStore();
  //const painAreaID = 2; // [임시 하드코딩]

  const [guideData, setGuideData] = useState<LifeStyleGuideData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log("✅ useEffect 실행됨, painAreaID:", painAreaID);
    const fetchData = async () => {
      // ID가 없거나 '미선택(8)'이면 실행하지 않음
      if (!painAreaID || painAreaID === 8) return;
      setLoading(true);
      try {
        const res = await getLifeStyleGuide(painAreaID);
        //console.log(" 서버에서 온 데이터:", res); // [디버그]
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

  //  4. 유튜브 링크 변환 함수 (watch?v= -> embed/)
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoIdMatch = url.match(/(?:v=|\/)([\w-]{11})(?:\?|&|$)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : "";

    return `https://www.youtube.com/embed/${videoId}`;
  };

  //  5. 로딩 중이거나 데이터가 없을 때 방어 코드
  if (loading) return <div className="py-20 text-center">로딩 중...</div>;
  if (!guideData) return <div className="py-20 text-center">데이터가 없습니다.</div>;

  const mainVideo = guideData.videos[0]; // 첫 번째 영상을 메인으로 사용 -> 나중에 정해진대로 변경

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
      <div className="flex flex-col items-center rounded bg-white md:mt-12">
        {/* 유튜브 영상 */}
        <div className="mt-3 w-full overflow-hidden rounded-[18px] md:max-w-[777px] md:rounded-[30px]">
          <div className="aspect-video w-full md:aspect-auto md:h-[448px]">
            <iframe
              src={getEmbedUrl(mainVideo.youtubeUrl)}
              title={mainVideo.youtubeTitle}
              className="h-full w-full border-0 md:h-[443px] md:w-[789px] md:translate-x-[-4px] md:translate-y-[2px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
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
              새움병원 {/* 채널명은 임시 하드코딩?? api에 없음 */}
            </span>
          </div>

          {/* 출처 */}
          <div className="flex items-center gap-[10px] text-[16px] font-medium leading-[140%] tracking-[-0.025em] text-gray-200">
            {mainVideo?.youtubeUrl && (
              <a
                href={mainVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-[10px] hover:text-brand-primary"
              >
                <span>원문 출처 보기</span>
                <Icon name="link" className="h-5 w-5" />
              </a>
            )}
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

      <div className="mb-28 mt-20 h-[46px] w-full max-w-[778px] rounded-[6px] border border-brand-orange md:mx-auto">
        <div className="flex h-full items-center">
          <div className="flex h-full w-[45px] items-center justify-center">
            <Icon name="info" className="h-[20px] w-[20px] text-brand-orange" />
          </div>

          <div className="flex h-full items-center">
            <p className="font-medium tracking-[-0.025em] text-brand-orange">
              {/* 모바일 */}
              <span className="block whitespace-pre-line text-[13px] leading-[140%] md:hidden">
                해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례{"\n"}입니다. 개인 진단이나
                치료 판단을 대체하지 않습니다.
              </span>

              {/* 데스크탑 */}
              <span className="hidden text-[14px] leading-[140%] md:block">
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
