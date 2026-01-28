import logo from "@/assets/images/logo.svg";
import { useEffect, useState } from "react";

interface MobileSplashProps {
  onFinish: () => void;
}

const MobileSplashPage = ({ onFinish }: MobileSplashProps) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsLeaving(true); // 애니메이션 시작
    }, 1200);

    // 애니메이션 끝난 뒤 페이지 전환
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={[
        "flex min-h-screen items-center justify-center bg-white",
        "transition-all duration-500 ease-out",
        isLeaving ? "scale-100 opacity-0" : "scale-100 opacity-100",
      ].join(" ")}
    >
      <img src={logo} alt="VeriDoc 로고" className="w-[70%]" draggable={false} />
    </div>
  );
};

export default MobileSplashPage;
