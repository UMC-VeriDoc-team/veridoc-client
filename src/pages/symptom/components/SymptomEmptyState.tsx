import Button from "@/components/Button/Button";
import symptomNotSelectedImg from "@/assets/images/symptom-none.svg";

interface SymptomEmptyStateProps {
  onClickSelectSymptom: () => void;
}

export const SymptomEmptyState = ({ onClickSelectSymptom }: SymptomEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center py-16">
      <h2 className="text-[36px] font-extrabold text-brand-primary">아직 선택한 증상이 없어요</h2>
      <div className="mt-2 flex w-full max-w-[734px] items-center justify-center px-[10px] py-[10px]">
        <p className="w-full text-center text-[18px] font-semibold leading-[140%] tracking-[-0.025em] text-gray-950">
          증상을 선택하면 해당 증상에 대한 정보와 일반적인 대응 흐름을 확인할 수 있어요
          <br />
          선택한 증상은 언제든 변경할 수 있어요
        </p>
      </div>

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
