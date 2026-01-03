import { NavLink } from "react-router-dom";

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
  return (
    <header className="w-full border-b border-gray-100 px-12 py-5">
      <nav className="flex items-center justify-between">
        {/* 임시: Logo */}
        <div className="font-brand text-xl font-bold text-layout-footerTitle">VeriDoc</div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                [
                  "cursor-pointer text-lg font-semibold transition-colors",
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
