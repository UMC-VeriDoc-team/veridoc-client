import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.svg";

interface MenuItem {
  label: string;
  path: string;
}

const menus: MenuItem[] = [
  { label: "홈", path: "/home" },
  { label: "증상", path: "/symptom" },
  { label: "마이페이지", path: "/my" },
];

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-gray-100 px-4 py-3 sm:px-6 md:px-12 md:py-4">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="VeriDoc 로고"
          className="h-8 w-auto cursor-pointer object-contain sm:h-9 md:h-[40px]"
          draggable={false}
        />

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                [
                  "cursor-pointer font-semibold transition-colors",
                  "text-sm sm:text-base md:text-lg",
                  isActive ? "text-black" : "text-gray-600 hover:text-gray-900",
                ].join(" ")
              }
            >
              {menu.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
