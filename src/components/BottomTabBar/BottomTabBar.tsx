import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/Icon/Icon";

const HOME_ACTIVE_PATHS = ["/home", "/guides", "/guide-detail", "/preview"];

const BottomTabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 임시: 로그인 연동 후 store로 관리
  const isLoggedIn = true;
  const hasSymptom = true;

  const homeTarget = isLoggedIn ? (hasSymptom ? "/home" : "/guides") : "/preview";

  const isHomeActive = HOME_ACTIVE_PATHS.some((p) => location.pathname.startsWith(p));
  const isMyActive = location.pathname.includes("/my");

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(homeTarget);
  };

  const handleMyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/my");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white pb-2 md:hidden">
      <ul className="flex h-[58px] items-center justify-around">
        {/* 홈 */}
        <li className="relative flex h-full flex-1">
          <NavLink
            to={homeTarget}
            onClick={handleHomeClick}
            className={[
              "flex flex-1 flex-col items-center justify-center gap-1 text-base font-medium",
              isHomeActive ? "text-brand-primary" : "text-gray-200",
            ].join(" ")}
          >
            <>
              {isHomeActive && (
                <span className="absolute left-1/2 top-0 h-[2px] w-full -translate-x-1/2 bg-brand-primary" />
              )}
              <Icon name={`tab-bar-${isHomeActive ? "home-fill" : "home"}`} className="h-6 w-6" />
              <span>홈</span>
            </>
          </NavLink>
        </li>

        {/* 증상 */}
        <li className="relative flex h-full flex-1">
          <NavLink
            to="/symptom"
            className={({ isActive }) =>
              [
                "flex flex-1 flex-col items-center justify-center gap-1 text-base font-medium",
                isActive ? "text-brand-primary" : "text-gray-200",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-1/2 top-0 h-[2px] w-full -translate-x-1/2 bg-brand-primary" />
                )}
                <Icon
                  name={`tab-bar-${isActive ? "symptom-fill" : "symptom"}`}
                  className="h-6 w-6"
                />
                <span>증상</span>
              </>
            )}
          </NavLink>
        </li>

        {/* 마이페이지 */}
        <li className="relative flex h-full flex-1">
          <NavLink
            to="/my"
            onClick={handleMyClick}
            className={[
              "flex flex-1 flex-col items-center justify-center gap-1 text-base font-medium",
              isMyActive ? "text-brand-primary" : "text-gray-200",
            ].join(" ")}
          >
            <>
              {isMyActive && (
                <span className="absolute left-1/2 top-0 h-[2px] w-full -translate-x-1/2 bg-brand-primary" />
              )}
              <Icon name={`tab-bar-${isMyActive ? "my-fill" : "my"}`} className="h-6 w-6" />
              <span>마이페이지</span>
            </>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomTabBar;
