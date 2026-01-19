import Icon from "@/components/Icon/Icon";
import SectionTitle from "../components/common/SectionTitle";

interface LifeGuideTabProps {
  symptomName: string;
}

export const LifeGuideTab = ({ symptomName }: LifeGuideTabProps) => {
  return (
    <section>
      <SectionTitle
        title={`${symptomName} 스트레칭`}
        description={<>아래 영상은 {symptomName} 불편 시 가볍게 참고할 수 있는 스트레칭 예시예요</>}
      />

      {/* 콘텐츠 카드 */}
      <div className="mt-12 flex flex-col items-center rounded bg-white">
        {/* 유튜브 영상 */}
        <div className="mt-3 h-[448px] w-full max-w-[777px] overflow-hidden rounded-[30px]">
          <iframe
            src="https://www.youtube.com/embed/I81IixZqFKY?si=MsrboBCmq9PPbOMO"
            title="stretching"
            className="h-[443px] w-[789px] translate-x-[-4px] translate-y-[2px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* 영상 제목 */}
        <div className="mt-[30px] w-full max-w-[777px] text-left text-[28px] font-bold leading-[100%] tracking-[-0.025em] text-gray-950">
          어깨가 뻐근할 때 따라 해볼 수 있는 스트레칭 영상
        </div>

        <div className="mt-[30px] flex w-full max-w-[777px] items-center justify-between">
          {/* 채널명 */}
          <div className="flex items-center gap-3">
            <Icon name="doctor" className="h-10 w-10 rounded-full" />
            <span className="text-[14px] font-medium leading-[16px] tracking-[-0.025em] text-brand-primary">
              새움병원
            </span>
          </div>

          {/* 출처 */}
          <div className="flex items-center gap-[10px] text-[16px] font-medium leading-[140%] tracking-[-0.025em] text-gray-200">
            <span>원문 출처 보기</span>
            <Icon name="link" className="h-5 w-5" />
          </div>
        </div>

        <div className="mb-[10px] mt-[15px] h-[1px] w-full max-w-[777px] bg-[#1B1B1B]/[0.04]" />

        <div className="mt-[30px] h-[84px] w-full max-w-[777px] rounded-[6px] border border-brand-primary bg-white px-6">
          <div className="flex h-full items-center gap-4">
            <div className="flex h-[30px] w-[30px] items-center justify-center">
              <Icon name="channel-home" className="h-[24px] w-[24px]" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[18px] font-semibold leading-[140%] tracking-[-0.025em] text-brand-primary">
                출처 대한민국의 면허를 소지한 보건 전문가의 채널
              </p>
              <p className="text-[14px] font-medium leading-[140%] tracking-[-0.025em] text-brand-primary">
                전문가들이 보건 정보 출처를 어떻게 정의하는지 알아보세요
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-[777px]">
          <p className="text-[18px] font-semibold leading-[21px] tracking-[-0.025em] text-gray-950">
            About Course
          </p>

          <div className="mt-5 text-[16px] font-medium leading-[160%] text-gray-600">
            <p>
              이 스트레칭은 근육의 길이와 탄성을 회복시키고, 관절 주변의 움직임을 부드럽게 만들어
              목과 어깨에 걸리는 부담을 줄이는 데 도움이 될 수 있습니다. 특히 오랜 시간 고정된
              자세로 일하거나 스마트기기를 자주 사용하는 사람에게는, 근육에 쌓인 미세한 긴장을 풀고
              재발성 통증을 예방하는 데 의미가 있습니다.
            </p>
            <p>
              다만 이 스트레칭은 염증이나 신경 손상, 디스크 질환을 직접 치료하는 것은 아니며, 통증이
              심하거나 팔 저림, 감각 이상이 동반 된다면 전문적인 진료가 필요합니다. 정상적인 근육
              긴장과 자세 문제로 인한 목·어깨 불편감이라면, 이 루틴은 일상 속에서 통증을 관리하고
              몸의 균형을 되찾는 데 유용한 보조 수단이 될 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-28 mt-20 h-[46px] w-full max-w-[778px] rounded-[6px] border border-brand-orange">
        <div className="flex h-full items-center">
          <div className="flex h-full w-[45px] items-center justify-center">
            <Icon name="info" className="h-[20px] w-[20px] text-brand-orange" />
          </div>

          <div className="flex h-full items-center">
            <p className="text-[14px] font-medium leading-[140%] tracking-[-0.025em] text-brand-orange">
              해당 내용은 증상 이해를 돕기 위한 전문의 공개 설명 사례입니다. 개인 진단이나 치료
              판단을 대체하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
