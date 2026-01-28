import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";

const tabs = [
  {
    label: "홈",
    path: "/home",
    icon: "home",
    activeIcon: "home-fill",
  },
  {
    label: "증상",
    path: "/symptom",
    icon: "symptom",
    activeIcon: "symptom-fill",
  },
  {
    label: "마이페이지",
    path: "/my",
    icon: "my",
    activeIcon: "my-fill",
  },
];

const BottomTabBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white pb-6 md:hidden">
      <ul className="flex h-[64px] items-center justify-around">
        {tabs.map((tab) => (
          <li key={tab.path} className="relative flex h-full flex-1">
            <NavLink
              to={tab.path}
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
                    name={`tab-bar-${isActive ? tab.activeIcon : tab.icon}`}
                    className="h-6 w-6"
                  />
                  <span>{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomTabBar;
