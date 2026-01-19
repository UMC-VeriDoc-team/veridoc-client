export interface GuideParagraphsProps {
  // 본문 문단 배열
  paragraphs: string[];
}

// 가이드 상세 본문 문단 컴포넌트
export const GuideParagraphs = ({ paragraphs }: GuideParagraphsProps) => {
  return (
    <div className="space-y-4">
      {paragraphs.map((text) => (
        <p key={text} className="text-sm font-medium leading-7 text-gray-950 sm:text-base">
          {text}
        </p>
      ))}
    </div>
  );
};
