import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@/components/Icon/Icon";
import MeasureGuideItem from "@/components/Modal/components/home/components/MeasureGuideItem";
import MeasureSectionHeader from "@/components/Modal/components/home/components/MeasureSectionHeader";
import { MedicalConsultationGuide } from "@/components/Modal/components/home/components/MeasureMedicalConsultationGuide";
import { useTemporaryMeasureModalStore } from "@/stores/modal/useTemporaryMeasureModalStore";
import useIsMobile from "@/hooks/useIsMobile";
import type { TemporaryGuideDetail } from "@/components/Modal/types/temporaryGuide";
import getTemporaryGuideDetail from "@/components/Modal/services/getTemporaryDetail";
import SharePost from "@/components/Button/SharePost";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { useSymptomGuideStore } from "@/stores/symptom/useSymptomGuideStore";
import Hashtag from "@/components/HashTag/HashTag";
import SourceButton from "@/components/Button/SourceButton";
import MedicalDisclaimer from "@/components/Box/MedicalDisclaimer";

const MeasureContent = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { measureId, setMeasureId } = useTemporaryMeasureModalStore();
  const { painAreaID } = useAuthStore();
  const { recordEvent } = useSymptomGuideStore();

  const guideId = useMemo(() => {
    const raw = measureId ?? id;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [id, measureId]);

  const [detail, setDetail] = useState<TemporaryGuideDetail | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!guideId) {
        setDetail(null);
        return;
      }

      try {
        const res = await getTemporaryGuideDetail(guideId);
        setDetail(res.data ?? null);

        // 트리거 해제
        if (painAreaID) {
          await recordEvent(painAreaID, "TREATMENT_INFO_VIEWED");
        }
      } catch (e) {
        console.error("[TemporaryGuideDetail] error:", e);
        setDetail(null);
      }
    };

    run();
  }, [guideId, painAreaID, recordEvent]);

  const handleSelectMorePost = (answerId: number) => {
    setMeasureId(String(answerId));
    if (isMobile) {
      navigate(`/home/measure/${measureId}`);
      return;
    }
  };

  if (!detail) {
    return <div className="flex-1 overflow-y-auto px-1 py-2 sm:px-4 sm:py-4 md:px-7 md:py-6" />;
  }

  const {
    painAreaName,
    title,
    subtitle,
    sourceName,
    sourceUrl,
    duration,
    type,
    imageUrl,
    highlighter,
    content,
    badges,
    notes,
    cautions,
    helps,
    morePosts,
  } = detail;

  return (
    <div className="flex-1 overflow-y-auto px-1 py-2 sm:px-4 sm:py-4 md:px-7 md:py-6">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex gap-4">
          <p className="text-xs text-[#000D2F] underline sm:text-sm">{painAreaName}</p>
          <p className="text-xs text-[#000D2F] underline sm:text-sm">임시대처방안</p>
        </div>

        {/* 제목 */}
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-extrabold text-gray-950 sm:text-3xl md:text-4xl">{title}</p>
          {subtitle ? (
            <p className="text-base font-semibold text-gray-950 md:text-lg">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Icon name="hospital" className="h-12 w-12 rounded-full" />
            <p className="text-sm font-medium text-gray-950 sm:text-base">{sourceName ?? ""}</p>
          </div>

          {/* 평균 소요 시간 / 증상 / 출처 링크 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex w-fit items-center gap-2 border border-brand-primary px-2 py-1">
                <Icon name="repeat" className="w-3 sm:w-4" />
                <p className="pt-[2px] text-center text-sm font-medium text-brand-primary sm:text-base">
                  {duration}
                </p>
              </div>

              <div className="flex w-fit gap-2 border border-brand-primary px-2 py-1">
                <Icon name="clock" className="w-3 sm:w-4" />
                <p className="pt-[2px] text-center text-sm font-medium text-brand-primary sm:text-base">
                  {type}
                </p>
              </div>
            </div>

            <SourceButton url={sourceUrl} className="self-end sm:self-center" />
          </div>
        </div>

        {/* 이미지 */}
        <div className="h-[180px] w-full rounded-[5px] bg-gray-100 sm:h-[220px] md:h-[260px]">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="h-full w-full rounded-[5px] object-cover" />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>

        {/* 본문 / 경고문 */}
        <div className="flex flex-col gap-10 sm:gap-[80px]">
          <div className="flex flex-col">
            {highlighter ? <MeasureSectionHeader iconName="idea" title={highlighter} /> : null}

            {/* 설명 */}
            {content ? <p className="pb-9 text-base font-medium text-gray-950">{content}</p> : null}

            {/* 가이드 */}
            {notes.length > 0 ? (
              <div className="flex flex-col gap-9">
                {notes.map((item) => (
                  <MeasureGuideItem
                    key={item.noteId}
                    id={String(item.noteId)}
                    bold={item.bold}
                    text={item.text}
                    icon={{ src: item.imageUrl, alt: item.bold || "guide" }}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* 진료 권유 */}
          <div className="flex flex-col gap-7">
            <MeasureSectionHeader
              iconName="warning"
              title="이런 증상이 있다면 진료가 필요할 수 있어요"
            />
            {cautions.length > 0 ? (
              <MedicalConsultationGuide
                items={cautions.map((caution) => ({
                  id: String(caution.cautionId),
                  bold: caution.bold,
                  text: caution.text,
                  iconUrl: caution.iconUrl,
                }))}
              />
            ) : null}
          </div>

          {/* 도움 */}
          <div className="flex flex-col gap-2">
            <MeasureSectionHeader iconName="help-chat" title="이런 경우라면 도움이 될 수 있어요" />
            {helps.length > 0 ? (
              <ul className="pl-6">
                {helps.map((help) => (
                  <li key={help.helpId} className="list-disc text-base font-medium text-gray-950">
                    {help.text}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* 경고문 */}
          <MedicalDisclaimer type="measure" className="rounded-md py-4" />
        </div>

        {/* 구분선 */}
        <div className="my-2 w-full border-b border-gray-100" />

        {/* 하단: 공유 / 해시태그 / 포스트 더보기 */}
        <div className="flex flex-col gap-10 sm:gap-16">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            {/* 공유 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="truncate text-base font-medium text-gray-950">Share this</p>
              <SharePost title={detail.title} subtitle={detail.subtitle ?? undefined} />
            </div>

            {/* 해시태그 */}
            <div className="flex gap-2">
              {badges.map((b, idx) => (
                <Hashtag key={idx} content={b} />
              ))}
            </div>
          </div>

          {/* 포스트 더보기 */}
          {morePosts.length > 0 ? (
            <div>
              <p className="text-base font-medium text-gray-950">More Posts</p>

              <div className="mt-3 flex w-full flex-nowrap gap-5 overflow-x-auto pb-2">
                {morePosts.map((post, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="flex w-44 shrink-0 cursor-pointer flex-col gap-2 sm:w-60"
                    onClick={() => handleSelectMorePost(post.guideId)}
                  >
                    <div className="h-32 w-full bg-gray-100">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                    <p className="text-left text-sm font-medium text-gray-950">{post.title}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MeasureContent;
