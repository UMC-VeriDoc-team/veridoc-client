interface SectionTitleProps {
  title: React.ReactNode;
  description: React.ReactNode; // <br/> 포함 가능하게
  className?: string;
}

const SectionTitle = ({ title, description, className = "" }: SectionTitleProps) => {
  return (
    <div className={className}>
      <h2 className="text-left text-[32px] font-extrabold leading-[140%] tracking-[-0.025em] text-brand-primary md:text-center md:text-[36px]">
        {title}
      </h2>

      <div className="mt-1 flex w-full items-center justify-start py-[10px] md:justify-center md:px-[10px]">
        <p className="w-full text-left text-[15px] font-semibold leading-[140%] tracking-[-0.025em] text-gray-950 md:text-center md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
