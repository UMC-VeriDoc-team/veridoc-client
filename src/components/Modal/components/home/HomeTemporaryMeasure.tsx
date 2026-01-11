import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";
import GuideItem from "./components/GuideItem";
import { MOCK_GUIDE_ITEMS } from "@/components/Modal/constants/mockGuideItem";
import { MOCK_MEDICAL_CONSULTATION_GUIDE } from "@/components/Modal/constants/mockMedicalConsultationGuide";
import { MedicalConsultationGuide } from "@/components/Modal/components/home/components/MedicalConsultationGuide";
import SectionHeader from "@/components/Modal/components/home/components/SectionHeader";

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

// 임시 해시태그
const hashtags: HashtagItem[] = [{ content: "집·사무실" }, { content: "하루 1-2회" }];

interface PostItem {
  image: string;
  title: string;
}

// 임시 포스트
const posts: PostItem[] = [
  { image: "null", title: "통증 부위 온찜질/냉찜질" },
  { image: "null", title: "가벼운 일상 동작" },
];

// 임시 대처 방안 모달
const HomeTemporaryMeasure = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[726px] flex-col overflow-hidden rounded-xl bg-white px-4 py-10 sm:min-w-[380px]">
      {/* 모달 닫기 */}
      <button
        type="button"
        onClick={() => closeModal()}
        className="absolute right-4 top-4 z-10"
        aria-label="닫기"
      >
        <Icon name="close" className="h-3 w-3 cursor-pointer" />
      </button>

      {/* 상단: 제목 + 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-1 py-2 sm:px-4 sm:py-4 md:px-7 md:py-6">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex gap-4">
            <p className="text-sm text-[#000D2F] underline">어깨</p>
            <p className="text-sm text-[#000D2F] underline">임시대처방안</p>
          </div>

          {/* 제목 */}
          <div className="flex flex-col space-y-2">
            <p className="text-2xl font-extrabold text-gray-950 sm:text-3xl md:text-4xl">
              허리 스트레칭 방법
            </p>
            <p className="text-md font-semibold text-gray-950 sm:text-base md:text-lg">
              허리 근육 긴장을 풀어주는 가벼운 스트레칭
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <Icon name="hospital" className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
              <p className="text-sm font-medium text-gray-950 sm:text-base">
                서울아산병원 건강정보
              </p>
            </div>

            {/* 평균 소요 시간 / 증상 / 출처 링크 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2 border border-brand-primary px-2 py-1">
                  <Icon name="repeat" className="w-4" />
                  <p className="pt-[2px] text-center text-sm font-medium text-brand-primary sm:text-base">
                    평균 소요 시간 10분
                  </p>
                </div>
                <div className="flex gap-2 border border-brand-primary px-2 py-1">
                  <Icon name="clock" className="w-4" />
                  <p className="pt-[2px] text-center text-sm font-medium text-brand-primary sm:text-base">
                    허리 · 스트레칭
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <p className="text-center text-sm font-medium text-gray-200 sm:text-base">
                  원문 출처 보기
                </p>
                <Icon name="link" className="h-6 w-6 rounded-full bg-gray-200" />
              </button>
            </div>
          </div>

          {/* 이미지 */}
          <div className="h-[180px] w-full rounded-[10px] bg-gray-100 sm:h-[220px] md:h-[260px]"></div>

          {/* 본문 / 경고문 */}
          <div className="flex flex-col gap-10 sm:gap-[80px]">
            <div className="flex flex-col">
              <SectionHeader
                iconName="idea"
                title="무리하지 않는 선에서, 어깨를 부드럽게 풀어주세요"
              />

              {/* 설명 */}
              <p className="pb-9 text-base font-medium text-gray-950">
                어깨 통증은 장시간 같은 자세를 유지하거나 근육이 긴장되면서 발생하는 경우가
                많습니다. 통증이 심하지 않다면 무리하지 않는 범위에서 가벼운 스트레칭은 근육 긴장을
                완화하는 데 도움이 될 수 있습니다.
              </p>

              {/* 가이드 */}
              <div className="flex flex-col gap-9">
                {MOCK_GUIDE_ITEMS.map((item) => (
                  <GuideItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>

            {/* 진료 권유 */}
            <div className="flex flex-col gap-7">
              <SectionHeader
                iconName="warning"
                title="이런 증상이 있다면 진료가 필요할 수 있어요"
              />
              <MedicalConsultationGuide items={MOCK_MEDICAL_CONSULTATION_GUIDE} />
            </div>

            {/* 도움 */}
            <div className="flex flex-col gap-2">
              <SectionHeader iconName="help-chat" title="이런 경우라면 도움이 될 수 있어요" />
              <ul className="pl-6">
                <li className="list-disc text-base font-medium text-gray-950">
                  오래 같은 자세로 앉아 있어 어깨가 뻐근할 때
                </li>
                <li className="list-disc text-base font-medium text-gray-950">
                  긴장으로 어깨와 목 주변이 뻣뻣하게 느껴질 때
                </li>
                <li className="list-disc text-base font-medium text-gray-950">
                  통증은 심하지 않지만 어깨가 무겁고 답답할 때
                </li>
              </ul>
            </div>

            {/* 경고문 */}
            <div className="flex w-full items-center gap-4 rounded-md border border-brand-orange px-5 py-4 sm:items-center sm:gap-5">
              <Icon name="info" className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium text-brand-orange">
                본 콘텐츠는 의료기관에서 제공하는 건강 정보 콘텐츠를 기준으로 베리닥 내부 검토 및
                정제 과정을 거쳐 구성되었습니다. 본 내용은 의료 진단이나 치료를 대체하지 않습니다.
              </p>
            </div>
          </div>

          {/* 구분선 */}
          <div className="my-2 w-full border-b border-gray-100"></div>

          {/* 하단: 공유 / 해시태그 / 포스트 더보기 */}
          <div className="flex flex-col gap-10 sm:gap-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
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

            {/* 포스트 더보기 */}
            <div>
              <p className="text-base font-medium text-gray-950">More Posts</p>

              <div className="mt-3 flex w-full flex-nowrap gap-5 overflow-x-auto pb-2">
                {posts.map((post) => (
                  <div
                    key={post.title}
                    className="flex w-60 shrink-0 cursor-pointer flex-col gap-2"
                  >
                    <div className="h-32 w-full bg-gray-100"></div>
                    <p className="text-sm font-medium text-gray-950">{post.title}</p>
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

export default HomeTemporaryMeasure;
