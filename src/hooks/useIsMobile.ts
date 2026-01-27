import { useEffect, useState } from "react";

const MOBILE_MAX_WIDTH = 768;

// 모바일 판별 훅
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

export default useIsMobile;
