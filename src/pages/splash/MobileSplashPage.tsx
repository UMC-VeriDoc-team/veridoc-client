import logo from "@/assets/images/logo.svg";
import { useEffect } from "react";

interface MobileSplashProps {
  onFinish: () => void;
}

const MobileSplashPage = ({ onFinish }: MobileSplashProps) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500); // 1.5초
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <img src={logo} alt="VeriDoc 로고" className="w-[70%]" draggable={false} />
    </div>
  );
};

export default MobileSplashPage;
