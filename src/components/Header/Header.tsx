import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/images/logo.svg";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";

const HOME_ACTIVE_PATHS = ["/home", "/guide", "/preview"];

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useBaseModal();

  // 임시: 나중에 실제 로그인/증상선택 store로 교체
  const isLoggedIn = true;
  const hasSymptom = true;

  const homeTarget = isLoggedIn ? (hasSymptom ? "/home" : "/guide") : "/preview";

  const isHomeActive = HOME_ACTIVE_PATHS.some((p) => location.pathname.startsWith(p));
  const isSymptomActive = location.pathname.startsWith("/symptom");
  const isMyActive = location.pathname.includes("/my");

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(homeTarget);
  };

  const handleSymptomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openModal(ModalType.AUTH_REQUIRED);
      return;
    }
    navigate("/symptom");
  };

  const handleMyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openModal(ModalType.AUTH_REQUIRED);
      return;
    }
    navigate("/my");
  };

  return (
    <header
      className={`hidden w-full border-b border-gray-100 bg-white px-12 py-4 md:block ${className ?? ""}`}
    >
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="VeriDoc 로고"
          className="h-[40px] w-auto cursor-pointer object-contain"
          draggable={false}
        />

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {/* 홈 */}
          <NavLink
            to={homeTarget}
            onClick={handleHomeClick}
            className={[
              "cursor-pointer text-lg font-semibold transition-colors",
              isHomeActive ? "text-black" : "text-gray-600 hover:text-gray-900",
            ].join(" ")}
          >
            홈
          </NavLink>

          {/* 증상 */}
          <NavLink
            to="/symptom"
            onClick={handleSymptomClick}
            className={[
              "cursor-pointer text-lg font-semibold transition-colors",
              isSymptomActive ? "text-black" : "text-gray-600 hover:text-gray-900",
            ].join(" ")}
          >
            증상
          </NavLink>

          {/* 마이페이지 */}
          <NavLink
            to="/my"
            onClick={handleMyClick}
            className={[
              "cursor-pointer text-lg font-semibold transition-colors",
              isMyActive ? "text-black" : "text-gray-600 hover:text-gray-900",
            ].join(" ")}
          >
            마이페이지
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
