import Icon from "@/components/Icon/Icon";
import GetDoctorOpinionDetail from "@/pages/home/services/getDoctorOpinionDetail";
import type { OpinionDetail } from "@/pages/home/types/homeDoctorOpinion";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import { useEffect, useState } from "react";
import SharePost from "@/components/Button/SharePost";
import { useAuthStore } from "@/stores/user/useAuthStore";
import { useSymptomGuideStore } from "@/stores/symptom/useSymptomGuideStore";
import Hashtag from "@/components/HashTag/HashTag";
import SourceButton from "@/components/Button/SourceButton";
import MedicalDisclaimer from "@/components/Box/MedicalDisclaimer";
import ExpertBadge from "@/components/Box/ExpertBadge";
import MedicalInfoBadge from "@/components/Box/MedicalInfoBadge";

const DoctorOpinionContent = () => {
  const { doctorOpinionId, setDoctorOpinionId } = useDoctorOpinionModalStore();

  const { painAreaID } = useAuthStore();
  const { recordEvent } = useSymptomGuideStore();

  const [data, setData] = useState<OpinionDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // 다른 포스터로 이동
  const handleGoToAnotherPost = (answerId: number) => {
    setDoctorOpinionId(answerId);
  };

  useEffect(() => {
    if (!doctorOpinionId) return;

    const run = async () => {
      try {
        setLoading(true);
        const detail = await GetDoctorOpinionDetail({ answerId: doctorOpinionId });
        setData(detail);

        // 트리거 해제
        if (painAreaID) {
          await recordEvent(painAreaID, "DOCTOR_OPINION_VIEWED");
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [doctorOpinionId, painAreaID, recordEvent]);

  if (!doctorOpinionId) return null;

  if (loading) return <div>불러오는 중...</div>;
  if (!data) return <div>전문의 답변을 불러올 수 없어요.</div>;

  return (
    <div className="flex-1 overflow-y-auto px-1 py-2 sm:px-4 sm:py-4 md:px-7 md:py-6">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex gap-4">
          <p className="text-xs text-[#000D2F] underline sm:text-sm">{data.painAreaName}</p>
          <p className="text-xs text-[#000D2F] underline sm:text-sm">전문의소견</p>
        </div>

        {/* 제목 */}
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-extrabold leading-[-2.5%] text-gray-950 sm:text-4xl md:text-4xl">
            {data.title}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Icon name="doctor" className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
            <p className="text-sm font-medium text-gray-950 sm:text-base">관련 전문의 답변</p>
          </div>

          {/* 공개의료 Q&A / export / 출처 링크 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <MedicalInfoBadge />
              <ExpertBadge />
            </div>

            <SourceButton url={data.sourceUrl} />
          </div>
        </div>

        {/* 이미지 */}
        <div className="h-[180px] w-full rounded-[5px] bg-gray-100 sm:h-[220px] md:h-[260px]">
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.title}
              className="h-full w-full rounded-[5px] object-cover"
            />
          ) : (
            <div className="h-full w-full" />
          )}
        </div>

        {/* 본문 / 경고문 */}
        <div className="flex flex-col gap-10 sm:gap-[80px]">
          <pre className="whitespace-pre-wrap font-kr text-sm font-medium leading-6 text-gray-950 sm:text-base">
            {data.content}
          </pre>

          {/* 경고문 */}
          <MedicalDisclaimer type="default" className="rounded-md py-4" />
        </div>

        {/* 구분선 */}
        <div className="my-2 w-full border-b border-gray-100"></div>

        {/* 하단: 공유 / 해시태그 / 포스트 더보기 */}
        <div className="flex flex-col gap-10 sm:gap-16">
          <div className="flex items-center justify-between gap-6">
            {/* 공유 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="truncate text-base font-medium text-gray-950">Share this</p>
              <SharePost title={data.title} />
            </div>

            {/* 해시태그: 증상명 */}
            <Hashtag content={data.symptomName} />
          </div>

          {/* 포스트 더보기 */}
          <div>
            <p className="text-base font-medium text-gray-950">More Posts</p>

            <div className="mt-3 flex w-full flex-nowrap gap-5 overflow-x-auto pb-2">
              {data.morePosts.map((post, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoToAnotherPost(post.answerId)}
                  className="flex w-44 shrink-0 cursor-pointer flex-col gap-2 sm:w-60"
                >
                  <div className="h-32 w-full overflow-hidden rounded-[10px] bg-gray-100 sm:h-40">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-xs text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  <p className="line-clamp-2 text-left text-sm font-medium text-gray-950 sm:text-base">
                    {post.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOpinionContent;
