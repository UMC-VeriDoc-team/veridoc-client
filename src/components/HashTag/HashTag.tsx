interface HashtagProps {
  content: string;
}

const Hashtag = ({ content }: HashtagProps) => {
  return (
    <div className="rounded-full border border-brand-primary px-2 pt-[2px] text-center text-sm font-medium text-brand-primary">
      {content}
    </div>
  );
};

export default Hashtag;
