type DoctorOpinionProps = {
  text: string;
};

const DoctorOpinion = ({ text }: DoctorOpinionProps) => {
  return (
    <div className="flex flex-col justify-center rounded-[5px] border border-brand-primary p-6">
      {text.split("\n").map((line, index) => (
        <span
          key={index}
          className="text-base font-medium leading-[140%] tracking-[-0.025em] text-black sm:text-lg"
        >
          {line.replace("\\n", "").trim()}
          <br />
        </span>
      ))}
    </div>
  );
};

export default DoctorOpinion;
