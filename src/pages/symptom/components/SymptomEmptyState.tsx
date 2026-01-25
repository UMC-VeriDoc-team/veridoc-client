import Button from "@/components/Button/Button";
import symptomNotSelectedImg from "@/assets/images/symptom-none.svg";
import SectionTitle from "@/pages/symptom/components/common/SectionTitle";

interface SymptomEmptyStateProps {
  onClickSelectSymptom: () => void;
}

export const SymptomEmptyState = ({ onClickSelectSymptom }: SymptomEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center">
      <SectionTitle
        title="아직 선택한 증상이 없어요"
        description={
          <>
            증상을 선택하면 해당 증상에 대한 정보와 일반적인 대응 흐름을 확인할 수 있어요
            <br />
            선택한 증상은 언제든 변경할 수 있어요
          </>
        }
      />

      <img
        src={symptomNotSelectedImg}
        alt="증상 미선택"
        className="mt-[54px] h-auto w-full max-w-[603px]"
        draggable={false}
      />

      <div className="mt-16 w-[404px]">
        <Button type="button" onClick={onClickSelectSymptom}>
          증상 선택하기
        </Button>
      </div>
    </div>
  );
};
