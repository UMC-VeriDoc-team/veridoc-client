import clsx from "clsx";

interface DotProps {
  num: number;
}

const BannerDot = ({ num }: DotProps) => {
  return (
    <div className="flex gap-x-2">
      <div className={clsx("h-2 w-2 rounded-[8px]", num === 1 ? "bg-white" : "bg-gray-300")} />
      <div className={clsx("h-2 w-2 rounded-[8px]", num === 2 ? "bg-white" : "bg-gray-300")} />
      <div className={clsx("h-2 w-2 rounded-[8px]", num === 3 ? "bg-white" : "bg-gray-300")} />
    </div>
  );
};

export default BannerDot;
