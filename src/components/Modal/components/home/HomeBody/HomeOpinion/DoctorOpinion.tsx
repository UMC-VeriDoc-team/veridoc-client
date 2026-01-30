type DoctorOpinionProps = {
  text: string;
};

export const DoctorOpinion = ({ text }: DoctorOpinionProps) => {
  return (
    <div className="flex shrink-0 flex-col justify-center rounded-[5px] border border-[#2B7FFF] py-[25px] pl-[19px] pr-10">
      {text.split("\n").map((line, index) => (
        <span
          key={index}
          className="font-['Pretendard'] text-[18px] font-semibold leading-[140%] tracking-[-0.025em] text-[#000]"
        >
          {line.replace("\\n", "").trim()}
          <br />
        </span>
      ))}
    </div>
  );
};
