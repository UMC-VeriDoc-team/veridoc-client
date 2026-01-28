interface IconProps {
  name: string; // svg 파일명 (확장자 제외)
  className?: string; // tailwind 스타일
}

// 공통 Icon 컴포넌트
const Icon = ({ name, className }: IconProps) => {
  return <img src={`/icons/${name}.svg`} alt={name} className={className} />;
};

export default Icon;
