import Icon from "@/components/Icon/Icon";

// 진료 권유 가이드 아이템 타입
export interface ConsultationGuideItem {
  id: string;
  title: string;
  description: string;
  iconUrl?: string | null;
}

// 진료 권유 가이드 컴포넌트 props
export type MedicalConsultationGuideProps = {
  items: ConsultationGuideItem[];
};

// 진료 권유 가이드 컴포넌트
export const MedicalConsultationGuide = ({ items }: MedicalConsultationGuideProps) => {
  return (
    <div className="w-full">
      <ul className="space-y-10">
        {items.map((item, index) => {
          // 마지막 항목 여부
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.id}
              className="relative flex h-[100px] items-start gap-4 sm:h-16 sm:gap-7"
            >
              {/* 왼쪽 아이콘 + 세로 라인 */}
              <div className="relative w-14 flex-shrink-0 sm:w-16">
                {/* 아이콘 원 */}
                <div className="z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7FFF1A] sm:h-16 sm:w-16">
                  {item.iconUrl ? (
                    <img src={item.iconUrl} alt={item.title || "icon"} className="h-5 w-5" />
                  ) : (
                    // fallback: 기존처럼 아이콘이 없으면 기본 아이콘 하나
                    <Icon name="health" className="h-5 w-5" />
                  )}
                </div>

                {!isLast && (
                  <div className="absolute bottom-[-40px] left-1/2 top-14 h-[85px] w-1 -translate-x-1/2 bg-brand-primary sm:top-16 sm:h-[41px]" />
                )}
              </div>

              {/* 텍스트 영역 */}
              <div className="min-w-0 sm:self-center">
                <h3 className="text-base font-medium text-gray-950">{item.title}</h3>
                <p className="text-sm font-medium text-[#ABB7C2]">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
