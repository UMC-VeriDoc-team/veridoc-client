import Icon from "@/components/Icon/Icon";

// 진료 권유 가이드 아이템 타입
export interface ConsultationGuideItem {
  id: string;
  title: string;
  description: string;
}

// 진료 권유 가이드 컴포넌트 props
export type MedicalConsultationGuideProps = {
  items: ConsultationGuideItem[];
};

// 아이콘 매핑 정보
const iconMaps: {
  id: number;
  iconName: "calendar" | "health" | "sleep";
}[] = [
  { id: 0, iconName: "calendar" },
  { id: 1, iconName: "health" },
  { id: 2, iconName: "sleep" },
];

// 진료 권유 가이드 컴포넌트
export const MedicalConsultationGuide = ({ items }: MedicalConsultationGuideProps) => {
  return (
    <div className="w-full">
      <ul className="space-y-10">
        {items.map((item, index) => {
          // 마지막 항목 여부
          const isLast = index === items.length - 1;

          // 현재 아이템에 대응되는 아이콘 정보
          const icon = iconMaps[index];

          return (
            <li key={item.id} className="relative flex gap-7">
              {/* 왼쪽 아이콘 + 세로 라인 */}
              <div className="relative flex w-16 justify-center">
                {/* 아이콘 원 */}
                <div
                  className={`flex items-center justify-center rounded-full bg-brand-primarySoft p-3`}
                >
                  {icon && <Icon name={icon.iconName} className="h-5 w-5" />}
                </div>

                {!isLast && (
                  <div
                    className={`absolute left-1/2 top-11 h-[40px] w-1 -translate-x-1/2 bg-brand-primary`}
                  />
                )}
              </div>

              {/* 텍스트 영역 */}
              <div className="min-w-0">
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
