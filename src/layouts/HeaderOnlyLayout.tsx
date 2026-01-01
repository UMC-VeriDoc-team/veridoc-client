import Header from "@/components/common/header/Header";
import { Outlet } from "react-router-dom";

const HeaderOnlyLayout = () => {
  return (
    <>
      {/* 온보딩/로그인 전용: Header만 */}
      <Header />
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </>
  );
};

export default HeaderOnlyLayout;
