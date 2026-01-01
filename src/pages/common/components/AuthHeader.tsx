import { useNavigate } from "react-router-dom";

import arrowBack from "@/assets/icons/arrow-back.svg";
import logo from "@/assets/images/logo.svg";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[85px] w-full items-center justify-center">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="돌아가기"
        className="absolute left-4 flex h-[45px] w-[37px] items-center justify-center p-[10px] md:left-12"
      >
        <img src={arrowBack} alt="돌아가기" className="h-full w-full" />
      </button>

      <img
        src={logo}
        alt="VeriDoc 로고"
        className="h-[85px] w-auto object-contain"
        draggable={false}
      />
    </div>
  );
};

export default AuthHeader;
