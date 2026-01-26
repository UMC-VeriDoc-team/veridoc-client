import SymptomCard from "./SymptomCard";
import { SYMPTOMS } from "@/constants/symptoms";

interface SymptomGridProps {
  selectedKey: string | null;
  multiAttemptedKey: string | null;
  onSelect: (key: string) => void;
}

const SymptomGrid = ({ selectedKey, multiAttemptedKey, onSelect }: SymptomGridProps) => {
  return (
    <div
      className={[
        "mx-auto grid w-full grid-cols-3 justify-items-center gap-x-[30px] gap-y-[30px]",
        "md:w-fit md:gap-x-[33px] md:gap-y-[39px]",
      ].join(" ")}
    >
      {SYMPTOMS.map((symptom) => (
        <SymptomCard
          key={symptom.key}
          label={symptom.label}
          iconName={symptom.iconName}
          selected={selectedKey === symptom.key}
          multiAttempted={multiAttemptedKey === symptom.key}
          onClick={() => onSelect(symptom.key)}
        />
      ))}
    </div>
  );
};

export default SymptomGrid;
