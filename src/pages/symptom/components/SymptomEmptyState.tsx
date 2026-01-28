import Button from "@/components/Button/Button";
import symptomNotSelectedImg from "@/assets/images/symptom-none.svg";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";

interface SymptomEmptyStateProps {
  onClickSelectSymptom: () => void;
}

export const SymptomEmptyState = ({ onClickSelectSymptom }: SymptomEmptyStateProps) => {
  return (
    <div className="flex w-full flex-col md:items-center">
      <SectionTitle
        title={
          <>
            {/* 모바일 */}
            <span className="block w-full whitespace-pre-line md:hidden">
              아직 선택한{"\n"}
              증상이 없어요
            </span>

            {/* 데스크탑 */}
            <span className="hidden text-center md:block">아직 선택한 증상이 없어요</span>
          </>
        }
        description={
          <>
            {/* 모바일 */}
            <span className="block w-full whitespace-pre-line md:hidden">
              증상을 선택하면 해당 증상에 대한 정보와 일반적인 대응{"\n"}
              흐름을 확인할 수 있어요 선택한 증상은 언제든 변경할 수 {"\n"}있어요
            </span>

            {/* 데스크탑 */}
            <span className="hidden md:block">
              증상을 선택하면 해당 증상에 대한 정보와 일반적인 대응 흐름을 확인할 수 있어요
              <br />
              선택한 증상은 언제든 변경할 수 있어요
            </span>
          </>
        }
      />

      <img
        src={symptomNotSelectedImg}
        alt="증상 미선택"
        draggable={false}
        className={[
          // 모바일
          "mt-8 min-h-[342px] object-contain",
          // 데스크탑
          "md:mt-[54px] md:h-auto md:w-full md:max-w-[603px]",
        ].join(" ")}
      />

      <div className="mt-10 w-full md:mt-16 md:w-[404px]">
        <Button type="button" onClick={onClickSelectSymptom}>
          증상 선택하기
        </Button>
      </div>
    </div>
  );
};
