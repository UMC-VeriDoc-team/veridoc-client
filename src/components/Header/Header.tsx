import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/images/logo.svg";
import useBaseModal from "@/stores/modal/useBaseModal";
import { ModalType } from "@/components/Modal/types/modal";
import { useAuthStore } from "@/stores/user/useAuthStore";

const HOME_ACTIVE_PATHS = ["/home", "/usage", "/preview"];

const authButtonVisiblePaths = [
  "/",
  "/select-symptom",
  "/signup",
  "/login",
  "/find-password",
  "/password/reset",
];

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { openModal } = useBaseModal();
  const { authStatus, painAreaID } = useAuthStore();

  // 증상 선택 여부
  const hasSymptom = Boolean(painAreaID);

  const homeTarget =
    authStatus === "authenticated" ? (hasSymptom ? "/home" : "/usage") : "/preview";

  const isHomeActive = HOME_ACTIVE_PATHS.some((p) => location.pathname.startsWith(p));
  const isSymptomActive = location.pathname.startsWith("/symptom");
  const isMyActive = location.pathname.includes("/my");

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(homeTarget);
  };

  const handleSymptomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (authStatus !== "authenticated") {
      openModal(ModalType.AUTH_REQUIRED);
      return;
    }
    navigate("/symptom");
  };

  const handleMyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (authStatus !== "authenticated") {
      openModal(ModalType.AUTH_REQUIRED);
      return;
    }
    navigate("/my");
  };

  // 현재 경로가 버튼 표시 대상인지 여부
  const showAuthButtons = authButtonVisiblePaths.some((path) => location.pathname.includes(path));

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
          className="h-9 w-auto cursor-pointer object-contain"
          draggable={false}
        />

        <div className="flex h-[40px] gap-x-[90px]">
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
          {authStatus === "authenticated" ? (
            <div className="flex w-[200px] justify-end">
              <button
                onClick={() => openModal(ModalType.AUTH_LOGOUT)}
                className={`items-center rounded-lg border border-brand-primary bg-white px-5 py-2 text-center font-semibold text-brand-primary hover:opacity-80`}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <>
              {!showAuthButtons && (
                <div className="flex w-[200px] gap-x-3">
                  <NavLink
                    to="/signup"
                    className="rounded-lg border border-brand-primary bg-white px-5 py-2 text-center font-semibold text-brand-primary hover:opacity-80"
                  >
                    회원가입
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="rounded-lg bg-brand-primary px-5 py-2 text-center font-semibold text-white hover:opacity-80"
                  >
                    로그인
                  </NavLink>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
