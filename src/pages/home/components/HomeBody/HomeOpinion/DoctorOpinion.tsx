type DoctorOpinionProps = {
  text: string;
};

export const DoctorOpinion = ({ text }: DoctorOpinionProps) => {
  return (
    <div className="flex shrink-0 flex-col justify-center rounded-[5px] border border-brand-primary p-6">
      {text.split("\n").map((line, index) => (
        <span
          key={index}
          className="text-lg font-semibold leading-[140%] tracking-[-0.025em] text-black"
        >
          {line.replace("\\n", "").trim()}
          <br />
        </span>
      ))}
    </div>
  );
};
