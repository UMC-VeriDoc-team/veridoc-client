interface SectionTitleProps {
  title: string;
  description: React.ReactNode; // <br/> 포함 가능하게
  className?: string;
}

const SectionTitle = ({ title, description, className = "" }: SectionTitleProps) => {
  return (
    <div className={className}>
      <h2 className="text-center text-[36px] font-extrabold text-brand-primary">{title}</h2>

      <div className="mt-2 flex w-full max-w-[734px] items-center justify-center px-[10px] py-[10px]">
        <p className="w-full text-center text-[18px] font-semibold leading-[140%] tracking-[-0.025em] text-gray-950">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
