type DoctorOpinionProps = {
  text: string;
};

export const DoctorOpinion = ({ text }: DoctorOpinionProps) => {
  return (
    <div className="flex shrink-0 flex-col justify-center rounded-[5px] border border-brand-primary p-6">
      {text.split("\n").map((line, index) => (
        <span
          key={index}
          className="font-['Pretendard'] text-[18px] font-medium leading-[140%] tracking-[-0.025em] text-[#000] md:text-lg md:font-semibold md:leading-[140%] md:tracking-[-0.025em] md:text-black"
        >
          {line.replace("\\n", "").trim()}
          <br />
        </span>
      ))}
    </div>
  );
};
