import Icon from "@/components/Icon/Icon";
import useBaseModal from "@/stores/modal/useBaseModal";

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

// 전문의 소견 전체 보기 모달
const HomeDoctorOpinionModal = () => {
  const { closeModal } = useBaseModal();

  return (
    <div className="relative flex h-[90vh] max-h-[900px] w-[92vw] max-w-[700px] flex-col overflow-hidden rounded-xl bg-white px-4 py-10 sm:min-w-[380px]">
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
            <p className="text-sm text-[#000D2F] underline">전문의소견</p>
          </div>

          {/* 제목 */}
          <div className="flex flex-col space-y-2">
            <p className="text-4xl font-extrabold text-gray-950 sm:text-3xl md:text-4xl">
              반복되는 두통과 어깨 결림,
            </p>
            <p className="text-4xl font-extrabold text-gray-950 sm:text-3xl md:text-4xl">
              거북목증후군을 의심해보세요
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <Icon name="doctor" className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
              <p className="text-sm font-medium text-gray-950 sm:text-base">관련 전문의 답변</p>
            </div>

            {/* 공개의료 Q&A / export / 출처 링크 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-1 border border-brand-primary px-2 py-1">
                  <Icon name="medical-info" className="w-4" />
                  <p className="pt-[2px] text-center text-sm font-medium text-brand-primary sm:text-base">
                    공개 의료 Q&A
                  </p>
                </div>
                <div className="flex gap-1 border border-brand-green px-2 py-1">
                  <Icon name="check-fill-green" className="w-4" />
                  <p className="pt-[2px] text-center text-sm font-medium text-brand-green sm:text-base">
                    export
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
            <pre className="whitespace-pre-wrap text-sm font-medium leading-6 text-gray-950 sm:text-base">
              말씀하신 목과 어깨의 뻐근함과 두통은 거북목증후군에서 흔히 나타나는 특징일 수
              있습니다. 거북목증후군은 목이 정상적인 위치보다 앞으로 돌출되면서 척추 그자체와
              해당부분과 이어지는 날개뼈 및 어깨에까지 영향을 끼칠 수 있는 만성적 질환입니다. 장시간
              목을 숙인상태로 컴퓨터를 사용하거나, 스마트폰 시청처럼 고개를 숙인 자세가 지속되면
              근육간의 균형이 깨지고 뭉쳐서, 주변 표피신경의 포착증상으로 진행되게 되면 목 주변 및
              어깨죽지, 날개죽지의 만성적인 통증과 피로를 유발합니다. 시간이 지나면 어깨 결림이나 팔
              저림 같은 디스크에 의한 신경근압박증상으로도 이어질 수 있습니다.
            </pre>

            {/* 경고문 */}
            <div className="flex w-full items-center gap-4 rounded-md border border-brand-orange px-5 py-4 sm:items-center sm:gap-5">
              <Icon name="info" className="h-5 w-5 shrink-0" />
              <div className="flex flex-col">
                <p className="text-sm font-medium text-brand-orange">
                  본 내용은 공개된 의료 상담을 바탕으로 정리된 정보이며, 개인의 상태에 따라 다를 수
                  있습니다.
                </p>
                <p className="text-sm font-medium text-brand-orange">
                  통증이 지속되거나 심해질 경우 의료기관 방문이 필요할 수 있습니다.
                </p>
              </div>
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

export default HomeDoctorOpinionModal;
