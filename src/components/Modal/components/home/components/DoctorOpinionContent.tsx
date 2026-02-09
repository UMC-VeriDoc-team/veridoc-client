import Icon from "@/components/Icon/Icon";
import GetDoctorOpinionDetail from "@/pages/home/services/getDoctorOpinionDetail";
import type { OpinionDetail } from "@/pages/home/types/homeDoctorOpinion";
import useDoctorOpinionModalStore from "@/stores/modal/useDoctorOpinionModalStore";
import { useEffect, useState } from "react";

interface ShareItem {
  iconName: string;
}

const shares: ShareItem[] = [
  { iconName: "facebook-fill" },
  { iconName: "kakao-fill" },
  { iconName: "instagram-fill" },
];

const DoctorOpinionContent = () => {
  const { doctorOpinionId, setDoctorOpinionId } = useDoctorOpinionModalStore();

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
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [doctorOpinionId]);

  const handleOpenSource = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
              <div className="flex gap-1 border border-brand-primary px-2 py-1">
                <Icon name="medical-info" className="w-3 sm:w-4" />
                <p className="pt-[2px] text-center text-xs font-medium text-brand-primary sm:text-base">
                  공개 의료 Q&A
                </p>
              </div>
              <div className="flex items-center gap-1 border border-brand-green px-2 py-1">
                <Icon name="check-fill-green" className="w-3 sm:w-4" />
                <p className="pt-[2px] text-center text-xs font-medium text-brand-green sm:text-base">
                  export
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenSource(data.sourceUrl)}
              disabled={!data.sourceUrl}
              className={`flex items-center justify-center gap-2 ${data.sourceUrl ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
            >
              <p className="text-center text-sm font-medium text-gray-200 sm:text-base">
                원문 출처 보기
              </p>
              <Icon name="link" className="h-5 w-5 rounded-full bg-gray-200 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* 이미지: 추가 예정 */}
        <div className="h-[180px] w-full rounded-[10px] bg-gray-100 sm:h-[220px] md:h-[260px]"></div>

        {/* 본문 / 경고문 */}
        <div className="flex flex-col gap-10 sm:gap-[80px]">
          <pre className="whitespace-pre-wrap text-sm font-medium leading-6 text-gray-950 sm:text-base">
            {data.content}
          </pre>

          {/* 경고문 */}
          <div className="flex w-full items-center gap-4 rounded-md border border-brand-orange px-5 py-4 sm:items-center sm:gap-5">
            <Icon name="info" className="h-5 w-5 shrink-0" />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-brand-orange">
                본 내용은 공개된 의료 상담을 바탕으로 정리된 정보이며, 개인의 상태에 따라 다를 수
                있습니다. 통증이 지속되거나 심해질 경우 의료기관 방문이 필요할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-2 w-full border-b border-gray-100"></div>

        {/* 하단: 공유 / 해시태그 / 포스트 더보기 */}
        <div className="flex flex-col gap-10 sm:gap-16">
          <div className="flex items-center justify-between gap-6">
            {/* 공유 */}
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="truncate text-sm font-medium text-gray-950 sm:text-base">Share this</p>
              <div className="flex gap-2">
                {shares.map((item) => (
                  <button key={item.iconName} type="button">
                    <Icon name={item.iconName} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                ))}
              </div>
            </div>

            {/* 해시태그: 증상명 */}
            <div className="flex gap-2">
              <div className="rounded-full border border-brand-primary px-2 pt-[2px] text-center text-xs font-medium text-brand-primary sm:text-sm">
                {data.symptomName}
              </div>
            </div>
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
                  <div className="h-32 w-full bg-gray-100"></div>
                  <p className="text-left text-sm font-medium text-gray-950">{post.title}</p>
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
