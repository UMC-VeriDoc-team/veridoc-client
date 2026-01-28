import { useNavigate } from "react-router-dom";
import logo from "/images/logo.svg";
import Icon from "@/components/Icon/Icon";

interface AuthHeaderProps {
  backTo: string;
}

const AuthHeader = ({ backTo }: AuthHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[85px] w-full items-center justify-center">
      <button
        type="button"
        onClick={() => navigate(backTo)}
        aria-label="돌아가기"
        className="absolute left-4 flex h-[45px] w-[37px] items-center justify-center p-[10px] md:left-12"
      >
        <Icon name="arrow-back" className="h-[21px] w-[14px] md:h-full md:w-full" />
      </button>

      <img
        src={logo}
        alt="VeriDoc 로고"
        className="hidden h-[85px] w-auto object-contain md:block"
        draggable={false}
      />
    </div>
  );
};

export default AuthHeader;
